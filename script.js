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
function drawPixel(){    
    state.ctx.fillStyle='red';
    state.ctx.fillRect(30,30,60,50);
}
function draw(){
    state.ctx.clearRect(0,0,window.innerWidth,window.innerHeight);
    drawPixel()
}
function tick(){
    requestAnimationFrame(draw)
}
// interacción con el teclado
window.onload=function(){
    state.canvas=document.getElementById('game');
    state.ctx=state.canvas.getContext('2d');
    window.onkeydown=function(e){
        console.log(e.key);
    }
    tick()
}