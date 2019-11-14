let canvas = document.querySelector('#canvas'); //canvas settings
let ctx = canvas.getContext('2d');
canvas.width = 4;
canvas.height = 4;

let penTool = document.querySelector('.penTool');
penTool.addEventListener('click',penToolClick);
let bucketTool = document.querySelector('.bucketTool');
bucketTool.addEventListener('click',bucketToolClick);
let pipetTool = document.querySelector('.pipetTool');
pipetTool.addEventListener('click',pipetToolClick);

document.addEventListener('keydown', keyDownCheck);

let currentColorInput = document.querySelector('#current');
currentColorInput.addEventListener('click', prevColorFill);
let circlePrev = document.querySelector('.circle_prev');
circlePrev.style.background = '#41F795';
document.querySelector('.prev').addEventListener('click',prevChanges);

let isDrawing = false;
let isPen = true;
let isBucket = false;
let isPipet = false;

canvas.addEventListener('mousemove', mouseMove);
canvas.addEventListener('mousedown', () => isDrawing = true);
canvas.addEventListener('mouseup', () => isDrawing = false);
canvas.addEventListener('mouseout', () => isDrawing = false);

let buttons = document.querySelectorAll('button');
for (let i = 0; i < buttons.length; i++){
  buttons[i].addEventListener('click', buttonsEvent);
}

localStorageCheck();

function mouseMove(e){
  if (!isDrawing) return;
  else if (isPen){
    draw(e);
  }
  else if (isPipet){
    colorDefinition(e);
  }
  else if (isBucket){
    bucketDraw();
  }
}

function draw(e){
  let x = Math.floor(e.offsetX/(512/canvas.width));
  let y = Math.floor(e.offsetY/(512/canvas.height));
  ctx.fillStyle = currentColorInput.value;
  ctx.fillRect(x,y,1,1);
}

function bucketDraw(){
  ctx.fillStyle = currentColorInput.value;
  ctx.fillRect(0,0,canvas.width,canvas.height);
}

function colorDefinition(e){
  
}

function keyDownCheck(e){
  if (e.key == 'p'){
    penToolClick();
  }
  else if (e.key == 'b'){
    bucketToolClick();
  }
  else if (e.key == 'c'){
    pipetToolClick();
  }
}

function prevChanges(){
  let box = rgbToHex(circlePrev.style.backgroundColor);
  circlePrev.style.backgroundColor = currentColorInput.value;
  currentColorInput.value = box;
}

function penToolClick(){
  isPen = true;
  isPipet = false;
  isBucket = false;

  localStorage.setItem('tool','pen');

  penTool.classList.add('selected');
  bucketTool.classList.remove('selected');
  pipetTool.classList.remove('selected');
}

function bucketToolClick(){
  isPen = false;
  isPipet = false;
  isBucket = true;

  localStorage.setItem('tool','bucket');

  penTool.classList.remove('selected');
  bucketTool.classList.add('selected');
  pipetTool.classList.remove('selected');
}

function pipetToolClick(){
  isPen = false;
  isPipet = true;
  isBucket = false;

  localStorage.setItem('tool','pipet');

  penTool.classList.remove('selected');
  bucketTool.classList.remove('selected');
  pipetTool.classList.add('selected');
}

function rgbToHex(col){
  if(col.charAt(0)=='r'){
    col=col.replace('rgb(','').replace(')','').split(',');
    let r=parseInt(col[0], 10).toString(16);
    let g=parseInt(col[1], 10).toString(16);
    let b=parseInt(col[2], 10).toString(16);
    r=r.length==1?'0'+r:r; g=g.length==1?'0'+g:g; b=b.length==1?'0'+b:b;
    let colHex='#'+r+g+b;
    return colHex;
  }
}

function localStorageCheck(){
  if (localStorage.getItem('tool') == 'pen'){
    penToolClick();
  }
  else if (localStorage.getItem('tool') == 'bucket'){
    bucketToolClick();
  }
  else{
    pipetToolClick();
  }
  if (localStorage.getItem('size')){
    canvas.width = localStorage.getItem('size');
    canvas.height = localStorage.getItem('size');
    buttons[0].classList.remove('selected');
    for (let i = 0; i < buttons.length; i++){
      if (buttons[i].value == localStorage.getItem('size')){
        buttons[i].classList.add('selected');
      }
    }
  }
}

function prevColorFill(){
  circlePrev.style.backgroundColor = currentColorInput.value;
}

function buttonsEvent(){
  for (let i = 0; i < buttons.length; i++){
    buttons[i].classList.remove('selected');
  }
  this.classList.add('selected');
  canvas.width = this.value;
  canvas.height = this.value;
  localStorage.setItem('size',this.value);
}
