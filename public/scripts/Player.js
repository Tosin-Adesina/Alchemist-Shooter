export default class Player{
    constructor(x, y){
        this.x = x;
        this.y = y;
        this.width = 50;
        this.height = 50;
        this.radius = 25;
        this.speed = 4;
        this.downPressed = false;
        this.upPressed = false;
        this.leftPressed = false;
        this.rightPressed = false;

        document.addEventListener('keydown', this.keydown);
        document.addEventListener('keyup', this.keyup);
    }

    draw(ctx){
        this.move();
        ctx.strokeStyle = 'white';
        ctx.fillStyle = 'black';

        //player is a square
        // ctx.strokeRect(this.x, this.y, this.width, this.height);
        // ctx.fillRect(this.x, this.y, this.width, this.height);

        //player is a circle
        ctx.beginPath();
        ctx.strokeStyle = 'teal';
        ctx.ellipse(this.x, this.y, this.radius, this.radius, 0, 0, Math.PI * 2, false);
        ctx.stroke();

    }

    move() {
        
        if (this.downPressed) {
          this.y += this.speed;
        }
        if (this.upPressed) {
          this.y -= this.speed;
        }
        if (this.leftPressed) {
          this.x -= this.speed;
        }
    
        if (this.rightPressed) {
          this.x += this.speed;
        }
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

}
