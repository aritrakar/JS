const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

const width = canvas.width = window.innerWidth;
const height = canvas.height = window.innerHeight;

var s1 = document.getElementById("s1");
var s2 = document.getElementById("s2");

const length = 100;
const breadth = 20;
var c1=0, c2=0;

function random(min,max) {
    const num = Math.floor(Math.random()*(max-min)) + min;
    if(num!=0){return num;}
    else { return num+1;}
}

function distance(x1, y1, x2, y2){
    return Math.sqrt(Math.pow(x1-x2,2) + Math.pow(y1-y2, 2));
}

//Ball

function Ball(x, y, velX, velY, size, color){
    this.x = x; this.y = y; this.velX=velX; this.velY = velY; this.size = size; this.color = color;
  /*  this.top = this.y - this.size;
    this.bottom = this.y + this.size;
    this.right = this.x + this.size;
    this.left = this.x - this.size; */
    var top=0, bottom=0, right=0, left=0;
}

Ball.prototype.draw = function() {
    ctx.beginPath();
    ctx.fillStyle = this.color;
    ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
    ctx.fill();
  }

Ball.prototype.update = function() { 
   // if ((this.x + this.size) >= width){this.velX = -this.velX;}
   // if ((this.x - this.size) <= 0) {this.velX = -(this.velX);}
    if ((this.y + this.size) >= height){this.velY = -this.velY;}
    if ((this.y - this.size) <= 0) {this.velY = -(this.velY);}
    
    this.x += this.velX;
    this.y += this.velY;
}

Ball.prototype.collision = function () {
    ball.top = ball.y - ball.size;
    ball.bottom = ball.y + ball.size;
    ball.right = ball.x + ball.size; 
    ball.left = ball.x - ball.size; 

    //let speed = Math.sqrt(Math.pow(ball.velX, 2) + Math.pow(ball.velY, 2));
    //let angle = Math.arctan()

    p1.top = p1.y;
    p1.bottom = p1.y + length;
    p1.right = p1.x + breadth;
    p1.left = p1.x;

    p2.top = p2.y;
    p2.bottom = p2.y + length;
    p2.right = p2.x + breadth;
    p2.left = p2.x;


    if((ball.right >= p2.left - 3) && (ball.right <= p2.left)){
        //console.log(1);
        if((ball.y <= p2.bottom) && (ball.y >= p2.top)){ 
            //console.log(2); 
            ball.velX = -ball.velX;
            p2.color = 'rgb('+random(0,255)+","+random(0,255)+","+random(0,255)+")";
        }
    }

    if((ball.left <= p1.right + 3) && (ball.left >= p1.right)){
        //console.log(3); 
        if((ball.y <= p1.bottom) && (ball.y >= p1.top)){ 
            //console.log(4);
            ball.velX = -ball.velX;
            p1.color = 'rgb('+random(0,255)+","+random(0,255)+","+random(0,255)+")";
        }
    } 
}

Ball.prototype.resetBall = function() {
    this.x = width/2; this.y = height/2;
    let r = random(-1,1);
    console.log(r);
    var inc = 1.0;
    inc += 0.01;
    if(r!=0){
        this.velX = r * this.velX * inc; 
        this.velY = r * this.velY * inc;
    } else {
        this.velX = (r - 1) * this.velX * inc; 
        this.velY = (r - 1) * this.velY * inc;
    }
}

//Paddle

function Paddle(x, y, velX, velY, l, b, color){
    this.x = x; this.y = y; this.velX=velX; this.velY = velY; this.l = l; this.b = b; this.color = color;
}

Paddle.prototype.draw = function () {
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x, this.y, this.b, this.l);
}

Paddle.prototype.setControls1 = function() { //Not working
    let _this = this;
    window.onkeydown = function(e) {
    if (e.key === 'w') {console.log("up");  _this.y -= _this.velY; } //w
    else if (e.key === 's') {console.log("down"); _this.y += _this.velY; } //s
   }
}
Paddle.prototype.setControls2 = function() {
    let _this = this;
    window.onkeydown = function(e) {
    if (e.keyCode == 38) { _this.y -= _this.velY; } //Arrow key up
    else if ( e.keyCode == 40) {  _this.y += _this.velY; } //Arrow key down
  }
}

Paddle.prototype.autoUpdate = function(){ //For automating paddle
    this.y += (ball.y - (this.y + length/2))*0.1;
}
Paddle.prototype.checkBounds = function() {
    if ((this.y + length) >= height){ this.y -= 3; }
    if (this.y <= 0) { this.y += 3; }
}

let ball = new Ball(width/2, height/2, 
    //random(-5,5), random(-5,5), 
    3,3,
    10, 'rgb(255,255,255)');

let p1 = new Paddle(
    10, height/2 - length/2, 
    15, 15, length, breadth, 'rgb(255,255,255)') //Left paddle, Computer

let p2 = new Paddle(
    (width - breadth - 10), height/2 - length/2, 
    15, 15, length, breadth, 'rgb(255,255,255)') //Right paddle, User

p1.setControls1();
p2.setControls2();

function canvasDivider() { 
    for(var r = 0; r <= height; r+=40){
        ctx.clearRect(width/2, r, 10, 25);
    }
}

function scoring(){
    if(ball.x + ball.size >= width){ s1.textContent = ++c1; ball.resetBall(); setTimeout(2000);}
    if(ball.x - ball.size <= 0){ s2.textContent = ++c2; ball.resetBall(); setTimeout(2000);}
}

function loop(){
    ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
    ctx.fillRect(0, 0, width, height);
    canvasDivider();

    /*ctx.fillStyle = "white";
    ctx.font = "70px fantasy"
    ctx.fillText("0", width/2 - 100, 70);
    ctx.fillText("0", width/2 + 70, 70); */

    ball.draw(); ball.update(); ball.collision();
    p1.draw(); p1.checkBounds(); //p1.autoUpdate();
    p2.draw(); p2.checkBounds(); //p2.autoUpdate();

    scoring();

    requestAnimationFrame(loop);
}

loop();
