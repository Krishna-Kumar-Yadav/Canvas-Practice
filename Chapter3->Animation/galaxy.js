let canvas = document.querySelector("canvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});

let c = canvas.getContext("2d");

class particle {
  constructor(x, y, radius, color) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;
  }

  draw() {
    
    c.beginPath();
    c.shadowColor = this.color;
    c.shadowBlur = 20;
    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    c.fillStyle = this.color;
    c.fill();
    c.closePath();
  }

  update() {
    this.draw();
  }
}

let mouseClick = false;

addEventListener("mousedown",()=>{
  mouseClick = true;
})

addEventListener("mouseup",()=>{
  mouseClick = false;
})

let particles;
const galaxyColors = [
  "#add8e6", // Light Blue (Blue Stars)
  "#ffffff", // White (White Stars)
  "#ffd700", // Gold (Yellow Stars)
  "#ff7f50", // Coral (Orange Stars)
  "#ff0000", // Red (Red Stars)
  "#8b4513", // Brown (Brown Dwarfs)
  "#00f0ff", // Electric Blue (Blue Shades)
  "#007fff", // Azure (Blue Shades)
  "#4d4dff", // Royal Blue (Blue Shades)
  "#3366ff", // Cerulean Blue (Blue Shades)
  "#f5f5dc", // Beige (White and Yellow Shades)
  "#ffff00", // Yellow (White and Yellow Shades)
  "#fffdd0", // Cream (White and Yellow Shades)
  "#fffff0", // Ivory (White and Yellow Shades)
  "#ff4500", // Orange Red (Orange and Red Shades)
  "#ff6347", // Tomato (Orange and Red Shades)
  "#8b0000", // Dark Red (Orange and Red Shades)
  "#8b7765", // Rosy Brown (Brown and Earth Tones)
  "#ffc0cb", // Pink (Pink and Purple Shades)
  "#ff69b4", // Hot Pink (Pink and Purple Shades)
  "#800080", // Purple (Pink and Purple Shades)
  "#9400d3", // Dark Violet (Pink and Purple Shades)
  "#008000", // Green (Green Shades)
  "#32cd32", // Lime Green (Green Shades)
  "#7fff00", // Chartreuse (Green Shades)
  "#00ff00", // Lime (Green Shades)
  "#000080", // Navy Blue (Celestial Colors)
  "#191970", // Midnight Blue (Celestial Colors)
  "#483d8b", // Dark Slate Blue (Celestial Colors)
  "#d3d3d3", // Light Gray (Celestial Colors)
];
console.log(galaxyColors.length);

function init() {
  particles = [];

  for (let i = 0; i < 500; i++) {
    const x = Math.random() * (canvas.width+300) - (canvas.width+300)/2;
    const y = Math.random() * (canvas.height+800) - (canvas.height+800)/2;
    const radius = Math.random() * 2;
    const color = galaxyColors[Math.floor(Math.random() * galaxyColors.length)];
    const alpha = Math.random();
    particles.push(new particle(x,y,radius,color));
  }
}
let radian = 0;
let alpha = 1;

function animate() {
  requestAnimationFrame(animate);
  
  c.fillStyle = `rgba(10,10,10,${alpha})`;
  c.fillRect(0, 0, canvas.width, canvas.height);
  c.save();
  c.translate(canvas.width/2,canvas.height/2)
  c.rotate(radian);
  particles.forEach(element=>{
    element.update();
  })
  c.restore()

  radian += 0.005;
  if(mouseClick && alpha >= 0.1){
    alpha -= 0.01;
  }
  else if(!mouseClick && alpha < 1){
    alpha += 0.01;
  }
}

init();
animate();
