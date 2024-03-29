let canvas = document.querySelector('canvas');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

addEventListener('resize',()=>{
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
})

let c = canvas.getContext('2d');

let mouse = {
  x : undefined,
  y : undefined
};

let particles = [];

addEventListener("mousemove",event=>{
  mouse.x = event.clientX;
  mouse.y = event.clientY;

  init(mouse.x,mouse.y);
  setInterval(()=>{
    init(mouse.x,mouse.y)
  },1000)
})



class particle{
 
  constructor(x,y,radius,color,radian){
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;
    this.radian = radian;
    this.velocity = 0.5;
  }

  draw(){
    c.beginPath();
    c.arc(this.x,this.y,this.radius,0,Math.PI * 2,false);
    c.fillStyle = this.color;
    c.fill();
    c.closePath();
  }

  update(){
    this.x += Math.sin(this.radian) * this.velocity ;
    this.y += Math.cos(this.radian) * this.velocity;
    
    
    this.draw();
  }
}

function init(x,y){
  //particles = [];
  const particleCount = 30;
  const angle = 360/particleCount;

  for (let i = 0; i < particleCount; i++) {
    particles.push(new particle(x,y,5,"blue",angle * i * 0.05));
    
  }
}

function animate(){
  requestAnimationFrame(animate);
  c.fillStyle = 'rgba(0,0,0,1)'
  c.fillRect(0,0,canvas.width,canvas.height)
  

  particles.forEach(element => {
    if(particles.length < 5000){
      element.update();
    }
    else{
      particles.shift();
    }
  });
  //console.log(particles);
}

init()
animate()