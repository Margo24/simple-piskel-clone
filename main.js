import canvasSizeParameters from './screens/canvasSize';
import findCoordinatesValue from './screens/findCoordinatesValue';
import deactivateToolClasses from './tools/deactivateToolClasses';
import getMousePos from './tools/getMousePos';
import Frames from './frames/frames';

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
ctx.fillStyle = 'rgb(255,255,255)';
ctx.fillRect(0, 0, 512, 512);

const toolsContainer = document.getElementsByClassName('tools')[0];
const primaryColor = document.getElementById('primary-color');
const secondaryColor = document.getElementById('secondary-color');
const penSizeList = document.getElementsByClassName('list-group')[0];
const canvasSizeControl = document.getElementById('canvas-size');

let canvasVirtualSize = 32;
let canvasVirtualPixel = 512 / canvasVirtualSize;
let XYCounts = canvasSizeParameters(canvasVirtualSize);
let penSize = 1;
let canvasFillArea = canvasVirtualPixel * penSize;
//pen and eraser tool flag
let isDrawing = false;

// keyboard shortcuts
const keyValuesForShortcuts = {
  KeyP: ['Pen', toolsContainer.childNodes[1]],
  KeyB: ['Fill bucket', toolsContainer.childNodes[3]],
  KeyE: ['Eraser', toolsContainer.childNodes[5]],
  KeyL: ['Stroke', toolsContainer.childNodes[7]],
};

let currentTool = 'Pen';
let currentColor = primaryColor.value;

canvasSizeControl.addEventListener('change', () => {
  const stringFormattedSize = canvasSizeControl.value.split('x')[1];
  canvasVirtualSize = Number(stringFormattedSize);
  canvasVirtualPixel = 512 / canvasVirtualSize;
  canvasFillArea = canvasVirtualPixel * penSize;
  XYCounts = canvasSizeParameters(canvasVirtualSize);
});

toolsContainer.addEventListener('click', (event) => {
  const div = event.target.closest('div');

  if (!div) return;

  if (div.contains(primaryColor)
      || div.contains(secondaryColor)
      || div.contains(penSizeList)) return;

  deactivateToolClasses(toolsContainer);

  div.classList.toggle('active-tool');
  currentTool = div.childNodes[1].alt;
});

penSizeList.addEventListener('click', (event) => {
  const li = event.target.closest('li');

  if (!li) return;

  Array.prototype.forEach.call(penSizeList.childNodes, (element, index) => {
    if (index % 2 !== 0) element.classList.remove('active');
  });

  li.classList.add('active');

  penSize = li.innerText.split(' ')[0];
  canvasFillArea = canvasVirtualPixel * penSize;
});

// add keyboard shortcut
document.addEventListener('keydown', (e) => {
  if (keyValuesForShortcuts[e.code]) {
    deactivateToolClasses(toolsContainer);
    keyValuesForShortcuts[e.code][1].classList.toggle('active-tool');
    currentTool = keyValuesForShortcuts[e.code][1].childNodes[1].alt;
  }
});

// pen tool option
function drawLine(evt) {
  let startX = 0;
  let startY = 0;
  let mousePos;
  const isPen = currentTool === keyValuesForShortcuts.KeyP[0];
  const isEraser = currentTool === keyValuesForShortcuts.KeyE[0];
  if (isDrawing) {
      mousePos = getMousePos(canvas, evt);
      startX = findCoordinatesValue(XYCounts, Math.floor(mousePos.x));
      startY = findCoordinatesValue(XYCounts, Math.floor(mousePos.y));
      if (isPen) {
          ctx.fillStyle = currentColor;
          ctx.fillRect(startX, startY, canvasFillArea, canvasFillArea);
      } else if (isEraser) {
          ctx.fillStyle = '#FFFFFF';
          ctx.fillRect(startX, startY, canvasFillArea, canvasFillArea);
      }
  }
}

let lastX = 0;
let lastY = 0;
const startStrokeCoords = { x: 0, y: 0 };

const frames = new Frames();
frames.init();

canvas.addEventListener('mousedown', (evt) => {
  // enable drawing
  isDrawing = true;
  const mousePos = getMousePos(canvas, evt);
  [lastX, lastY] = [mousePos.x, mousePos.y];
  // change color option
  if (evt.button === 0) {
    currentColor = primaryColor.value;
  } else if (evt.button === 2) {
    currentColor = secondaryColor.value;
  }
  // recording of start stroke coordinates
  startStrokeCoords.x = mousePos.x;
  startStrokeCoords.y = mousePos.y;
});

canvas.addEventListener('mouseup', (evt) => {
  isDrawing = false;
  strokeDrawing(evt);
  frames.getFrame();
  if (evt.button === 2) evt.preventDefault();
});

canvas.addEventListener('mousemove', (evt) => {
  drawLine(evt);
});

// fill bucket tool
canvas.addEventListener('click', (evt) => {
  if (currentTool === keyValuesForShortcuts.KeyB[0]) {
    ctx.fillStyle = currentColor;
    ctx.fillRect(0, 0, 512, 512);
    frames.getFrame();
  }
});

// stroke tool
function strokeDrawing(evt) {
  if (currentTool !== keyValuesForShortcuts.KeyL[0]) return;
  ctx.beginPath();
  ctx.strokeStyle = currentColor;
  ctx.lineWidth = canvasFillArea;
  ctx.moveTo(startStrokeCoords.x, startStrokeCoords.y);
  ctx.lineTo(evt.offsetX, evt.offsetY);
  ctx.stroke();
}

document.addEventListener('contextmenu', (event) => {
  frames.getFrame();
  event.preventDefault();
});
