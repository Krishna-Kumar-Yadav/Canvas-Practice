import {noise} from "./node_modules/@chriscourses/perlin-noise/index.js"

const canvas = document.querySelector("canvas");
const c = canvas.getContext("2d");

canvas.width = innerWidth;
canvas.height = innerHeight;

/* const mouse = {
  x: innerWidth / 2,
  y: innerHeight / 2
};

// Event Listeners
addEventListener("mousemove", (event) => {
  mouse.x = event.clientX;
  mouse.y = event.clientY;
}); */

addEventListener("resize", () => {
  canvas.width = innerWidth;
  canvas.height = innerHeight;

  init();
});

// Objects
class Circle {
  constructor(x, y, radius, color, offset) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;
    this.offset = offset;
  }

  draw() {
    c.save();
    c.alpha = 0.01;
    c.beginPath();
    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    c.fillStyle = this.color;
    c.fill();
    c.closePath();
    c.restore();
  }

  update() {
    this.draw();
  }
}

// Implementation
let circles;
function init() {
  circles = [];

  for (let i = 0; i < 500; i++) {
    circles.push(
      new Circle(
        20,
        20,
        10,
        `hsl(${255 * (i / 500)}, 50%, 50%)`,
        Math.random() * 2
      )
    );
  }
}

// Animation Loop
let time1 = 0;
let time2 = 0;
function animate() {
  requestAnimationFrame(animate);
  c.fillStyle = "rgba(0, 0, 0, 0.01)";
  c.fillRect(0, 0, canvas.width, canvas.height);

  circles.forEach((circle) => {
    circle.x = noise(time1 + circle.offset) * innerWidth;
    circle.y = noise(time2 + circle.offset) * innerHeight;
    circle.update();
  });

  time1 += 0.003;
  time2 += 0.005;
}

init();
animate();
