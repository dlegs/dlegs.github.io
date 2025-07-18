$(document).ready(function () {


/*--------------make terms draggable n resizable-------------*/
$( ".termy" ).draggable().resizable();

/*--------------append header to all terms---------------*/
$(".status-bar").append(
    "<span class='span1' style='background: var(--red);'></span> <span class='span2' style='background: var(--yellow)';></span> <span class='span3' style='background: var(--green);'></span>"
);
  //-----------------------------document closing bracket; don't touch
});