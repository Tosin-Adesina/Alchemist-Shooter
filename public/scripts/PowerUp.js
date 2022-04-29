export default class PowerUp {
    constructor(name, x, y, xdir, ydir, color, dmg, firerate, projectileSize, speed){
        this.name = name;
        this.x = x;
        this.y = y;
        this.xdir = xdir;
        this.ydir = ydir;
        this.color = color;
        this.dmg = dmg;
        this.firerate = firerate;
        this.projectileSize = projectileSize;
        this.bulletSpeed = speed;
        this.bulletColor = color;
        this.height =10;
        this.width = 10;
        this.powerUpSpeed = 1;
        this.x; 
        this.y;
        this.xdir;
        this.ydir;
    }

    static drawPowerUp(ctx, canvasHeigth, canvasWidth, floatingPowerUps){
        for(let i = 0; i < floatingPowerUps.length; i++){
            const pow = floatingPowerUps[i];
            let inX = pow.x < 0+canvasWidth+300 && pow.x > 0-300;
            let inY = pow.y < 0+canvasHeigth+300 && pow.y > 0-300;
            if(inX && inY){
                ctx.strokeStyle = 'white';
                ctx.fillStyle = floatingPowerUps[i].color;
                ctx.strokeRect(pow.x, pow.y, pow.height, pow.width);
                ctx.fillRect(pow.x, pow.y, pow.height, pow.width);
                pow.x += pow.xdir*pow.powerUpSpeed;
                pow.y += pow.ydir*pow.powerUpSpeed;
            }
            else{
                console.log(ctx.width);
            }
        }
    }

    static async getPowerUps(){
        let powerUps = [];
        const url = "https://alchemist-shooter.herokuapp.com/game/api/elements";
        const res = await fetch(url);
        const elements = await res.json();
        
        //const num = parseInt(e.code.slice(-1))-1;
        for(let i = 0; i < elements.length; i++){
            const obj = {
                name: elements[i].name,
                color: elements[i].color,
                dmg: elements[i].dmg,
                firerate: elements[i].firerate,
                projectileSize: elements[i].projectileSize,
                speed: elements[i].speed,
            };
            const powerUp = this.createPowerUp(-100, -100, 0, 0, obj);
            powerUps.push(powerUp);
        }
        //console.log(powerUps);
        return powerUps;
    }

    static createPowerUp(x, y, xdir, ydir, element){
        const powerUp = new PowerUp(element.name, x, y, xdir, ydir, element.color, element.dmg, element.firerate, element.projectileSize, element.speed);
        return powerUp;
    }

    static spawnTop(ctx, canvasWidth, powerUps, floatingPowerUps){
        const num = Math.floor(Math.random()*powerUps.length);
        const element = powerUps[num];
        console.log(canvasWidth);
        const randx = Math.floor(Math.random()*(canvasWidth-powerUps[num].width));
        
        const y = -100;
        
        const x = randx;
    
        const xdir = 0;
        const ydir = 1;
        const pow = this.createPowerUp(x, y, xdir, ydir, element);
        floatingPowerUps.push(pow);

    }

    

}