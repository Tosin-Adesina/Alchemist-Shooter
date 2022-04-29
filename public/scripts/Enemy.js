import checks from '/scripts/checks.js';
export default class Enemy{
    constructor(x,y,height=30,width=30,xdir=0, ydir=0,speed=1,health=3,color,dmg=1){
        this.x = x;
        this.y = y;
        this.height = height;
        this.width = width;
        this.xdir = xdir;;
        this.ydir = ydir;
        this.speed = speed;
        this.health = health;
        this.color = color;
        this.dmg = dmg;
    }

    drawEnemy(ctx, playerX, playerY){
        ctx.strokeStyle = 'white';
        ctx.fillStyle = this.color;
        
        ctx.strokeRect(this.x, this.y, this.width, this.height);
        ctx.fillRect(this.x, this.y, this.width, this.height);
        ctx.fillStyle = 'white';

        ctx.fillText(this.health,this.x,this.y)
        const direction = checks.getDirection(this.x, this.y, playerX, playerY);
        this.x += direction[0]*this.speed;
        this.y += direction[1]*this.speed;
    }

    static addEnemy(enemyList, x, y, speed, dmg, health=3, color='red'){
        const enemy = new Enemy(x,y,30,30,0,0,speed,health,color, dmg);
        enemyList.push(enemy);
    }
    static drawEnemies(ctx,enemyList, playerX, playerY){
        for(let i = 0; i < enemyList.length; i++){
            if(enemyList[i].health > 0){
                enemyList[i].drawEnemy(ctx, playerX, playerY);
            }
            else{
                enemyList.splice(i,1);
            }
        }
    }
}