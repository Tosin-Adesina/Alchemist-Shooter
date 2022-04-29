import Bullet from "/scripts/Bullet.js";
import checks from "/scripts/checks.js";
export default class Player{
    constructor(x, y){
        this.x = x;
        this.y = y;
        this.color = 'teal';
        this.width = 50;
        this.height = 50;
        this.radius = 25;
        this.speed = 4;
        this.totalHealth = 500;
        this.health = this.totalHealth;
        this.bullets = [];
        this.dmg = 1;
        this.firerate = 10;
        this.bulletSpeed = 10;
        this.bulletHeight = 5;
        this.bulletWidth = 5;
        this.bulletColor = 'yellow';
        this.bulletPen = 1;
        this.bulletSize = 1;
        this.downPressed = false;
        this.upPressed = false;
        this.leftPressed = false;
        this.rightPressed = false;
        this.mousePressed = false;
        this.mouseX;
        this.mouseY;
        this.onCooldown = false;
       // document.addEventListener('keypress', this.changeElement);
        document.addEventListener('keydown', this.keydown);
        document.addEventListener('keyup', this.keyup);
        document.getElementById('game').addEventListener('mousedown', this.mousedown);
        document.getElementById('game').addEventListener('mouseup', this.mouseup);
        document.getElementById('game').addEventListener('mousemove', this.mousemove);
        this.canvasRect = document.getElementById('game');
        
    }

    drawPlayer(ctx){
        
        ctx.strokeStyle = 'white';
        ctx.fillStyle = 'black';
        this.move();
       
        

        //player is a square
        // ctx.strokeRect(this.x, this.y, this.width, this.height);
        // ctx.fillRect(this.x, this.y, this.width, this.height);

        //player is a circle
        ctx.beginPath();
        ctx.strokeStyle = this.color;
        ctx.ellipse(this.x, this.y, this.radius, this.radius, 0, 0, Math.PI * 2, false);
        ctx.stroke();

    }

    drawBullets(ctx){
        this.shoot();
        let bullets = this.bullets;
        for(let i = 0; i < bullets.length; i++){
            let c = this.canvasRect;
            let b = bullets[i];
            let inX = b.x < 0+c.width+300 && b.x > 0-300;
            let inY = b.y < 0+c.height+300 && b.y > 0-300;
            if(inX && inY && b.pen > 0){
                ctx.strokeStyle = 'white';
                ctx.fillStyle = bullets[i].color;
                ctx.strokeRect(bullets[i].x, bullets[i].y, bullets[i].width, bullets[i].height);
                ctx.fillRect(bullets[i].x, bullets[i].y, bullets[i].width, bullets[i].height);
                //bullets[i].y -= bullets[i].speed;
                b.x += b.xdir*b.speed;
                b.y += b.ydir*b.speed;
            }
            else{
                bullets.splice(i,1);
            }
        }
    }

    shoot(){
        if(this.mousePressed && !this.onCooldown){ //also check if cooldown timer is zero
            //create bullet
            const newPositionOffset = checks.getDirection(this.x, this.y, this.mouseX, this.mouseY);
            let bullet = new Bullet(this.x,this.y,newPositionOffset[0], newPositionOffset[1], this.bulletHeight, this.bulletWidth, this.dmg, this.bulletSpeed,this.bulletColor,this.bulletPen,this.bulletSize);
            this.bullets.push(bullet);
            this.onCooldown = true;
            setTimeout(() => {
                this.onCooldown = false;
            }, (1/this.firerate)*1000);
            //start cooldown timer
        }
    }

   

    move() {
        const bounds = checks.checkIfInBounds(this, this.canvasRect);
        if (this.downPressed && bounds['down']) {
            this.y += this.speed;
        }
        if (this.upPressed && bounds['up']) {
            this.y -= this.speed;
        }
        if (this.leftPressed && bounds['left']) {
            this.x -= this.speed;
        }
    
        if (this.rightPressed && bounds['right']) {
            this.x += this.speed;
        }
    }

    changeElement(element) {
        this.color = element.color;
        this.dmg = element.dmg;
        this.firerate = element.firerate;
        this.projectileSize = element.projectileSize;
        this.bulletSpeed = element.bulletSpeed;
        this.bulletColor = element.bulletColor;
        let elementDisplay = document.getElementById('currentElement');
        elementDisplay.style.backgroundColor = element.color;
        elementDisplay.style.color = 'black';
        elementDisplay.innerHTML = element.name;
    }


    keydown = (key) => {
        if (key.code === "KeyW"){
            this.upPressed = true;
        }
        if (key.code === "KeyS"){
            this.downPressed = true;
        }
        if (key.code === "KeyA"){
            this.leftPressed = true;
        }
        if (key.code === "KeyD"){
            this.rightPressed = true;
        }
    };

    keyup = (key) => {
        if (key.code === "KeyW"){
            this.upPressed = false;
        }
        if (key.code === "KeyS"){
            this.downPressed = false;
        }
        if (key.code === "KeyA"){
            this.leftPressed = false;
        }
        if (key.code === "KeyD"){
            this.rightPressed = false;
        }
    };

    mousedown = (e) => {
        this.mousePressed = true;
        this.mouseX = e.offsetX;
        this.mouseY = e.offsetY;
        
    };
    mouseup = (e) => {
        this.mousePressed = false;
        
    };
    mousemove = (e) => {
        this.mouseX = e.offsetX;
        this.mouseY = e.offsetY;
        // console.log('mouseX = ', e.offsetX);
        // console.log('mouseY = ', e.offsetY);
    };

  

}
