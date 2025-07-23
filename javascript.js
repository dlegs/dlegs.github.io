$(document).ready(function () {

/*---------------initialize terminal---------------*/
const greetings = $('#greetings');
$(function() {
   $('#terminal').terminal();
});

$(function() {
   $('#terminal').terminal(function(command) {
      greetings: $("#greetings").innerHTML;

   });
});
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