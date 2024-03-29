let canvas = document.querySelector('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

addEventListener('resize',()=>{
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
})

let c = canvas.getContext('2d');

class particle{
  constructor(x,y,radius,color){
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;

  }

  draw(){
    c.beginPath();
    c.arc(this.x,this.y,this.radius,0,Math.PI * 2,false);
    c.fillStyle = this.color;
    c.fill();
    c.closePath();
  }

  update(){

    this.draw();
  }
}


function animate(){
  c.fillStyle = 'rgba(0,0,0,0.1)';
  c.fillRect(0,0,canvas.width,canvas.height);

  
  requestAnimationFrame(animate);
}

animate();