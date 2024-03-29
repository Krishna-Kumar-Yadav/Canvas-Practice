const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

window.addEventListener("resize",function(){
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
})

const bubbles = [];
const resizeBubbles = [];
const maxBubbleSize = 50;
const minBubbleSize = 10;

function Bubble(x, y, radius, color) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;
    this.dx = Math.random() * 2 - 1;
    this.dy = Math.random() * 2 - 1;

    this.draw = function() {
        c.beginPath();
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        c.fillStyle = this.color;
        c.fill();
        c.closePath();
    };

    this.update = function() {
        this.x += this.dx;
        this.y += this.dy;

        if (this.x + this.radius > canvas.width || this.x - this.radius < 0) {
            this.dx = -this.dx;
        }
        if (this.y + this.radius > canvas.height || this.y - this.radius < 0) {
            this.dy = -this.dy;
        }

        this.draw();
    };
    this.resize = function(){

      this.x += this.dx;
      this.y += this.dy;

  
      this.draw();
    };
}


function init(){
  for (let i = 0; i < 800; i++) {
    let x = Math.random() * innerWidth
    let y = Math.random() * innerHeight
    let radius = Math.random() * 4 + 1;
    let color = `rgba(${Math.random() * 255},${Math.random() * 255},${Math.random() * 255},0.8)`

    bubbles.push(new Bubble(x,y,radius,color));
  }
}

function createBubble(event) {
   c.clearRect(0,0,innerWidth,innerHeight)
    const x = event.clientX;
    const y = event.clientY;
    const radius = minBubbleSize + (maxBubbleSize - minBubbleSize) * Math.random();
    const color = `rgba(${Math.random() * 255},${Math.random() * 255},${Math.random() * 255},0.8)`;

    resizeBubbles.push(new Bubble(x, y, radius, color));
}

canvas.addEventListener('mousemove', (event) => {
  
  createBubble(event);
});

function animate() {
  requestAnimationFrame(animate);
  c.clearRect(0, 0, canvas.width, canvas.height);

  bubbles.forEach(bubble => {
      bubble.update();
  });
  resizeBubbles.forEach(bubble => {
    bubble.resize();
});
}

init();
animate();