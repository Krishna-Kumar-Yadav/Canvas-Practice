let canvas  = document.querySelector('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

window.addEventListener("resize",function(){
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

})

let c = canvas.getContext('2d');

function rectangle(x,y,dx,dy,width,height,color){
  this.x = x;
  this.y = y;
  this.dx = dx;
  this.dy = dy;
  this.width = width;
  this.height = height;
  this.color = color


  this.draw = ()=>{
    c.beginPath();
    c.fillStyle = this.color
    c.fillRect(this.x,this.y,this.width,this.height);
    c.stroke();
  }

  this.update = ()=>{
    rectangles.forEach(box=>{
      if (boxCollision(this,box) === true){
        this.dx = -this.dx;
        box.dy = -box.dy;
      }
    })


    if(this.x + this.width > innerWidth || this.x < 0){
      this.dx = - this.dx;
    }
    if(this.y + this.height > innerHeight || this.y < 0){
      this.dy = - this.dy;
    }

    this.x += this.dx;
    this.y += this.dy
    this.draw();
  }
}

let rectangles = []

function boxCollision(boxA,boxB){
  if(boxA.x + boxA.width >= boxB.x && 
    boxA.x <= boxB.x + boxB.width && 
    boxA.y+ boxA.height >= boxB.y && 
    boxA.y <= boxB.y + boxB.height){
      return true;
    }
}

function init(){
  for (let i = 0; i < 2; i++) {
    let x =Math.random()* innerWidth;
    let y = Math.random() * innerHeight;
    let dx = Math.random() * 3+1;
    let dy = Math.random() * 3+1;
    let width = Math.random() * 30+10;
    let height = Math.random() * 30+10;
    let color = `rgba(${Math.random() * 255},${Math.random() * 255},${Math.random() * 255},0.8)`

    rectangles.push(new rectangle(300+i*i*i,200,dx,dy,40,40,color));
    
  }
}

document.addEventListener("mousemove",event=>{
  //console.log(event.clientX,event.clientY);
})



function animate(){
  requestAnimationFrame(animate);
  c.clearRect(0,0,innerWidth,innerHeight)
  rectangles.forEach(rectang => {
    rectang.update();
  })
}

init();
animate()