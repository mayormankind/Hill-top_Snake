const GameBoard = document.querySelector('.board');
const layout = GameBoard.getContext("2d");

class snakeTail{
    constructor(x,y){
        this.x = x;
        this.y = y;
    }
}

let speed = 7;
let score = 0;
let snakeTails = [];
let taillength = 2;

let tiles =20; 
let subtile =10; 
let tileSize = GameBoard.width/tiles - 2;
let [headX,headY] = [10,10];
let [FoodX,FoodY] = [Math.floor(Math.random()*tiles),Math.floor(Math.random()*tiles)];
let [velX,velY] = [1,0];
const sound = new Audio("Swish.mp3");
const gameOverint = new Audio("playtime.mp3");
(function GameDraw(){
    (function SnakesPosition(){
        headX += velX;
        headY += velY;
    }());
    document.body.addEventListener('keydown',snakeDirection);
    let result = gameover();
    if(result){
        return;
    }
    (function BoardDraw(){
        layout.fillStyle = 'black';
        layout.fillRect(0,0,GameBoard.width,GameBoard.height);
    }());
    (function SnakeCollission(){
        if(headX===FoodX && headY===FoodY){
            FoodX = Math.floor(Math.random()*tiles);
            FoodY = Math.floor(Math.random()*tiles);
            sound.play();
            taillength++;
            score++;
        }
    }());
    (function Food(){
        layout.fillStyle = 'green';
        layout.fillRect(FoodX*tiles,FoodY*tiles,tileSize,tileSize);
    }());
    (function SnakeHead(){
        
        layout.fillStyle = 'yellow';
        for(let i = 0; i< snakeTails.length; i++){
            let part = snakeTails[i];
            layout.fillRect(part.x * tiles,part.y * tiles,tileSize,tileSize);
        }
        snakeTails.push(new snakeTail(headX,headY));
        console.log(snakeTails);
        while(snakeTails.length > taillength){
            snakeTails.shift();
        }
        layout.fillStyle = 'gray';
        layout.fillRect(headX*tiles,headY*tiles,tileSize,tileSize);
    }());
    (function ScoreBoard(){
        layout.fillStyle= 'white';
        layout.font = '11px Tahoma';
        layout.fillText(`Score: ${score}`,GameBoard.width-60,13);
    }());
    function gameover(){
        let isover = false;
        if(velX===0 && velY===0){
            return false;
        }
        if(headX<0){
            isover = true;
        }
        else if(headY <0){
            isover = true;
        }
        else if(headX >= tiles){
            isover = true;
        }
        else if(headY >=tiles){
            isover = true;
        }
        for(let i = 0; i<snakeTails.length; i++){
            let part = snakeTails[i];
            if(part.x === headX && part.y === headY){
                isover = true;
                break;
            }
        }
        if(isover){
            layout.fillStyle = 'white';
            layout.font = '40px tahoma';
            layout.fillText(`Game Over!`,GameBoard.width/4.5,GameBoard.height/2);
            layout.font = '25px tahoma';
            layout.fillText(`Press Spacebar to play again`,GameBoard.width/10,GameBoard.height/1.7);
            gameOverint.play();
        }
        return isover;
    }

    function snakeDirection(e){
        //up
        if(e.keyCode==38){
            if(velY ==1)
            return;
            velY = -1;
            velX = 0;
        }
        //down
        if(e.keyCode==40){
            if(velY ==-1)
            return;
            velY = 1;
            velX = 0;
        }
        else if(e.keyCode==39){
            if(velX ==-1)
            return;
            velY = 0;
            velX = 1;
        }
        else if(e.keyCode==37){
            if(velX ==1)
            return;
            velY = 0;
            velX = -1;
        }
        if(result){
            if(e.keyCode==32){
                location.reload();  
            }
        }
        if(!result){
            if(e.keyCode==32){
                velX = 0;
                velY = 0;
                if(e.keyCode == 32){
                    layout.fillStyle='white';
                    layout.font = '40px tahoma';
                    layout.fillText(`Game Paused!`,GameBoard.width/4.5,GameBoard.height/2);
                    layout.font = '20px tahoma';   
                    layout.fillText(`Press the direction keys to continue!`,GameBoard.width/10,GameBoard.height/1.6);
                }
                return; 
            }
        }
    }
    setTimeout(GameDraw,1000/speed);
}());