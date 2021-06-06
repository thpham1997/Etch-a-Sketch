const BASE_GRID_COLOR = '#f5f5f5'

const BODY = document.querySelector('body');
const GRID_CONTAINER = document.getElementById('gridContainer');
//Button element
const RS_BUTTON = document.getElementById('reset');
const CLEAR_BTN = document.getElementById('clearColor');
const ERASE_BTN = document.getElementById('erase');
const COLOR_CONFIRM = document.getElementById('colorConfirm');
const COLOR_PICKER = document.getElementById('colorpicker');
const COLOR_RANDOM = document.getElementById('colorRandom');
const COLOR_GREY_SCALE = document.getElementById('colorGreyScale');
//mutable vairable
let grid_divs = document.getElementsByClassName('grids');
let isDrawEnable = true;
//for button
let isRandomButton = false;
let isConfirmButton = false;
let isGreyscaleButton = false;
let isEraseButton = false;
let color;
// Events 
function starDrawing(isStart) {
  if (isStart) {
    addEventtoGrids();
  } else {
    removeEventtoGrid();
  }
}
function resetBtnBgColor() {
  ERASE_BTN.classList.remove('clickedBtn');
  COLOR_CONFIRM.classList.remove('clickedBtn');
  COLOR_PICKER.classList.remove('clickedBtn');
  COLOR_RANDOM.classList.remove('clickedBtn');
  COLOR_GREY_SCALE.classList.remove('clickedBtn');
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
ERASE_BTN.addEventListener('click', () => {
  isRandomButton = false;
  isConfirmButton = false;
  isGreyscaleButton = false;
  isEraseButton = true;
  isDrawEnable = false;
  resetBtnBgColor();
  ERASE_BTN.classList.add('clickedBtn')
  starDrawing(false);
  console.log('color_random');
});
CLEAR_BTN.addEventListener('click', () => {
  clearColor();
});
COLOR_RANDOM.addEventListener('click', () => {
  isRandomButton = true;
  isConfirmButton = false;
  isGreyscaleButton = false;
  isEraseButton = false;
  isDrawEnable = false;
  resetBtnBgColor();
  COLOR_RANDOM.classList.add('clickedBtn')
  starDrawing(false);
  console.log('color_random');
});
COLOR_CONFIRM.addEventListener('click', () => {
  isRandomButton = false;
  isConfirmButton = true;
  isGreyscaleButton = false;
  isEraseButton = false;
  isDrawEnable = false;
  resetBtnBgColor();
  COLOR_CONFIRM.classList.add('clickedBtn')
  starDrawing(false);
  color = COLOR_PICKER.value;
  console.log('color_picker');
});
COLOR_GREY_SCALE.addEventListener('click', () => {
  isRandomButton = false;
  isConfirmButton = false;
  isGreyscaleButton = true;
  isEraseButton = false;
  isDrawEnable = false;
  resetBtnBgColor();
  COLOR_GREY_SCALE.classList.add('clickedBtn')
  starDrawing(false);
  console.log('color_grey_scale');
});
RS_BUTTON.addEventListener("click", function () {
  window.location.reload();
});

// end of Event


function createGrid(n) {
  let maxDimWGrid = (screen.width > 480) ? 0.37 * screen.width : 0.9 * screen.width;
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
  GRID_CONTAINER.style.gridTemplateColumns = `repeat(${n}, ${maxDimWGrid / n}px)`;
  GRID_CONTAINER.style.gridAutoRows = `${maxDimWGrid / n}px`;
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
function RgbToHsl(RGB) {
  let RGB_arr = RGB.slice(4, RGB.length - 1).split(',');
  for (let i = 0; i < RGB_arr.length; i++) {
    RGB_arr[i] = parseInt(RGB_arr[i]) / 255;
  }
  let max = Math.max(...RGB_arr);//greyscale have same min and max
  let min = Math.min(...RGB_arr);
  let delta = max - min;
  let hue;
  if (delta === 0) {
    hue = 0
  } else if (max === RGB_arr[0]) {
    hue = 60 * ((RGB_arr[1] - RGB_arr[2]) / delta % 6);
  } else if (max === RGB_arr[1]) {
    hue = 60 * ((RGB_arr[2] - RGB_arr[0]) / delta + 2);
  } else {
    hue = 60 * ((RGB_arr[0] - RGB_arr[1]) / delta + 4);
  }
  let lightness = (max + min) / 2;
  let saturation;
  if (delta === 0) {
    saturation = 0;
  } else {
    saturation = delta / (1 - Math.abs(2 * lightness - 1));
  }
  lightness = (lightness * 100).toFixed(0);
  saturation = (saturation * 100).toFixed(0);
  if (hue < 0) hue += 360;
  hue = hue.toFixed(0);
  console.log(`hsl(${hue}, ${saturation}%, ${lightness}%)`);
  return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
}

function HslToRgb(HSL) {
  let r, g, b;
  let HSL_arr = HSL.slice(4, HSL.length - 1).split(',');
  for (let i = 0; i < HSL_arr.length; i++) {
    HSL_arr[i] = parseInt(HSL_arr[i]);
  }
  if (HSL_arr[0] === 360) HSL_arr[0] = 0;
  HSL_arr[1] = HSL_arr[1]/100;
  HSL_arr[2] = HSL_arr[2]/100;
  let c = (1 - Math.abs(2 * HSL_arr[2] - 1)) * HSL_arr[1];
  let x = c * (1 - Math.abs((HSL_arr[0] / 60) % 2 - 1));
  let m = HSL_arr[2] - c / 2;

  if (HSL_arr[0] >= 0 && HSL_arr[0] < 60) {
    r = c;
    g = x;
    b = 0;
  }else if(HSL_arr[0] >= 60 && HSL_arr[0] < 120){
    r = x;
    g = c;
    b = 0;
  }else if(HSL_arr[0] >= 120 && HSL_arr[0] < 180){
    r = 0;
    g = c;
    b = x;
  }else if(HSL_arr[0] >= 180 && HSL_arr[0] < 240){
    r = 0;
    g = x;
    b = c;
  }else if(HSL_arr[0] >= 240 && HSL_arr[0] < 300){
    r = x;
    g = 0;
    b = c;
  }else if(HSL_arr[0] >= 300 && HSL_arr[0] < 360){
    r = c;
    g = 0;
    b = x;
  }

  return `rgb(${((r + m)*255).toFixed(0)}, ${((g + m)*255).toFixed(0)}, ${((b + m)*255).toFixed(0)})`
}

function RgbToGrayScale(RGB) {
  let RGB_arr = RGB.slice(4, RGB.length - 1).split(',');
  for (let i = 0; i < RGB_arr.length; i++) {
    RGB_arr[i] = parseInt(RGB_arr[i]);
  }
  let Y = 0.299 * RGB_arr[0] + 0.587 * RGB_arr[1] + 0.114 * RGB_arr[2];
  return `rgb(${Y}, ${Y}, ${Y})`;
}

function colorDarken(HSL) {
  let HSL_arr = HSL.slice(4, HSL.length - 1).split(',');
  for (let i = 0; i < HSL_arr.length; i++) {
    HSL_arr[i] = parseInt(HSL_arr[i]);
  }
  if (HSL_arr[2] === 0) {
    return colorRandom();
  } else {
    HSL_arr[2] = Math.max(HSL_arr[2] - 10, 0);
  }

  return `hsl(${HSL_arr[0]}, ${HSL_arr[1]}%, ${HSL_arr[2]}%)`;;
}
function isGrayScale(RGB) {
  let RGB_arr = RGB.slice(4, RGB.length - 1).split(',');
  for (let i = 0; i < RGB_arr.length; i++) {
    RGB_arr[i] = parseInt(RGB_arr[i]);
  }

  if (RGB_arr[0] === RGB_arr[1] && RGB_arr[0] === RGB_arr[2]) {
    return true;
  }

  return false;
}

function colorRandom() {
  return `hsl(${randBetween(0, 360)}, ${randBetween(0, 100)}%, ${randBetween(20, 70)}%)`;
}
function colorRainbow() {
  return `hsl(${randBetween(0, 360)}, ${randBetween(80, 100)}%, ${randBetween(50, 100)}%)`;
}
function colorGrey() {
  return `hsl(${randBetween(0, 0)}, ${randBetween(0, 0)}%, ${randBetween(0, 100)}%)`;
}
function colorErase() {
  return BASE_GRID_COLOR;
}
function clearColor() {
  for (let i = 0; i < grid_divs.length; i++) {
    grid_divs[i].style.backgroundColor = BASE_GRID_COLOR;
  }
}

function changeColor(event) {
  if (isRandomButton) {
    console.log(event.target.style.backgroundColor);
    let thisColor;
    if (event.target.style.backgroundColor === '' || isGrayScale(event.target.style.backgroundColor)) {
      thisColor = colorRandom();
    } else {
      thisColor = colorDarken(RgbToHsl(event.target.style.backgroundColor));
    }
    console.log('changecolor1 ' + thisColor);
    event.target.style.backgroundColor = thisColor;

  }
  if (isConfirmButton) {
    let thisColor = color;
    console.log('changecolor2 ' + thisColor);
    event.target.style.backgroundColor = thisColor;

  }
  if (isGreyscaleButton) {
    let thisColor;
    if (event.target.style.backgroundColor === '' || event.target.style.backgroundColor === BASE_GRID_COLOR) {
      console.log('run1');
      thisColor = RgbToGrayScale(HslToRgb(colorRainbow()));
    }else if(isGrayScale(event.target.style.backgroundColor)){
      console.log('run2');
      thisColor = colorDarken(RgbToHsl(event.target.style.backgroundColor));
      if(!isGrayScale(thisColor)) thisColor = RgbToGrayScale(HslToRgb(thisColor));
    }else{
      console.log('run3');
      thisColor = RgbToGrayScale(event.target.style.backgroundColor);
    }
    console.log('changecolor3 ' + thisColor);
    event.target.style.backgroundColor = thisColor;
  }
  if (isEraseButton) {
    let thisColor = colorErase();
    console.log('changecolor4 ' + thisColor);
    event.target.style.backgroundColor = thisColor;
  }
}

function init() {
  gridReset();
  let n = gridSize();
  createGrid(n);
  addEventtoGrids();
}

init();
