// Select the canvas element and set its width and height to match the window size
let canvas = document.querySelector("canvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Event listener for window resize to update canvas dimensions
addEventListener("resize", function () {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});

// Get the 2D rendering context of the canvas
let c = canvas.getContext("2d");
let mouse = {
  x: undefined,
  y: undefined,
};

// Define the particles constructor function
function particles(x, y, radius, color) {
  const lastpoint = {
    x: this.x,
    y: this.y,
  };

  this.x = x;
  this.y = y;
  this.radius = radius;
  this.color = color;
  this.radian = Math.random() * Math.PI * 2;
  this.velocity = 0.05;
  this.area = Math.random() * 70 + 50;
  this.lastmouse = { x: x, y: y };

  // Method to draw the particle's path
  this.draw = (lastpoint) => {
    c.beginPath();
    c.strokeStyle = this.color;
    c.lineWidth = this.radius;
    c.moveTo(lastpoint.x, lastpoint.y);
    c.lineTo(this.x, this.y);
    c.stroke();
    c.closePath();
  };

  // Method to update particle's position and draw
  this.update = () => {
    const lastpoint = {
      x: this.x,
      y: this.y,
    };
    this.lastmouse += (mouse.x - this.lastmouse.x) * 0.05
    this.lastmouse += (mouse.y - this.lastmouse.y) * 0.05

    this.radian += this.velocity;
    this.x = mouse.x + Math.cos(this.radian) * this.area;
    this.y = mouse.y + Math.sin(this.radian) * this.area;

    this.draw(lastpoint);
  };
}
let particle = [];

// Event listener for mouse movement to update mouse coordinates
document.addEventListener("mousemove", (event) => {
  mouse.x = event.clientX;
  mouse.y = event.clientY;
});

// Function to initialize particles
function init() {
  for (let i = 0; i < 100; i++) {
    const radius = Math.random() * 2 + 1;
    let color = `rgba(${Math.random() * 255},${Math.random() * 255},${
      Math.random() * 255
    },0.8)`;
    particle.push(new particles(mouse.x, mouse.y, radius, color));
  }
}

// Function to animate the particles
function animate() {
  requestAnimationFrame(animate);
  c.fillStyle = "rgba(255,255,255,0.05)";
  c.fillRect(0, 0, canvas.width, canvas.height);
  particle.forEach((point) => {
    point.update();
  });
}

// Initialize particles and start animation
init();
animate();
