export default class Bullet{
    constructor(x,y,xdir,ydir,height=5,width=5,dmg=1,speed=10,color='teal',pen=1,size=1){
        this.x = x;
        this.y = y;
        this.xdir = xdir;
        this.ydir = ydir;
        this.height = height;
        this.width = width,
        this.dmg = dmg;
        this.speed = speed;
        this.color = color;
        this.pen = pen;
        this.size = size;
    }
}