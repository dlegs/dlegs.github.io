$(document).ready(function () {

/*---------------initialize terminal---------------*/
const grtngs = $('#greetings');
$('#terminal').terminal(
  function(command, term) {
    if (command == 'test') {
      term.echo("you just typed 'test'");
    } else if (command == 'resume') {
      term.echo("accessing resume ...");
      window.open('https://github.com/dlegs/personal-website/asset/resume.pdf', '_blank');
    } else if (command == 'contact'){
      term.echo("Initialized message to dylan[at]legg.io ...");
      /*n.b. not sure i've got this email code right, can't get it to load on my laptop*/
      window.open('mailto:dylan@legg.io');
    } else if (command == 'hack'){
      term.echo("preparing to hack the mainframe ...")
    }else if (command == 'git'){
      term.echo("launching GitHub for user @dlegs ...");
      window.open('https://github.com/dlegs', '_blank');
    }else {
      term.echo('unknown command');
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
    "<span class='quit' style='background: var(--red);'></span> <span class='min' style='background: var(--yellow)';></span> <span class='max' style='background: var(--green);'></span><div class='name'></div>"
);
$(".termish").each(function(){
  const text = $(this).data("name");
  $(this).find(".name").append(text);
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
  //-----------------------------document closing bracket; don't touch
});