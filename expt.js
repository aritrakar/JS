const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

const width = canvas.width = window.innerWidth;
const height = canvas.height = window.innerHeight;

var count = 0;
const para = document.querySelector('p');

function random(min,max) {
  const num = Math.floor(Math.random()*(max-min)) + min;
  return num;
}

function Shape(x, y, velX, velY, exists){
    this.x = x;
    this.y = y;
    this.velX = velX;
    this.velY = velY;
    this.exists = exists;
}

function Ball(x, y, velX, velY, exists, color, size) {
    Shape.call(this, x, y, velX, velY, exists); 
    this.color = color;
    this.size = size;
  }

  Ball.prototype = Object.create(Shape.prototype);
  Ball.prototype.constructor = Ball;

  Ball.prototype.draw = function() {
    ctx.beginPath();
    ctx.fillStyle = this.color;
    ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
    ctx.fill();
  }

  Ball.prototype.update = function() {
      if ((this.x + this.size) >= width){this.velX = -this.velX;}
      if ((this.x - this.size) <= 0) {this.velX = -(this.velX);}
      if ((this.y + this.size) >= height){this.velY = -this.velY;}
      if ((this.y - this.size) <= 0) {this.velY = -(this.velY);}
      
      this.x += this.velX;
      this.y += this.velY;
  }

  let balls = []

  while (balls.length < 25){
      var c = 'rgb('+random(0,255)+','+random(0,255)+','+random(0,255)+')';
      var size = random(10,20);
      var newBall = new Ball(
          random(0 + size, width - size),
          random(0 + size, height - size),
          random(-7,7), 
          random(-7,7),
          true,
          c, 
          size
      );
      count++;
      balls.push(newBall);
      para.textContent = "Ball count: "+count;
  }

  Ball.prototype.collisionDetect = function(){
      for(var i=0; i<balls.length;i++){
          if(!(this === balls[i])){
              var dx = this.x - balls[i].x; 
              var dy = this.y - balls[i].y;
              var dist = Math.sqrt(Math.pow(dx,2) + Math.pow(dy,2));
              if (dist <= this.size + balls[i].size){
                  balls[i].color = 'rgb('+random(0,255)+','+random(0,255)+','+random(0,255)+')';
              }
          }
      }
  }

  //EvilCircle 

function EvilCircle (x, y, velX, velY, exists){
    velX = 20; velY = 20;
    Shape.call(this, x, y, velX, velY, exists);
    this.color = 'white'; 
    this.size = 10;
}
EvilCircle.prototype = Object.create(Shape.prototype);
EvilCircle.prototype.constructor = EvilCircle;

EvilCircle.prototype.draw = function() {
    ctx.beginPath();
    ctx.lineWidth = 3;
    ctx.strokeStyle = this.color;
    ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
    ctx.stroke();
  }

EvilCircle.prototype.checkBounds = function() {
    if ((this.x + this.size) >= width){this.x -= 3;}
    if ((this.x - this.size) <= 0) {this.x += 3;}
    if ((this.y + this.size) >= height){this.y -= 3;}
    if ((this.y - this.size) <= 0) {this.y += 3;}
}

EvilCircle.prototype.setControls = function() {
    let _this = this;
    window.onkeydown = function(e) {
    if (e.key === 'a') {
      _this.x -= _this.velX;
    } else if (e.key === 'd') {
      _this.x += _this.velX;
    } else if (e.key === 'w') {
      _this.y -= _this.velY;
    } else if (e.key === 's') {
      _this.y += _this.velY;
    }
  }
}

EvilCircle.prototype.collisionDetect = function(){
    for(var i=0; i<balls.length;i++){
        if(balls[i].exists === true){
            var dx = this.x - balls[i].x; 
            var dy = this.y - balls[i].y;
            var dist = Math.sqrt(Math.pow(dx,2) + Math.pow(dy,2));
            if (dist <= this.size + balls[i].size){
                balls[i].exists = false; count--;
                para.textContent = "Ball count: "+count;
            }
        }
    }
}

let evil = new EvilCircle(random(0,width), random(0,height), true);
evil.setControls();

  function loop() {
    ctx.fillStyle = 'rgba(0, 0, 0, 0.25)';
    ctx.fillRect(0, 0, width, height);

    for (let i = 0; i < balls.length; i++) {
        if(balls[i].exists){
            balls[i].draw();
            balls[i].update();
            balls[i].collisionDetect();
        }
        if(count==0){para.textContent = "You win!";}
    }
    
    evil.draw()
    evil.checkBounds();
    evil.collisionDetect();

    requestAnimationFrame(loop);
  }

  loop();