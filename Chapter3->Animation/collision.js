let canvas = document.querySelector("canvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

window.addEventListener("resize", function () {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});

let c = canvas.getContext("2d");

let mouse = {};
window.addEventListener("mousemove",event=>{
  mouse.x = event.clientX;
  mouse.y = event.clientY;
})

 

function circle(x, y, dx, dy, radius, color) {
  this.x = x;
  this.y = y;
  this.dx = dx;
  this.dy = dy;
  this.radius = radius;
  this.color = color;

  this.draw = () => {
    c.beginPath();
    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    c.strokeStyle = "black";
    c.fillStyle = this.color;
    c.fill();
    c.stroke();
    c.closePath();
  };

  this.update = () => {
    if(getDistance(this.x,mouse.x,this.y,mouse.y) < 120){
      this.color = `rgba(${Math.random() * 255},${Math.random() * 255},${Math.random() * 255},0.8)`
    }
    else if(getDistance(this.x,mouse.x,this.y,mouse.y) > 120){
      this.color = "white"
    }


    particles.forEach((particle) => {
      if (particle !== this) {
        const distance = Math.sqrt(
          Math.pow(this.x - particle.x, 2) + Math.pow(this.y - particle.y, 2)
        );
        if (distance - (this.radius + particle.radius) < 0) {
          this.dx = -this.dx;
          this.dy = -this.dy;
        }
      }
    });

    if (this.x + this.radius > innerWidth || this.x - this.radius < 0) {
      this.dx = -this.dx;
    }
    if (this.y + this.radius > innerHeight || this.y - this.radius < 0) {
      this.dy = -this.dy;
    }

    this.x += this.dx;
    this.y += this.dy;
    this.draw();
    
  };
}
let particles = [];

function getDistance(x1, x2, y1, y2) {
  let xDistance = x2 - x1;
  let yDistance = y2 - y1;
  let result = Math.sqrt(Math.pow(xDistance, 2) + Math.pow(yDistance, 2));
  return result;
}

function init() {
  for (let i = 0; i < 100; i++) {
    let x = Math.random() * innerWidth;
    let y = Math.random() * innerHeight;
    let dx = Math.random() * 2;
    let dy = Math.random() * 2;
    let radius = 10;
    let color = "white";

    if (i !== 0) {
      for (let j = 0; j < particles.length; j++) {
        if (
          getDistance(x, particles[j].x, y, particles[j].y) - radius * 2 <
          0
        ) {
          x = Math.random() * innerWidth;
          y = Math.random() * innerHeight;

          j = -1;
        }
      }
    }
    particles.push(new circle(x, y, dx, dy, radius, color));
  }
  
}


function animate() {
  requestAnimationFrame(animate);
  c.clearRect(0, 0, innerWidth, innerHeight);
  particles.forEach((particle) => {
    particle.update();
  });
  
}

init();
animate();
