export default class checks{
    static getDirection(playerX, playerY, bulletX, bulletY, speed){
        let xdir = bulletX-playerX;
        let ydir = bulletY-playerY;
        let distance = Math.sqrt(Math.pow(xdir,2) + Math.pow(ydir,2));
        let scale = distance/speed;
        xdir = xdir/scale;
        ydir = ydir/scale;
        return [xdir, ydir];
    }

    static checkIfInBounds(b, e){
        // console.log('b.x = ', b.x);
        // console.log('canvas.x = ', e.x);
        // console.log('canvas.width = ', e.width);
        // console.log('canvas.y = ', e.y);
        // console.log('canvas.height = ', e.height);

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
}