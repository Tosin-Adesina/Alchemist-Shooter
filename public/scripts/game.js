////////////////////////////////////////////////////
console.log("greetings from game.js");

import Player from "/scripts/Player.js";
const canvas = document.getElementById('game');
const ctx = canvas.getContext('2d');

canvas.width = 550;
canvas.height = 300;

const player = new Player(canvas.width/2, canvas.height/2);

function gameLoop(){
    setNeonStyle();
    ctx.fillStyle = 'black';
    ctx.fillRect(0,0, canvas.width, canvas.height);
    player.draw(ctx);
}

function setNeonStyle(){
    ctx.shadowColor = 'white';
    ctx.shadowBlur = 20;
    ctx.lineWidth = 4;
}
setInterval(gameLoop, 1000/60);
////////////////////////////////////////////////////