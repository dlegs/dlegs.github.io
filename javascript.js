$(document).ready(function () {

/*---------------initialize terminal---------------*/
const grtngs = $('#greetings');
$('#terminal').terminal(
  function(command, term) {
    if (command == 'test') {
      term.echo("you just typed 'test'", { typing: true, delay: 20 });
    } else if (command == 'resume') {
      term.echo("accessing resume ...");
      window.open('https://github.com/dlegs/personal-website/blob/main/asset/resume.pdf', '_blank');
    } else if (command == 'contact'){
      term.echo("initializing message to dylan[at]legg.io ...", { typing: true, delay: 20 });
      window.open('mailto:dylan@legg.io', '_blank');
    } else if (command == 'hack'){
      term.echo("preparing to hack the mainframe ...", { typing: true, delay: 20 });
        $('.frame-2').css({"opacity":"0"});
        $('.frame-1').css({"opacity":"1"});
      $('#mainframe').css({"opacity": "1", "z-index": "5", "height":"250px"});
      setTimeout(function() {
        $('.frame-1').animate({opacity:'0'}, 50);
        $('#mainframe').animate({"height": "200px"}, 50);
        $('.frame-2').delay(100).animate({opacity:'1'}, 50);
      }, 3000);
    }else if (command == 'git'){
      term.echo("launching GitHub for user @dlegs ...", { typing: true, delay: 20 });
      window.open('https://github.com/dlegs', '_blank');
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

const window = $("#pic, #terminal, #mainframe");
$(window).each(function(){
  $(this).click(function(){
    $(this).css('z-index', 3);
    //reset other sibling div's z-index to default value (i.e. 1)
    $(this).siblings(window).css('z-index', '0');
  });
});

/*$(".termish").each(function(){
  $(this).click(function(){
    $(this).css('z-index', 3);
    //reset other sibling div's z-index to default value (i.e. 1)
    $(this).siblings('.termish').css('z-index', 0);
  });
});*/
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
    $(poi).css("display", "none");
  });
  $(".frame-2 span").on("click", function (){
  const poi = $(this).parent().parent().parent();
    $(poi).css("opacity", "0");
  });
  /*--------------------------loader------------------*/

$(document).ready(function(){
  $("#retina").animate({opacity: '1'}).delay(1000).animate({opacity: '0'},50);
  $("#stack").delay(1200).animate({opacity: '1'}).delay(750).animate({opacity: '0'},50);
  $("#granted").delay(2250).animate({opacity:'1'}).delay(1200).animate({opacity: '0'},50);
  $("#loader").delay(3600).animate({opacity:'0'},50);
});

const loader = $("#loader");
setTimeout(function() {loader.css({"display": "none"})}, 3700);

//turn off the above function and turn on the below function to hide the loading effect while editing the site
/*$("#loader").css({"display":"none"});*/

  //-----------------------------document closing bracket; don't touch
});