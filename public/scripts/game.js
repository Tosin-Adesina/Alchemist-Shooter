////////////////////////////////////////////////////
console.log("greetings from game.js");

import Player from "/scripts/Player.js";
import Enemy from "/scripts/Enemy.js";




const canvas = document.getElementById('game');
const ctx = canvas.getContext('2d');

canvas.width = 600;
canvas.height = 600;

const player = new Player(canvas.width/2, canvas.height/2);
const enemies = [];
for( let i = 0; i < 10; i++){
    const x = 20 + 60*i;
    Enemy.addEnemy(enemies,x,100);
}




function gameLoop(){
    setNeonStyle();
    ctx.fillStyle = 'black';
    ctx.fillRect(0,0, canvas.width, canvas.height);
    checkIfEnemyHit(player.bullets, enemies);
    player.drawBullets(ctx);
    Enemy.drawEnemies(ctx,enemies);
    player.draw(ctx);

}



function checkIfEnemyHit(bullets, enemies){  
    for(let i = 0; i < bullets.length; i++){
        const b = bullets[i];
        for(let j = 0; j < enemies.length; j++){
            const e = enemies[j];
            if(checkCollision(e,b)){
                e.health -= b.dmg;
                b.pen -= 1;
            }
        }
    }
}

function checkCollision(b, e){
    const bRight = b.x+b.width;
    const bLeft = b.x;
    const bUp = b.y;
    const bDown = b.y+b.height;

    const eRight = e.x+e.height;
    const eLeft = e.x;
    const eUp = e.y;
    const eDown = e.y+e.height;

    let inX = (bRight - eLeft > 0) && (eRight - bLeft > 0);
    let inY = (bDown - eUp > 0) && (eDown - bUp> 0);

    if(inX && inY){
        return true;
    }
    else{
        return false;
    }
}

function setNeonStyle(){
    ctx.font = "20px serif";
    ctx.shadowColor = 'white';
    ctx.shadowBlur = 20;
    ctx.lineWidth = 4;
}
setInterval(gameLoop, 1000/60);
        
////////////////////////////////////////////////////