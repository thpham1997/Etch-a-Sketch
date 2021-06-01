const TEST_GRID_COLOR = '#bcb382'
const MAX_DIM_GRIDS = 600; //px

const BODY = document.querySelector('body');
const GRID_CONTAINER = document.getElementById('gridContainer');
//Button element
const RS_BUTTON = document.getElementById('reset');
const CLEAR_BTN = document.getElementById('clearColor');
const COLOR_CONFIRM = document.getElementById('colorConfirm');
const COLOR_PICKER = document.getElementById('colorpicker');
const COLOR_RANDOM = document.getElementById('colorRandom');
const COLOR_GREY_SCLAE = document.getElementById('colorGreyScale');
//mutable vairable
let grid_divs = document.getElementsByClassName('grids');
let isDrawEnable = true;
//for button
let isRandomButton = false;
let isConfirmButton = false;
let isGreyscaleButton = false;
let color;
// Events 
function starDrawing(isStart){
  if(isStart){
    addEventtoGrids();
  }else{
    removeEventtoGrid();
  }
}
BODY.addEventListener('dblclick', function () {
  isDrawEnable = !isDrawEnable;
  starDrawing(isDrawEnable);
  console.log('dbclick');
});

function addEventtoGrids() {
  for (let i = 0; i < grid_divs.length; i++) {
    grid_divs[i].addEventListener("mouseover", changeColor);
  }
  console.log('addEvent');
}
function removeEventtoGrid() {
  for (let i = 0; i < grid_divs.length; i++) {
    grid_divs[i].removeEventListener("mouseover", changeColor);
  }
  console.log('removeEvent');
}

CLEAR_BTN.addEventListener('click', () => {
  clearColor();
});
COLOR_RANDOM.addEventListener('click', () => {
  isRandomButton = true;
  isConfirmButton = false;
  isGreyscaleButton = false;
  isDrawEnable = false;
  starDrawing(false);
  console.log('color_random');
});
COLOR_CONFIRM.addEventListener('click', () => {
  isRandomButton = false;
  isConfirmButton = true;
  isGreyscaleButton = false;
  isDrawEnable = false;
  starDrawing(false);
  color = COLOR_PICKER.value;
  console.log('color_picker');
});
COLOR_GREY_SCLAE.addEventListener('click', () => {
  isRandomButton = false;
  isConfirmButton = false;
  isGreyscaleButton = true;
  isDrawEnable = false;
  starDrawing(false);
  console.log('color_grey_scale');
});

// end of Event


function createGrid(n) {
  if (n < 0 || n === undefined) {
    for (let i = 0; i < 16; i++) {
      for (let j = 0; j < 16; j++) {
        let div = document.createElement('div');
        div.className = 'grids';
        // div.innerHTML = "a grid";
        GRID_CONTAINER.appendChild(div);
      };
    };
  } else {
    for (let i = 0; i < n; i++) {
      for (let j = 0; j < n; j++) {
        let div = document.createElement('div');
        div.className = 'grids';
        // div.innerHTML = "a grid";
        GRID_CONTAINER.appendChild(div);
      };
    };
  }
  grid_divs = document.getElementsByClassName('grids');
  GRID_CONTAINER.style.gridTemplateColumns = `repeat(${n}, ${MAX_DIM_GRIDS / n}px)`;
  GRID_CONTAINER.style.gridAutoRows = `${MAX_DIM_GRIDS / n}px`;
}


function gridReset() {
  GRID_CONTAINER.querySelectorAll("*").forEach(element => element.remove());
}

function gridSize() {
  let grid_size = Number.parseInt(prompt("Please enter a number to create a square of number of grids(no more than 100)", "1"));
  grid_size = Math.min(100, grid_size);
  return grid_size;
}
// Function for button
function randBetween(num1, num2) {
  return Math.floor((Math.random() * (num2 - num1 + 1) + num1));
}
function RgbToGreyScale(RGB) {
  let RGB_arr = RGB.slice(4, RGB.length - 1).split(',');
  for (let i = 0; i < RGB_arr.length; i++) {
    RGB_arr[i] = parseInt(RGB_arr[i]);
  }
  let minnmax = Math.max(...RGB_arr);//greyscale have same min and max
  console.log(`hsl(${randBetween(0, 0)}, ${randBetween(0, 0)}%, ${Math.round(minnmax / 255 * 100)}%)`);
}
function colorRandom() {
  return `hsl(${randBetween(0, 360)}, ${randBetween(0, 100)}%, ${randBetween(0, 100)}%)`;
}
function colorRainbow() {
  return `hsl(${randBetween(0, 360)}, ${randBetween(80, 100)}%, ${randBetween(50, 100)}%)`;
}
function colorGrey() {
  return `hsl(${randBetween(0, 0)}, ${randBetween(0, 0)}%, ${randBetween(0, 100)}%)`;
}
function clearColor() {
  for (let i = 0; i < grid_divs.length; i++) {
    grid_divs[i].style.backgroundColor = '#ffffff';
  }
}

function changeColor(event) {
  if (isRandomButton){
    event.target.style.backgroundColor = colorRandom();
    console.log('changecolor1');
  }
  if(isConfirmButton){
    event.target.style.backgroundColor = color;
    console.log('changecolor2');
  }
  if(isGreyscaleButton){
    event.target.style.backgroundColor = colorGrey();
    console.log('changecolor3');
  }
}

RS_BUTTON.addEventListener("click", function (e) {
  init();
  addEventtoGrids();
});





function init() {
  gridReset();
  let n = gridSize();
  createGrid(n);
  addEventtoGrids();
}

init();
