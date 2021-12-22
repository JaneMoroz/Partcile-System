// Get canvas
const canvas = document.getElementById("canvas1");
// Get canvas context—the thing onto which the drawing will be rendered
const ctx = canvas.getContext("2d");

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
  // drawCircle();
});

// Event for mouse over
canvas.addEventListener("mousemove", function (e) {
  mouse.x = e.x;
  mouse.y = e.y;
  // drawCircle();
});

// Draw circle (white circle with green border)
function drawCircle() {
  ctx.fillStyle = "white";
  ctx.strokeStyle = "green";
  ctx.lineWidth = 5;
  ctx.beginPath();
  ctx.arc(mouse.x, mouse.y, 50, 0, Math.PI * 2);
  ctx.fill();
  ctx.stroke();
}

// drawCircle();



// To move object with the mouse cursor
function animate() {
  // Clear canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Draw circle
  drawCircle();

  // Continue to animate
  requestAnimationFrame(animate);
}

animate();
