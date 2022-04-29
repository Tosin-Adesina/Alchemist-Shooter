import Enemy from "/scripts/Enemy.js";
export default class SpawnTemplate{
    constructor(numberOfEnemiesInRow, numberOfRows, directions,maxHordeSpeed,hordeDmg, hordeColor="purple"  ){
        this.numOfEnemiesInRow = numberOfEnemiesInRow;
        this.rows = numberOfRows;
        this.dirs = directions;
        this.maxSpd = maxHordeSpeed;
        this.dmg = hordeDmg;
    }


    //spawning functions
    //top = 0
    static spawnTop(canvas, enemies, rows, amount, maxSpd, dmg){
        const colors = ['red', 'orange','yellow','green','blue','indigo','violet'];
        const ystart = -100;
        const yshift = 120;

        const xstart = 20;
        const xshift = ((canvas.width)/amount);
        //const scale = Math.floor((canvas.width - xstart)/xshift);
        
        for(let t = 0; t < rows; t++){
            const y = (ystart-(yshift*t));
            for( let i = 0; i < amount; i++){
                const x = xstart + xshift*i;
                const randSpd = (maxSpd*Math.random())+1;
                Enemy.addEnemy(enemies,x,y,randSpd, dmg,5-t,colors[t],1);
            }
        }
    }

    //right = 1
    static spawnRight(canvas, enemies, rows, amount, maxSpd, dmg){
        const colors = ['red', 'orange','yellow','green','blue','indigo','violet'];
        const xstart = 100+canvas.width;
        const xshift = 120;

        const ystart = 20;
        const yshift = ((canvas.height)/amount);
        //const scale = Math.floor((canvas.height - ystart)/yshift);
        
        for(let t = 0; t < rows; t++){
            const x = (xstart+(xshift*t));
            for( let i = 0; i < amount; i++){
                const y = ystart + yshift*i;
                const randSpd = (maxSpd*Math.random())+1;
                Enemy.addEnemy(enemies,x,y,randSpd, dmg,5-t,colors[t],1);
            }
        }
    }

    //bottom = 2
    static spawnBottom(canvas, enemies, rows, amount, maxSpd, dmg){
        const colors = ['red', 'orange','yellow','green','blue','indigo','violet'];
        const ystart = 100+canvas.height;
        const yshift = 120;

        const xstart = 20;
        const xshift = ((canvas.width)/amount);

        //const scale = Math.floor((canvas.width - xstart)/xshift);
        
        for(let t = 0; t < rows; t++){
            const y = (ystart+yshift*t);
            for( let i = 0; i < amount; i++){
                const x = xstart + xshift*i;
                const randSpd = (maxSpd*Math.random())+1;
                Enemy.addEnemy(enemies,x,y,randSpd, dmg,5-t,colors[t],1);
            }
        }
    }

    //left = 3
    static spawnLeft(canvas, enemies, rows, amount, maxSpd, dmg){
        const colors = ['red', 'orange','yellow','green','blue','indigo','violet'];
        const xstart = -100;
        const xshift = 120;

        const ystart = 20;
        const yshift = ((canvas.height)/amount);
        //const scale = Math.floor((canvas.height - ystart)/yshift);
        
        for(let t = 0; t < rows; t++){
            const x = (xstart-(xshift*t));
            for( let i = 0; i < amount; i++){
                const y = ystart + yshift*i;
                const randSpd = (maxSpd*Math.random())+1;
                Enemy.addEnemy(enemies,x,y,randSpd, dmg,5-t,colors[t],1);
            }
        }
    }

    

    static spawnEnemies(canvas, enemies, levelList){
        const spawnDirections = [this.spawnTop, this.spawnRight, this.spawnBottom, this.spawnLeft];
        const rand = Math.floor(Math.random()*levelList.length);
        const level = levelList[rand];
        for(let i = 0; i < level.dirs.length; i++){
            const dir = level.dirs[i];
            const spawn = spawnDirections[dir];
            spawn(canvas, enemies, level.rows, level.numOfEnemiesInRow, level.maxSpd, level.dmg)
        }
    }
}