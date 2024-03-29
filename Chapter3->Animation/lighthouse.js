/* import { gsap } from "./node_modules/gsap/index.js";

console.log(gsap); */

let canvas = document.querySelector("canvas");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

addEventListener("resize", function () {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});

let c = canvas.getContext("2d");

let mouse = {
  x: undefined,
  y: undefined,
};
addEventListener("mousemove", (event) => {
  mouse.x = event.clientX;
  mouse.y = event.clientY;

  gsap.to(mouse,{
    x : event.clientX - canvas.width/2,
    y : event.clientY - canvas.height/2,
    duration : 1
  })
});

class particle {
  constructor(x, y, radius, color, distance) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;
    this.distance = distance;
  }

  draw() {
    c.beginPath();
    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    c.fillStyle = this.color;
    c.fill();
    c.closePath();
  }

  update() {
    let angle = Math.atan2(
      mouse.y - canvas.height / 2,
      mouse.x - canvas.width / 2
    );

    this.x = canvas.width / 2 + Math.cos(angle) * this.distance;
    this.y = canvas.height / 2 + Math.sin(angle) * this.distance;

    this.draw();
  }
}

let particles = [];

function init() {
  let count = 200;
  let increment = 360/count;

  for (let i = 0; i < count; i++) {
    let x = canvas.width / 2 + i;
    let y = canvas.height / 2;
    let radius = 5;
    

    let color = `hsl(${increment * i},50%,50%)`;

    particles.push(new particle(x, y, radius, color, i));
  }
}

function animate() {
  requestAnimationFrame(animate);
  c.fillStyle = 'rgba(0,0,0,0.03)';
  c.fillRect(0,0,canvas.width,canvas.height);
  /* c.clearRect(0, 0, canvas.width, canvas.height); */

  particles.forEach((element) => {
    element.update();
  });
  
}

init();
animate();
