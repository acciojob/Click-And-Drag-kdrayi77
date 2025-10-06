const container = document.getElementById("container");
const cubes = document.querySelectorAll(".cube");

let selectedCube = null;
let offsetX = 0;
let offsetY = 0;

cubes.forEach(cube => {
  // Switch to absolute positioning for dragging
  cube.style.position = "absolute";

  // Store initial grid positions
  const rect = cube.getBoundingClientRect();
  const containerRect = container.getBoundingClientRect();
  cube.style.left = rect.left - containerRect.left + "px";
  cube.style.top = rect.top - containerRect.top + "px";

  // Enable dragging
  cube.addEventListener("mousedown", (e) => {
    selectedCube = cube;

    const cubeRect = cube.getBoundingClientRect();
    offsetX = e.clientX - cubeRect.left;
    offsetY = e.clientY - cubeRect.top;

    cube.style.zIndex = 1000;
  });
});

// Handle mouse move
document.addEventListener("mousemove", (e) => {
  if (selectedCube) {
    const containerRect = container.getBoundingClientRect();
    let newLeft = e.clientX - containerRect.left - offsetX;
    let newTop = e.clientY - containerRect.top - offsetY;

    // Constrain inside container
    newLeft = Math.max(0, Math.min(newLeft, containerRect.width - selectedCube.offsetWidth));
    newTop = Math.max(0, Math.min(newTop, containerRect.height - selectedCube.offsetHeight));

    selectedCube.style.left = newLeft + "px";
    selectedCube.style.top = newTop + "px";
  }
});

// Drop on mouseup
document.addEventListener("mouseup", () => {
  if (selectedCube) {
    selectedCube.style.zIndex = 1;
    selectedCube = null;
  }
});
