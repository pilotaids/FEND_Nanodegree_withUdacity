const $canvas = $("#pixelCanvas");
const $submit = $("#gridSize");
const $color = $("#colorPicker");
const $h = $('#inputHeight');
const $w = $('#inputWidth');
let pressed = false;

// Create grid based on entered dimentions
function makeGrid(height, width){
  for(let i = 0; i < height; i++) {
    let $row = $("<tr id='r" + i + "'></tr>")
    $row.appendTo($canvas);
    for(let j = 0; j < width; j++){
      $("<td class='square' id='c" + i + "'></td>").appendTo($row);
    }
  }
}

// Color grid's squares based on current color when selected & drag it when mouse-down
function colorGrid(){
  // Start coloring when mouse-down
  $canvas.on('mousedown', '.square', function(){
    pressed = true;
    // Assign color to the square
    $(this).css('background-color', $color.val());
  });
  // Stop coloring when mouse-up
  $(document).mouseup(function() {
    pressed = false;
  });
  // Drag color when mouse-down
  $canvas.on('mousemove', '.square', function() {
    if (pressed) {
      // Assign color to the square while dragging
      $(this).css('background-color', $color.val());
    }
  });
}

// When grid's dimentions are submitted by the user (submit button),
// create the grid
$submit.click(function(e){
  e.preventDefault();
  // Reset & Cear the previous grid (when present)
  $canvas.empty();
  // Determine grid's dimentions & create the grid
  makeGrid($h.val(), $w.val());
  // Color grid
  colorGrid();
});
