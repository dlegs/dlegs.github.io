$(document).ready(function () {
/*---------------initialize terminal---------------*/
$('#terminal').terminal(
  function(command, term) {
    if (command == 'test') {
      term.echo("you've just typed 'test'", { typing: true, delay: 20, keepWords:true });
    } else if (command == 'resume') {
      window.open('https://github.com/dlegs/personal-website/blob/main/asset/resume.pdf', '_blank');
      term.echo("accessing resume in external window ...", { typing: true, delay: 20, keepWords:true });
    } else if (command == 'contact'){
      window.open('mailto:dylan@legg.io', '_blank');
      term.echo("initializing external message to dylan[at]legg.io ...", { typing: true, delay: 20, keepWords:true });
    }else if (command == 'git'){
      window.open('https://github.com/dlegs', '_blank');
      term.echo("launching GitHub for user @dlegs ...", { typing: true, delay: 20, keepWords:true });
    } else if (command == 'hack'){;
      term.pause()
      term.echo("preparing to hack the mainframe ...", { typing: true, delay: 20, keepWords:true });
      $('#mainframe').css({"opacity": "1", "z-index": "5", "height":"250px"});
        $('.frame-2').css({"opacity":"0"});
        $('.frame-1').css({"opacity":"1"});
        $('.frame-1').find('video').get(0).play();
        setTimeout(function () {
          $('.frame-1').animate({"opacity":"0"}, 100);
          $('#mainframe').delay(100).animate({"height": "200px"}, 100);
          $('.frame-2').delay(150).animate({'opacity': '1'},100);
        }, 3050);
        setTimeout(function(){
            term.echo("error: no vulnerabilities found", { typing: true, delay: 20, keepWords:true });
            term.resume();
        }, 3500);
    }else {
      term.echo('unknown command', { typing: true, delay: 20, keepWords:true });
    }
  }, {
    prompt: 'user@legg.io:~ $ ',
    greetings: greet.innerHTML
  } 
);

/*------ensuring the logo is always the full width of the terminal (minus padding)------*/
function updateLogoSize() {
  const $logoImg = $('.logo').find('img');
  const logoContainer = $('#terminal');

  if (!$logoImg.length || !logoContainer.length) return;

  const containerWidth = logoContainer.width() - 24; // match your horizontal padding
  const newStyle = `width: ${containerWidth}px; height: auto; display: block;`;

  $logoImg.attr('style', newStyle);
}

$(window).on('resize', updateLogoSize);
$(document).ready(function () {
  updateLogoSize();
});



/*--------------make terms draggable n resizable-------------*/
$( ".termish" ).draggable().resizable();
$( ".dialog" ).draggable();
$( "#pic" ).resizable( "disable" );
$('.decoy').draggable("disable").resizable("disable");

/*--------------append header to all terminal windowss---------------*/
const termBar = $('.termish').find('.status-bar');
$(termBar).append(
    "<span class='quit'>+</span> <span class='min'>-</span> <span class='max'>+</span><div class='name'></div>"
);
const diaBar = $('.dialog').find('.status-bar');
$(diaBar).append(
    "<div class='name'></div><span class='quit'>+</span>"
);

$(".termish").each(function(){
  const text = $(this).data("name");
  $(this).find(".name").append(text);
});
$(".dialog").each(function(){
  const text = $(this).data("name");
  $(this).find(".name").append(text);
});

/*----------when you click a window, it moves to the front-----------*/
const wind = $("#pic, #terminal, #mainframe");
$(wind).each(function(){
  $(this).click(function(){
  /*--------make sure this only happens on non-mobile interfaces----------*/
  if($(window).width() > 700){
      $(this).css('z-index', 3);
    //reset other sibling div's z-index to default value (i.e. 1)
      $(this).siblings(window).css('z-index', '0');
  }
  });
});
/*---------------------status bar button functions------------*/

  $(".max").on("click", function (){
  //--------the line below sets the affected div to whichever terminal window you've clicked
  const poi = $(this).parent().parent();
  if ($(poi).hasClass('maxed')) {
    $(poi).removeClass('maxed');
  } else {
    $(poi).addClass('maxed');
    $(poi).removeClass('minned');
  }
  });
$(".min").on("click",function(){
  const poi = $(this).parent().parent();
   if ($(poi).hasClass('minned')) {
    $(poi).removeClass('minned');
  } else {
    $(poi).addClass('minned');
    $(poi).removeClass('maxed');
    }
  });
$(".quit").on("click", function (){
  const poi = $(this).parent().parent();
    $(poi).css("opacity", "0");
  });
  $(".frame-2 span").on("click", function (){
  const poi = $(this).parent().parent().parent();
    $(poi).css("opacity", "0");
  });

/*wip function to change the pic width on resize*/
/*const picImg = $('#pic').find('img');
let picWidth;
if ($('#pic').hasclass('maxed')){
    picWidth = 'width: 398px; height: auto; display: block;';
      $(picImg).attr('style', picWidth);
} else {
    picWidth = 'width: 248px; height:auto; display: block;';
      $(picImg).attr('style', picWidth);
}*/

  /*--------------------------loader------------------*/

const retinaVid = $('#retina').find('video');
const stackVid = $('#stack').find('video');
const loader = $("#loader");

$(document).ready(function(){
  retinaVid.get(0).play();
      const typeRetina = new Typed('#retina-typed', {
      strings: ['Scanning retina ...'],
      typeSpeed: 15,
      showCursor: false
    });
  setTimeout(function () {
        $('#retina').empty();
        $('#stack').css({'opacity': '1'});
        $(stackVid).get(0).play();
    }, 1160);
    const typeStack = new Typed('#stack-typed', {
      strings: ['Decrypting code stack ...'],
      typeSpeed: 15,
      showCursor: false,
      startDelay:1160
    });
  setTimeout(function () {
        $('#stack').empty();
        $('#granted').css({'opacity': '1'});
    }, 2320);
    const typeGranted = new Typed('#granted-typed', {
      strings: ['[access granted]'],
      typeSpeed: 15,
      showCursor: false,
      startDelay:2320
    });
    setTimeout(function() {loader.css({"display": "none"})}, 3500);
});

//turn off the above function and turn on the below function to hide the loading effect while editing the site
/*$("#loader").css({"display":"none"});*/

/*-----------------basically media queries — simplify the site on small screens like phones-----*/
if($(window).width() < 700){
  $('.termish').draggable("disable");
  $('.termish').resizable("disable");
} 
  //-----------------------------document closing bracket; don't touch
});