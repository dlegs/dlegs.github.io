$(document).ready(function () {


/*--------------make terms draggable n resizable-------------*/
$( ".termy" ).draggable().resizable();

/*--------------append header to all terms---------------*/
$(".status-bar").append(
    "<span style='background: var(--red);'></span> <span style='background: var(--yellow)';></span> <span style='background: var(--green);'></span>"
);

  //-----------------------------document closing bracket; don't touch
});