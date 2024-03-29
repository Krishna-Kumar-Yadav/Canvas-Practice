let canvas = document.querySelector('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

window.addEventListener("resize",function(){
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
})

let c = canvas.getContext('2d');

function ball(x,y,dx,dy,radius,color){
  this.x = x;
  this.y = y;
  this.dx = dx;
  this.dy = dy;
  this.radius =  radius;
  this.color = color;

  this.draw = function(){
    c.beginPath()
    c.arc(x,y,radius,0,Math.PI * 2,false);
    c.fillStyle = this.color;
    c.fill();
    c.strokeStyle = "blue";
    c.stroke();
  }

  this.update = function(){
    

    this.draw();
  }

}

function getDistance(x1,x2,y1,y2){
  let xDistance = x2-x1;
  let yDistance = y2-y1;
  let result = Math.sqrt(Math.pow(xDistance,2)+Math.pow(yDistance,2));
  return result;
}



let circle1 = new ball(500,300,0,0,50,"black");
let circle2;
document.addEventListener("mousemove",(event)=>{
  circle2 = new ball(event.clientX,event.clientY,0,0,20,"red");
  let distance = getDistance(circle1.x,event.clientX,circle1.y,event.clientY);;
  if(distance - (circle1.radius + circle2.radius) < 0){
    circle1.color = circle2.color;  
    
  }
  else{
    circle1.color = "black";
  }
  
})

function animate(){
  requestAnimationFrame(animate);
  c.clearRect(0,0,innerWidth,innerHeight)
  circle1.update()
  circle2.update()
}

animate();

