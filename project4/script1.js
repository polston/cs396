var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");

var spacePressed = false;
var mousePressed = false;

var player = {
  x: canvas.width/2,
  y: canvas.height - 30,
  r: 10 
};

var target = {
    x: canvas.width/2,
    y: 30,
    r: 30
};

var cannonBall = {
    x: player.x,
    y: player.y,
    r: player.r /2,
    angle: 0,
    speed: 10,
    active: false
};

function draw(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawPlayer();
    renderMouseAngle();
    cannonBallWallCollision();
    if(cannonBall.active === true){
        drawCannonBall();
        shootCannonBall();
    }

    drawTarget();
    targetCollision();
    //console.log(cannonBall.x);
}

function degToRad(angle){
  return angle * (Math.PI / 180)
}

// Convert radians to degrees
function radToDeg(angle) {
    return angle * (180 / Math.PI);
}

canvas.addEventListener("mousemove", mouseMoveHandler, false);
canvas.addEventListener("mousedown", mouseDownHandler, false);
canvas.addEventListener("mouseup", mouseUpHandler, false);

function getMousePos(canvas, e) {
    var rect = canvas.getBoundingClientRect();
    return {x: Math.round((e.clientX - rect.left)/(rect.right - rect.left) * canvas.width),
            y: Math.round((e.clientY - rect.top)/(rect.bottom - rect.top) * canvas.height)};
}

function mouseMoveHandler(e){
    if(mousePressed) {
        //mouse pos
        var pos = getMousePos(canvas, e);

        //mouse angle
        var mouseAngle = radToDeg(Math.atan2((player.y) - pos.y,
            pos.x - (player.x)));

        if (mouseAngle < 0) {
            mouseAngle = 180 + (180 + mouseAngle);
        }
        player.angle = mouseAngle;
    }

}

function mouseDownHandler() {
    mousePressed = true;
}

function mouseUpHandler() {
    mousePressed = false;
}

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

function keyDownHandler(e) {
    if(e.keyCode == 32) {
        spacePressed = true;
        cannonBall.active = true;
        cannonBall.angle = degToRad(player.angle);
    }
}

function keyUpHandler(e) {
    if(e.keyCode == 32) {
        spacePressed = false;
    }
}

function shootCannonBall() {
    cannonBall.x += cannonBall.speed * Math.cos(cannonBall.angle);
    cannonBall.y += cannonBall.speed * -1 *Math.sin(cannonBall.angle);
    console.log("x: " + cannonBall.x + " y: " + cannonBall.y + " tx: " + target.x + " ty: " + target.y);
}

function cannonBallWallCollision() {
    if (cannonBall.x < 0 || cannonBall.x > canvas.width) {
        cannonBall.active = false;
        resetCannonBall();
    }
    else if (cannonBall.y < 0 || cannonBall.y > canvas.height) {
        cannonBall.active = false;
        resetCannonBall();
    }
}

function targetCollision() {
    if (cannonBall.x < target.x + target.r*2 && cannonBall.x > target.x &&
        cannonBall.y < target.y + target.r*2 && cannonBall.y > target.y) {
            console.log("point");
    }

    // var x = cannonBall.x - target.x;
    // var y = cannonBall.y - target.y;
    // var dist = Math.sqrt(x*x + y*y);
    // //no collision
    //
    // if(dist < cannonBall.r + target.r) {
    //     //collision
    //     console.log("point");
    // }
}

function resetCannonBall() {
    cannonBall.x = player.x;
    cannonBall.y = player.y;
}

function renderMouseAngle() {
  var centerX = player.x;
  var centerY = player.y;

  ctx.lineWidth = 2;
  ctx.strokeStyle = "#0000ff";

  ctx.beginPath();
  ctx.moveTo(centerX, centerY);
  ctx.lineTo(centerX + 1.5 * player.r * Math.cos(degToRad(player.angle)),
              centerY - 1.5 * player.r * Math.sin(degToRad(player.angle)));
    //ctx.lineTo(mousePos.x,mousePos.y);
  ctx.stroke();
}

function drawPlayer() {
  ctx.beginPath();
  ctx.arc(player.x, player.y, player.r, 0, Math.PI*2);
  ctx.fillStyle = "0095DD";
  ctx.fill();
  ctx.closePath();
}

function drawTarget() {
    ctx.beginPath();
    ctx.arc(target.x, target.y, target.r, 0, Math.PI*2);
    ctx.fillStyle = "0095DD";
    ctx.fill();
    ctx.closePath();
}

function drawCannonBall() {
    ctx.beginPath();
    ctx.arc(cannonBall.x, cannonBall.y, cannonBall.r, 0, Math.PI*2);
    ctx.fillStyle = "0095DD";
    ctx.fill();
    ctx.closePath();
}

setInterval(draw, 10);