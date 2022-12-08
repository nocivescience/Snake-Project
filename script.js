const run_state=0;

// características de juego
let state={
    canvas: null,
    ctx:null,
    snake: [{x:30,y:40}],
    direction:{x:1,y:0},
    prey:{x:60, y:100},
    growing: 0,
    runState: run_state,
}
function drawPixel(color,x,y){    
    state.ctx.fillStyle=color;
    state.ctx.fillRect(10,10,x,y);
}
function draw(){
    state.ctx.clearRect(0,0,window.innerWidth,window.innerHeight);
    drawPixel('green',30,10)
    drawPixel('red',20,10);
    drawPixel('yellow',10,10);
}
function tick(){
    requestAnimationFrame(draw)
}
// interacción con el teclado
window.onload=function(){
    state.canvas=document.getElementById('game');
    state.ctx=state.canvas.getContext('2d');
    state.canvas.width=window.innerWidth;
    state.canvas.height=window.innerHeight;
    window.onkeydown=function(e){
        console.log(e.key);
    }
    tick()
}