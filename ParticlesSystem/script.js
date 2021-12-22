// Get canvas
const canvas = document.getElementById("canvas1");
// Get canvas context—the thing onto which the drawing will be rendered
const ctx = canvas.getContext("2d");
// Array to store particles
const particlesArray = [];

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
});

// Event for mouse over
canvas.addEventListener("mousemove", function (e) {
  mouse.x = e.x;
  mouse.y = e.y;
});

// Particle class
class Particle {
  constructor() {
    // this.x = mouse.x;
    // this.y = mouse.y;

    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;

    this.size = Math.random() * 15 + 1;
    this.speedX = Math.random() * 3 - 1.5;
    this.speedY = Math.random() * 3 - 1.5;
  }

  // Update x and y coordinates to move the object
  update() {
    this.x += this.speedX;
    this.y += this.speedY;
  }

  // Draw particle with the new coordinates
  draw() {
    ctx.fillStyle = "white";
    ctx.strokeStyle = "violet";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
  }
}

// Create particles
function init() {
  for (let i = 0; i < 100; i++) {
    particlesArray.push(new Particle());
  }
}

init();

// Update and draw particles
function handleParticles() {
  for (let i = 0; i < particlesArray.length; i++) {
    particlesArray[i].update();
    particlesArray[i].draw();
  }
}

// To move object with the mouse cursor
function animate() {
  // Clear canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Update and draw particles every frame
  handleParticles();

  // Continue to animate
  requestAnimationFrame(animate);
}

animate();
