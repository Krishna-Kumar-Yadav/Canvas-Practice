let canvas = document.querySelector("canvas");

canvas.height = window.innerHeight;
canvas.width = window.innerWidth;

let c = canvas.getContext("2d");

/* let x = 100
let y = 200
let dx = 2
let dy = 2
let radius  = 20
function animate(){
  requestAnimationFrame(animate);
  c.clearRect(0,0,innerWidth,innerHeight)

  c.beginPath()
  c.arc(x+dx,y,radius,0,Math.PI * 2,true);
  c.strokeStyle = "red";
  c.closePath()
  c.stroke();


  if (x + radius < 0 || x - radius > innerWidth){
    dx = -dx
  }
  if (y + radius < 0 || y - radius > innerHeight){
    dy = -dy
  }
  x += dx
  y += dy
  
}

animate(); */

class Circle {
  constructor(x, y, dx, dy, radius, color) {
      this.x = x;
      this.y = y;
      this.dx = dx;
      this.dy = dy;
      this.radius = radius;
      this.color = color;
  }

  draw() {
      c.beginPath();
      c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
      c.fillStyle = this.color;
      c.fill();
      c.closePath();
  }

  update() {
      if (this.x + this.radius > canvas.width || this.x - this.radius < 0) {
          this.dx = -this.dx;
      }
      if (this.y + this.radius > canvas.height || this.y - this.radius < 0) {
          this.dy = -this.dy;
      }

      this.x += this.dx;
      this.y += this.dy;

      this.draw();
  }
}

// Create multiple circles
const circles = [];
for (let i = 0; i < 100; i++) {
  const radius = Math.random() * 30 + 10;
  const x = Math.random() * (canvas.width - radius * 2) + radius;
  const y = Math.random() * (canvas.height - radius * 2) + radius;
  const dx = (Math.random() - 0.5) * 4 +1; 
  const dy = (Math.random() - 0.5) * 4 +1; 
  const color = `rgba(${Math.random() * 255},${Math.random() * 255},${Math.random() * 255},0.8)`; 
  circles.push(new Circle(x, y, dx, dy, radius, color));
}

// Animation loop
function animate() {
  requestAnimationFrame(animate);
  c.clearRect(0, 0, canvas.width, canvas.height);

  circles.forEach(circle => {
      circle.update();
  });
}

animate();
