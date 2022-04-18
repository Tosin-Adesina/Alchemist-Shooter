export default class Bullet{
    constructor(x,y,height,width,dmg,speed,xdir,ydir,color,pen=1){
        this.x = x;
        this.y = y;
        this.height = height;
        this.width = width,
        this.dmg = dmg;
        this.speed = speed;
        this.xdir = xdir;
        this.ydir = ydir;
        this.color = color;
        this.pen = pen;
    }
}