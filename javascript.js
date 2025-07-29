$(document).ready(function () {

/*---------------initialize terminal---------------*/
$('#terminal').terminal(
  function(command, term) {
    if (command == 'test') {
      term.echo("you've just typed 'test'", { typing: true, delay: 20 });
    } else if (command == 'resume') {
      window.open('https://github.com/dlegs/personal-website/blob/main/asset/resume.pdf', '_blank');
      term.echo("accessing resume in external window ...");
    } else if (command == 'contact'){
      window.open('mailto:dylan@legg.io', '_blank');
      term.echo("initializing external message to dylan[at]legg.io ...", { typing: true, delay: 20 });
    }else if (command == 'git'){
      window.open('https://github.com/dlegs', '_blank');
      term.echo("launching GitHub for user @dlegs ...", { typing: true, delay: 20 });
    } else if (command == 'hack'){;
      term.pause()
      term.echo("preparing to hack the mainframe ...", { typing: true, delay: 20 });
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
            term.echo("error: no vulnerabilities found", { typing: true, delay: 20 });
            term.resume();
        }, 3500);
    }else {
      term.echo('unknown command', { typing: true, delay: 20 });
    }
  }, {
    prompt: 'user@legg.io:~ $ ',
    greetings: greet.innerHTML
  } 
);
/*--------------make terms draggable n resizable-------------*/
$( ".termish" ).draggable().resizable();
$( "#pic" ).resizable( "disable" );
$('#mainframe').draggable();
$('.decoy').draggable("disable").resizable("disable");

/*--------------append header to all terms---------------*/
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

const wind = $("#pic, #terminal, #mainframe");
$(wind).each(function(){
  $(this).click(function(){
    $(this).css('z-index', 3);
    //reset other sibling div's z-index to default value (i.e. 1)
    $(this).siblings(window).css('z-index', '0');
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
  /*----------------sizing terminal scroller to the space avail------*/
  const height = $('#terminal').height() - $('.logo').height() - 60 + 'px';
  $('.terminal-scroller').height(height);

  $('#terminal').resize(function(){
      const height = $('#terminal').height() - $('.logo').height() - 60 + 'px';
      $('.terminal-scroller').height(height);
  });

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


  //-----------------------------document closing bracket; don't touch
});