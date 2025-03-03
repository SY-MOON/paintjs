const canvas = document.getElementById("canvas");
const ctx = canvas.getContext('2d');
const colors =  document.getElementsByClassName("control__color");
const range = document.getElementById("range");
const mode = document.getElementById("btn-fill");
const saveBtn = document.getElementById("btn-save");

const INITIAL_COLOR = "#2c2c2c"
const CANVAS_SIZE = 700

canvas.width = CANVAS_SIZE;
canvas.height = CANVAS_SIZE;

ctx.strokeStyle = INITIAL_COLOR;
ctx.fillStyle = INITIAL_COLOR;
ctx.lineWidth = 2.5;

let painting = false;
let filling = false;

function stopPainting() {
	painting = false;
}

function startPainting() {
	painting = true
}

function onMouseMove(e)  {
	const x = e.offsetX;
	const y = e.offsetY;
	if(!painting) {
		ctx.beginPath();
		ctx.moveTo(x,y);
	} else {
		ctx.lineTo(x, y);
		ctx.stroke()
	}
}

function onMouseDown(e) {
	painting = true;
}

function handleColorClick(e) {
	const color = e.target.style.backgroundColor;
	ctx.strokeStyle = color;
	ctx.fillStyle = color;
}

function handleRangeChange(e) {
	const size = e.target.value;
	ctx.lineWidth = size;
}

function handleModeClick(e) {
	if(filling == true) {
		filling = false;
		mode.innerText = "Fill"
	} else {
		filling = true;
		mode.innerText = "Paint";
	}
} 

function handleCanvasClick() { 
	if(filling) {
		ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE)
	}
}

function handleRightClick(e){
	e.preventDefault();
}

function handleSaveBtn() {
	const image = canvas.toDataURL("image/jpeg");
	const link = document.createElement("a");
	console.log('image', image);
	console.log('link', link);
	link.href = image;
	link.download = "paint";
	link.click();
}

if(canvas) {
	canvas.addEventListener("mousemove", onMouseMove)
	canvas.addEventListener("mousedown", startPainting)
	canvas.addEventListener("mouseup", stopPainting)
	canvas.addEventListener("mouseleave", stopPainting)
	canvas.addEventListener("click", handleCanvasClick)
	canvas.addEventListener("contextmenu", handleRightClick)
	
}


Array.from(colors).forEach(color => {
	color.addEventListener("click", handleColorClick)
});


if(range) {
	range.addEventListener("click", handleRangeChange)
}

if(mode) {
	mode.addEventListener("click", handleModeClick)
}

if(saveBtn) {
	saveBtn.addEventListener("click", handleSaveBtn)
}