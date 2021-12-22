// Get canvas
const canvas = document.getElementById("canvas1");
// Get canvas context—the thing onto which the drawing will be rendered
const ctx = canvas.getContext("2d");
// Array to store particles
const particlesArray = [];

// Hue saturation lightness
let hue = 0;

// Set canvas to fullscreen
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Event for window recieze
window.addEventListener("resize", function () {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});

// Object to store mouse coordinates
const mouse = {
  x: undefined,
  y: undefined,
};

// Event for mouse click
canvas.addEventListener("click", function (e) {
  mouse.x = e.x;
  mouse.y = e.y;
  // Create 10 particles
  for (let i = 0; i < 10; i++) {
    particlesArray.push(new Particle());
  }
});

// Event for mouse over
canvas.addEventListener("mousemove", function (e) {
  mouse.x = e.x;
  mouse.y = e.y;
  // Create 10 particles
  for (let i = 0; i < 2; i++) {
    particlesArray.push(new Particle());
  }
});

// Particle class
class Particle {
  constructor() {
    this.x = mouse.x;
    this.y = mouse.y;

    // this.x = Math.random() * canvas.width;
    // this.y = Math.random() * canvas.height;

    this.size = Math.random() * 15 + 1;
    this.speedX = Math.random() * 3 - 1.5;
    this.speedY = Math.random() * 3 - 1.5;
    this.color = "hsl(" + hue + ", 100%, 50%)";
  }

  // Update x and y coordinates to move the object
  update() {
    this.x += this.speedX;
    this.y += this.speedY;
    // Shrink particles
    if (this.size > 0.2) this.size -= 0.1;
  }

  // Draw particle with the new coordinates
  draw() {
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
  }
}

// Update and draw particles
function handleParticles() {
  for (let i = 0; i < particlesArray.length; i++) {
    particlesArray[i].update();
    particlesArray[i].draw();
    // Remove particles when their size becomes less that 0.3
    if (particlesArray[i].size <= 0.3) {
      particlesArray.splice(i, 1);
      i--;
    }
  }
}

// To move object with the mouse cursor
function animate() {
  // Clear canvas
  // ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Make particles fade away
  ctx.fillStyle = "rgba(0,0,0,0.01)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Update and draw particles every frame
  handleParticles();

  hue++;

  // Continue to animate
  requestAnimationFrame(animate);
}

animate();
