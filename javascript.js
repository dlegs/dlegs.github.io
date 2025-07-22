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
    "<span class='span1' style='background: var(--red);'></span> <span class='span2' style='background: var(--yellow)';></span> <span class='span3' style='background: var(--green);'></span>"
);
  //-----------------------------document closing bracket; don't touch
});