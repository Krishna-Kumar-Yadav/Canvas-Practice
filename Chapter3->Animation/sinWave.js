import * as dat from "./node_modules/dat.gui/build/dat.gui.module.js";
let canvas = document.querySelector("canvas");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});

let c = canvas.getContext("2d");

const gui = new dat.GUI();

const wave = {
  y: canvas.height / 2,
  amplitude: 100,
  length: 0.01,
  frequency : 0.01
};
const waveFolder = gui.addFolder('wave')

waveFolder.add(wave, "y", 0, canvas.height);
waveFolder.add(wave, "amplitude", -300, 300);
waveFolder.add(wave, "length", -0.01, 0.01);
waveFolder.add(wave, "frequency", -0.01, 1);
waveFolder.open()

const strokeColor = {
  h : 200,
  s : 50,
  l : 50
}

const stroke = gui.addFolder('strokeColor');

stroke.add(strokeColor,"h",0,255)
stroke.add(strokeColor,"s",0,100)
stroke.add(strokeColor,"l",0,100)
stroke.open()

let increment = wave.frequency;

function init() {
  c.fillStyle = 'rgba(0,0,0,0.01)'
  c.fillRect(0,0,canvas.width,canvas.height)
  c.beginPath();
  c.moveTo(0, 300);

  for (let i = 0; i < canvas.width; i++) {
    c.lineTo(i, wave.y + Math.sin(i * wave.length+ increment) * wave.amplitude * Math.sin(increment));
  }
  c.strokeStyle = `hsl(${strokeColor.h},${strokeColor.s}%,${strokeColor.l}%)`;
  c.stroke();

  increment += wave.frequency
}


function animate(){
  requestAnimationFrame(animate);
  
  
  init();
  
}

animate()