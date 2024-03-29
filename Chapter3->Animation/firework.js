let canvas = document.querySelector('canvas');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

addEventListener("resize",function(){
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
})

let c = canvas.getContext('2d');

let mouse = {
  x: undefined,
  y: undefined
};

let gravity = 0.005;
let friction = 0.99

class particle{
  constructor(x,y,radius,color,velocity){
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;
    this.velocity = velocity;
    this.alpha = 1;
  }

  draw(){
    c.save();
    c.globalAlpha = this.alpha;
    c.beginPath();
    c.arc(this.x,this.y,this.radius,0,Math.PI * 2,false);
    c.fillStyle = this.color;
    c.fill();
    c.closePath();
    c.restore();
  }

  update(){
    this.velocity.x *= friction;
    this.velocity.y *= friction;
    this.velocity.y += gravity;
    this.x += this.velocity.x;
    this.y += this.velocity.y; 
    this.alpha -= 0.005;

    this.draw();
  }
}

let particles = []

window.addEventListener("click",event =>{
  mouse.x = event.clientX;
  mouse.y = event.clientY;
  const particleCount = 500;
  const angle = (Math.PI * 2) / particleCount
  for (let i = 0; i < particleCount; i++) {
    const color = `rgba(${Math.random() * 255},${Math.random() * 255},${Math.random() * 255},0.8)`; 
    particles.push(new particle(mouse.x,mouse.y,5,color,{
      x: Math.cos(angle * i) * Math.random() * 7,
      y: Math.sin(angle * i) * Math.random() * 7
    }));
    
  }
setTimeout(()=>{
  window.location.reload()
},7000)
  
})


function animate(){
  requestAnimationFrame(animate);
  c.fillStyle = 'rgba(0,0,0,0.01)';
  c.fillRect(0,0,canvas.width,canvas.height);

  particles.forEach((element,i) => {
   if(element.alpha > 0){
    element.update()
   }
   else{
    particles.splice(i,1);
   }
  })
  

}



animate()