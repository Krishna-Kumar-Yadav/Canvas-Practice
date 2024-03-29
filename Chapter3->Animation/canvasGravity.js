const canvas = document.querySelector("canvas");
const c = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

window.addEventListener("resize", function () {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});

function ball(x, y, dx, dy, radius, color) {
  this.x = x;
  this.y = y;
  this.dx = dx;
  this.dy = dy;
  this.radius = radius;
  this.color = color;

  this.draw = function () {
    c.beginPath();
    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    c.fillStyle = this.color;
    c.fill();
    c.stroke();
  };

  this.update = function() {
    if (this.y + this.radius > canvas.height) {
      this.dy = -this.dy * 0.8; 
    } else {
      this.dy += 0.5; 
    }

    this.y += this.dy;

    this.draw();
  };

}

let bubbles = [];
function randomIntFromRange(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function init() {
  for (let i = 0; i < 100; i++) {
    let x = Math.random() * canvas.width;
    let y = Math.random() * canvas.height ;
    let dx = Math.random() * 2; // Random horizontal velocity
    let dy = Math.random() * 2 ; // Random vertical velocity
    let radius = Math.random() * 20 + 10;
    let color = `rgba(${Math.random() * 255},${Math.random() * 255},${Math.random() * 255},0.8)`;
    bubbles.push(new ball(x, y, dx, dy, radius, color));
  }
}

function animate() {
  requestAnimationFrame(animate);
  c.clearRect(0,0,innerWidth,innerHeight)
  bubbles.forEach((circle) => {
    circle.update();
  });
}

init();
animate();

/* window.addEventListener("mousemove",function(event){
  console.log(event.clientX,event.clientY);
}) */

console.log(canvas.width,canvas.height);