export default class Enemy{
    constructor(x,y,height=30,width=30,xdir=0, ydir=0,speed=4,health=3,color){
        this.x = x;
        this.y = y;
        this.height = height;
        this.width = width;
        this.xdir = xdir;;
        this.ydir = ydir;
        this.speed = speed;
        this.health = health;
        this.color = color;
    }

    drawEnemy(ctx){
        ctx.strokeStyle = 'white';
        ctx.fillStyle = this.color;
        
        ctx.strokeRect(this.x, this.y, this.width, this.height);
        ctx.fillRect(this.x, this.y, this.width, this.height);
        ctx.fillStyle = 'white';

        ctx.fillText(this.health,this.x,this.y)
        this.x += this.xdir;
        this.y += this.ydir;
    }

    static addEnemy(enemyList, x, y, health=3, color='red'){
        const enemy = new Enemy(x,y,30,30,0,0,4,health,color);
        enemyList.push(enemy);
    }
    static drawEnemies(ctx,enemyList){
        for(let i = 0; i < enemyList.length; i++){
            if(enemyList[i].health > 0){
                enemyList[i].drawEnemy(ctx);
            }
            else{
                enemyList.splice(i,1);
            }
        }
    }
}