const run_state = 0;
const Tick = 150;
const scaleSnake = 20;
const apple= new Image();
apple.src='apple.png';
// características de juego
let state = {
  canvas: null,
  ctx: null,
  snake: [{ x: 3, y: 4 }],
  direction: { x: 1, y: 0 },
  prey: { x: 6, y: 2 },
  growing: 0,
  runState: run_state,
};
function randomXY(){
  return {
    x:Math.floor(Math.random()*30),
    y:Math.floor(Math.random()*25)
  }
}
function createApple(x,y){
  state.ctx.drawImage(apple,x*scaleSnake,y*scaleSnake)
}
const directionMap = {
  a: [-1, 0],
  d: [1, 0],
  w: [0, -1],
  s: [0, 1],
};
function drawPixel(color, x, y) {
  state.ctx.fillStyle = color;
  state.ctx.fillRect(scaleSnake * x, scaleSnake * y, scaleSnake, scaleSnake);
  state.ctx.shadowBlur=20;
  state.ctx.shadowColor='black';
}
function draw() {
  state.ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
  for(let i=0; i<state.snake.length;i++){
      const { x, y } = state.snake[i];
      drawPixel("yellow", x, y);
  }
  const {x,y}=state.prey;
  createApple(x,y)
}
function collision() {
  const head = state.snake[0];
  if (
    head.x * scaleSnake < 0 ||
    head.x * scaleSnake >= state.canvas.width ||
    head.y * scaleSnake < 0 ||
    head.y * scaleSnake >= state.canvas.height
  ) {
    return true;
  }
  return false;
}
function tick() {
  const interval = Tick;
  const dx = state.direction.x;
  const dy = state.direction.y;
  const didScore=(
    state.snake[0].x===state.prey.x&&state.snake[0].y===state.prey.y
  )
  let tail={};
  Object.assign(tail,state.snake[state.snake.length-1])
  for(let i=state.snake.length-1;i>-1;i--){
      const sq=state.snake[i];
      if(i===0){
          sq.x += dx;
          sq.y += dy;
      }else{
        sq.x=state.snake[i-1].x;
        sq.y=state.snake[i-1].y;
      }
    }
    if(didScore){
      // state.growing+=scaleSnake;
      state.prey=randomXY()
    }
  if(state.growing>0){
    state.snake.push(tail);
    state.growing=0;
  }
  if (collision()) {
    return 
  }
  requestAnimationFrame(draw);
  setTimeout(tick, interval);
}
// interacción con el teclado
window.onload = function () {
  state.canvas = document.getElementById("game");
  state.ctx = state.canvas.getContext("2d");
  const  {x,y}=randomXY()
  window.onkeydown = function (e) {
    const direction = directionMap[e.key];
    if (direction) {
      const [x, y] = direction;
      if (x !== state.direction.x && y !== state.direction.y) {
        state.direction.x = x;
        state.direction.y = y;
      }
    }
    if(e.key==='p'){
        state.growing++;
    }
  };
  tick();
};
