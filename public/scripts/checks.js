import Enemy from "/scripts/Enemy.js";
export default class checks{
    //calculate x and y addends needed to move 1 unit in the direction going from point 1 to point 2
    static getDirection(x1, y1, x2, y2){
        let xdir = x2-x1;
        let ydir =  y2-y1;
        let distance = Math.sqrt(Math.pow(xdir,2) + Math.pow(ydir,2));
        xdir = xdir/distance;
        ydir = ydir/distance;
        return [xdir, ydir];
    }

    //collision detection functions
    static checkIfInBounds(b, e){
        let left = b.x > 0;
        let right = 0+e.width > b.x;
        let up = b.y > 0;
        let down = 0+e.height > b.y;
        return {'left' : left, 'right' : right, 'up' : up, 'down' : down};
    }

    static checkCollision(b, e){
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

    static checkIfEnemyHit(bullets, enemies){  
        for(let i = 0; i < bullets.length; i++){
            const b = bullets[i];
            for(let j = 0; j < enemies.length; j++){
                const e = enemies[j];
                if(checks.checkCollision(b,e)){
                    e.health -= b.dmg;
                    b.pen -= 1;
                }
            }
        }
    }

    static checkIfPlayerHit(enemies, player, gameInterval, health, score, scoreInterval){
        for(let i = 0; i < enemies.length; i++){
            const enemy = enemies[i];
            const hitboxBorderDiameter = (player.radius*2)*.7;
            const playerHitbox = {
                x: player.x,
                y: player.y,
                height: hitboxBorderDiameter,
                width: hitboxBorderDiameter,
            };
            if(checks.checkCollision(enemy,playerHitbox)){
                player.health -= enemy.dmg;
                const percent = (player.health/player.totalHealth)*100;
                health.style.width = percent + "%";
                if(player.health < 1){
                    clearInterval(gameInterval);
                    clearInterval(scoreInterval)
                    document.getElementById('deathScreen').style.visibility = "visible";
//////////      
                    document.getElementById('score').value = score;
                    // document.getElementById('addScore').addEventListener('click', async function(evt){
                    //     //evt.preventDefault();
    
                    //     const playername = document.getElementById('playername').value;

                    //     const config = {
                    //         method: 'POST',
                    //         headers: {
                    //             'Content-Type': 'application/json'
                    //         },
                    //         body: JSON.stringify({playername, score}),
                    //     };
                    //     console.log(config);
                    //     const url = "http://localhost:3000/game/playgame";
                    //     const result = await fetch(url, config);
            
                    // });
/////////






                }
            }
        }
    }

    static checkIfPowerUpTouched(floatingPowerUps, player, health){
        for(let i = 0; i < floatingPowerUps.length; i++){
            const pow = floatingPowerUps[i];
            const hitboxBorderDiameter = (player.radius*2)*.7;
            const playerHitbox = {
                x: player.x,
                y: player.y,
                height: hitboxBorderDiameter,
                width: hitboxBorderDiameter,
            };
            if(checks.checkCollision(pow,playerHitbox)){
                player.health += player.health*.15;
                if(player.health > player.totalHealth){
                    player.health = player.totalHealth;
                }
                const percent = (player.health/player.totalHealth)*100;
                health.style.width = percent + "%";
                player.changeElement(pow);
                floatingPowerUps.splice(i,1);
                
            }
        }
    }



    //styling functions
    static setNeonStyle(ctx){
        ctx.font = "20px serif";
        ctx.shadowColor = 'white';
        ctx.shadowBlur = 20;
        ctx.lineWidth = 4;
    }
}