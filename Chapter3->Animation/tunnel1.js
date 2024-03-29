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

  init();
 
})



class particle{
 
  constructor(x,y,radius,color,velocity){
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;
    this.velocity = velocity;
  }

  draw(){
    c.beginPath();
    c.arc(this.x,this.y,this.radius,0,Math.PI * 2,false);
    c.fillStyle = this.color;
    c.fill();
    c.closePath();
  }

  update(){
    
    this.x += this.velocity.x;
    this.y += this.velocity.y;
    
    this.draw();
  }
}

let hue = 0;
let increment = 0;

function init(){
  //particles = [];
  const particleCount = 30;
  const angle = (Math.PI * 2)/particleCount;
  hue = Math.sin(increment);

  for (let i = 0; i < particleCount; i++) {
    const x = mouse.x + Math.sin(angle * i) ;
    const y = mouse.y + Math.cos(angle * i) ;

    particles.push(new particle(x,y,5,`hsl(${hue * 360},50%,50%)`,{
      x : Math.sin(angle * i),
      y : Math.cos(angle * i)
    }));
    
  }
  increment += 0.1;
}

function generateRing(){
  setTimeout(generateRing,200);
  const particleCount = 30;
  const angle = (Math.PI * 2)/particleCount;
  hue = Math.sin(increment);

  for (let i = 0; i < particleCount; i++) {
    const x = mouse.x + Math.sin(angle * i);
    const y = mouse.y + Math.cos(angle * i);

    particles.push(new particle(x,y,5,`hsl(${hue * 360},50%,50%)`,{
      x : Math.sin(angle * i),
      y : Math.cos(angle * i)
    }));
    
  }
  increment += 0.01;
}

function animate(){
  requestAnimationFrame(animate);
  c.fillStyle = 'rgba(0,0,0,1)'
  c.fillRect(0,0,canvas.width,canvas.height)
  

  particles.forEach((element,i) => {
    if(particles.length > 10000){
      particles.shift()
    }
    else{
      element.update()
    }
})
console.log(particles);
}
init()
animate()
generateRing();