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
      $('#hack').css("display", "block");
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

/*--------------append header to all terms---------------*/
$(".status-bar").append(
    "<span class='quit'>+</span> <span class='min'>-</span> <span class='max'>+</span><div class='name'></div>"
);
$(".termish").each(function(){
  const text = $(this).data("name");
  $(this).find(".name").append(text);
});

$(".termish").each(function(){
  $(this).click(function(){
    $(this).css('z-index', 2);
    //reset other sibling div's z-index to default value (i.e. 1)
    $(this).siblings('.termish').css('z-index', 1);
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
    $(poi).css("display", "none");
  });
  /*--------------------------dithering code------------------*/

  //-----------------------------document closing bracket; don't touch
});