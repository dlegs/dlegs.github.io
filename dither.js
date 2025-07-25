// dither.js
(function () {
  const cssVar = (v) => getComputedStyle(document.documentElement).getPropertyValue(v).trim() || "#000";

  const DITHER_KERNELS = {
    'fs': {
      matrix: [
        [0, 0, 7],
        [3, 5, 1]
      ],
      divisor: 16
    },
    'atkinson': {
      matrix: [
        [0, 0, 1, 1],
        [1, 1, 1],
        [0, 1]
      ],
      divisor: 8
    },
    'stucki': {
      matrix: [
        [0, 0, 8, 4],
        [2, 4, 8, 4, 2],
        [1, 2, 4, 2, 1]
      ],
      divisor: 42
    }
  };

  function hexToRgb(hex) {
    let c = hex.replace('#', '');
    if (c.length === 3) c = c.split('').map(ch => ch + ch).join('');
    const num = parseInt(c, 16);
    return {
      r: (num >> 16) & 255,
      g: (num >> 8) & 255,
      b: num & 255
    };
  }

  function toGrayscale(data) {
    const gray = new Float32Array(data.length / 4);
    for (let i = 0; i < gray.length; i++) {
      const r = data[i * 4], g = data[i * 4 + 1], b = data[i * 4 + 2];
      gray[i] = 0.3 * r + 0.59 * g + 0.11 * b;
    }
    return gray;
  }

  function ditherDiffusion(imageData, threshold, type, color1, color2) {
    const { width, height, data } = imageData;
    const gray = toGrayscale(data);
    const result = new Uint8ClampedArray(data.length);

    const c1 = hexToRgb(color1);
    const c2 = hexToRgb(color2);

    const kernel = DITHER_KERNELS[type] || DITHER_KERNELS['fs'];
    const mat = kernel.matrix;
    const div = kernel.divisor;

    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        const i = y * width + x;
        const oldPixel = gray[i];
        const newPixel = oldPixel < threshold * 255 ? 0 : 255;
        const error = oldPixel - newPixel;

        const idx = i * 4;
        const col = newPixel === 0 ? c1 : c2;
        result[idx] = col.r;
        result[idx + 1] = col.g;
        result[idx + 2] = col.b;
        result[idx + 3] = 255;

        // Diffuse error
        for (let ky = 0; ky < mat.length; ky++) {
          for (let kx = 0; kx < mat[ky].length; kx++) {
            const weight = mat[ky][kx];
            const dx = x + (kx - Math.floor(mat[ky].length / 2));
            const dy = y + ky;
            const ii = dy * width + dx;
            if (dx >= 0 && dx < width && dy < height) {
              gray[ii] += error * (weight / div);
            }
          }
        }
      }
    }

    return new ImageData(result, width, height);
  }

  function ditherBayer(imageData, threshold, color1, color2, matrixSize = 8) {
    const { width, height, data } = imageData;
    const gray = toGrayscale(data);
    const result = new Uint8ClampedArray(data.length);

    const c1 = hexToRgb(color1);
    const c2 = hexToRgb(color2);
    const bayer = generateBayerMatrix(matrixSize);

    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        const i = y * width + x;
        const b = bayer[(y % matrixSize) * matrixSize + (x % matrixSize)];
        const val = gray[i] / 255;
        const idx = i * 4;
        const col = val < (threshold + b - 0.5) ? c1 : c2;
        result[idx] = col.r;
        result[idx + 1] = col.g;
        result[idx + 2] = col.b;
        result[idx + 3] = 255;
      }
    }

    return new ImageData(result, width, height);
  }

  function generateBayerMatrix(size) {
    const bayer = new Array(size * size);
    const log2 = Math.log2(size);
    for (let y = 0; y < size; ++y) {
      for (let x = 0; x < size; ++x) {
        let v = 0;
        for (let bit = 0; bit < log2; ++bit) {
          v |= ((x >> bit & 1) << (2 * bit + 1)) | ((y >> bit & 1) << (2 * bit));
        }
        bayer[y * size + x] = v / (size * size);
      }
    }
    return bayer;
  }

  function getImageData(el, res) {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    canvas.width = res.width;
    canvas.height = res.height;
    if (el.tagName === "VIDEO" || el.tagName === "IMG") {
      ctx.drawImage(el, 0, 0, res.width, res.height);
    } else {
      const svgData = new XMLSerializer().serializeToString(el);
      const img = new Image();
      return new Promise((resolve) => {
        img.onload = () => {
          ctx.drawImage(img, 0, 0, res.width, res.height);
          resolve(ctx.getImageData(0, 0, res.width, res.height));
        };
        img.src = "data:image/svg+xml;base64," + btoa(svgData);
      });
    }
    return Promise.resolve(ctx.getImageData(0, 0, res.width, res.height));
  }

 function renderDither(el, canvas) {
  const threshold = parseFloat(el.dataset.threshold) || .5;
  const type = el.dataset.dither || 'fs';
  const dotSize = parseInt(el.dataset.dotSize) || 1.5;

  const color1 = cssVar('--dither-color-1') || '#000000';
  const color2 = cssVar('--dither-color-2') || '#ffffff';

  const displayWidth = Math.round(el.offsetWidth);
  const displayHeight = Math.round(el.offsetHeight);

  const res = {
    width: Math.ceil(displayWidth / dotSize),
    height: Math.ceil(displayHeight / dotSize)
  };

  getImageData(el, res).then(imageData => {
    let output;
    if (type === 'bayer') {
      output = ditherBayer(imageData, threshold, color1, color2);
    } else {
      output = ditherDiffusion(imageData, threshold, type, color1, color2);
    }

    // Render at low res, then scale up cleanly
    canvas.width = output.width;
    canvas.height = output.height;
    canvas.style.width = displayWidth + 'px';
    canvas.style.height = displayHeight + 'px';

    const ctx = canvas.getContext("2d");
    ctx.imageSmoothingEnabled = false;
    ctx.putImageData(output, 0, 0);
  });
}

  function replaceWithCanvas(el) {
    const canvas = document.createElement('canvas');
    canvas.classList.add('dither-canvas');
    canvas.style.position = 'absolute';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.pointerEvents = 'none';

    const wrapper = document.createElement('div');
    wrapper.style.position = 'relative';
    wrapper.style.display = 'inline-block';
    el.parentNode.insertBefore(wrapper, el);
    wrapper.appendChild(el);
    wrapper.appendChild(canvas);

    el.style.visibility = 'hidden';
    renderDither(el, canvas);

    if (el.tagName === 'VIDEO') {
      const loop = () => {
        renderDither(el, canvas);
        requestAnimationFrame(loop);
      };
      loop();
    }

    const resizeObserver = new ResizeObserver(() => {
      renderDither(el, canvas);
    });
    resizeObserver.observe(el);

    return canvas;
  }

  function init() {
    document.querySelectorAll('.dither').forEach(el => {
      if (!el.dataset.processed) {
        el.dataset.processed = "true";
        replaceWithCanvas(el);
      }
    });
  }

  document.addEventListener("DOMContentLoaded", init);
})();