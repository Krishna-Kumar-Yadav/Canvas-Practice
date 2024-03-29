let canvas = document.querySelector('canvas')

canvas.height = window.innerHeight
canvas.width = window.innerWidth

let c = canvas.getContext('2d');


//line creating

/* c.beginPath();
c.moveTo(50,300);
c.lineTo(300,100);
c.strokeStyle = "green"
c.lineTo(400,300);
c.lineTo(-100,-250);
c.lineTo(-100,250);
c.strokeStyle = "red"
c.stroke();

//arc/circle creating


c.arc(300,300,30,0,Math.PI*1.5,false);
c.stroke();

//multi[le circle]


for (let i = 0; i < 100; i++) {
  c.arc(400+i*3,100+i*3,30,0,Math.PI*2,false);
  c.stroke();

  
}
 */

document.addEventListener("mousemove",(event)=>{
setInterval(()=>{
  c.clearRect(0,0,canvas.width,canvas.height)
},1000)

  
  for (let i = 0; i < 10; i++) {
    c.beginPath();
    c.arc(event.clientX,event.clientY,15,0,Math.PI*2,false)
    c.strokeStyle = "blue"
    c.closePath()
    c.stroke();
    
  }
  for (let i = 0; i < 10; i++) {
    c.beginPath();
    c.arc(event.clientX+25,event.clientY+25,15,0,Math.PI*2,false)
    c.strokeStyle = "red"
    c.closePath()
    c.stroke();
    
  }
})