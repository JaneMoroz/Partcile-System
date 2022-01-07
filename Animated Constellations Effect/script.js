// Get canvas
const canvas = document.getElementById("canvas1");
// Get canvas context—the thing onto which the drawing will be rendered
const ctx = canvas.getContext("2d");

// Array to store particles
let particlesArray = [];

// Set canvas to fullscreen
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Event for window recieze
window.addEventListener("resize", function () {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  mouse.radius = (canvas.height / 80) * (canvas.width / 80);
  init();
});

// Object to store mouse coordinates
const mouse = {
  x: undefined,
  y: undefined,
  radius: (canvas.height / 80) * (canvas.width / 80),
};

// Event for mouse over
canvas.addEventListener("mousemove", function (e) {
  mouse.x = e.x;
  mouse.y = e.y;
});

// Event for mouse out
window.addEventListener("mouseout", function () {
  mouse.x = undefined;
  mouse.y = undefined;
});

// Particle class
class Particle {
  constructor(x, y, directionX, directionY, size, color) {
    this.x = x;
    this.y = y;
    this.directionX = directionX;
    this.directionY = directionY;
    this.size = size;
    this.color = color;
  }

  // Draw particle with the new coordinates
  draw() {
    ctx.fillStyle = "#8C5523";
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
    ctx.fill();
  }

  // Update x and y coordinates to move the object
  update() {
    // Check if particle is still within the canvas
    if (this.x > canvas.width || this.x < 0) {
      this.directionX = -this.directionX;
    }
    if (this.y > canvas.height || this.y < 0) {
      this.directionY = -this.directionY;
    }

    // Check collision detection between mouse and particle
    let dx = mouse.x - this.x;
    let dy = mouse.y - this.y;

    let distance = Math.sqrt(dx * dx + dy * dy);

    if (distance < mouse.radius + this.size) {
      if (mouse.x < this.x && this.x < canvas.width - this.size * 10) {
        this.x += 10;
      }
      if (mouse.x > this.x && this.x > this.size * 10) {
        this.x = -10;
      }
      if (mouse.y < this.y && this.y < canvas.height - this.size * 10) {
        this.y += 10;
      }
      if (mouse.y > this.y && this.y < this.size * 10) {
        this.y -= 10;
      }
    }

    this.x += this.directionX;
    this.y += this.directionY;

    this.draw();
  }
}

// Create particles array
function init() {
  particlesArray = [];
  let numberOfParticles = (canvas.height * canvas.width) / 9000;
  for (let i = 0; i < numberOfParticles * 2; i++) {
    let size = Math.random() * 5 + 1;
    let x = Math.random() * (window.innerWidth - size * 2 - size * 2) + size * 2;
    let y = Math.random() * (window.innerHeight - size * 2 - size * 2) + size * 2;
    let directionX = Math.random() * 5 - 2.5;
    let directionY = Math.random() * 5 - 2.5;
    let color = "#8C5523";

    particlesArray.push(
      new Particle(x, y, directionX, directionY, size, color)
    );
  }
}

// To move object with the mouse cursor
function animate() {
  // Clear canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Update each particle
  for (let i = 0; i < particlesArray.length; i++) {
    particlesArray[i].update();
  }

  connect();

  // Continue to animate
  requestAnimationFrame(animate);
}

// Check if particles are close enough to draw line between them
function connect() {
  for (let a = 0; a < particlesArray.length; a++) {
    for (let b = a; b < particlesArray.length; b++) {
      const element = particlesArray[b];
      let distance =
        (particlesArray[a].x - particlesArray[b].x) *
          (particlesArray[a].x - particlesArray[b].x) +
        (particlesArray[a].y - particlesArray[b].y) *
          (particlesArray[a].y - particlesArray[b].y);
      if (distance < ((canvas.width / 7) * canvas.height) / 7) {
        opacityValue = 1 - distance / 20000;
        ctx.strokeStyle = "rgba(140, 85, 31," + opacityValue + ")";
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(particlesArray[a].x, particlesArray[a].y);
        ctx.lineTo(particlesArray[b].x, particlesArray[b].y);
        ctx.stroke();
      }
    }
  }
}

init();
animate();
