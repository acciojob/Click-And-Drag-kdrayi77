const container = document.getElementById("container");
const cubes = document.querySelectorAll(".cube");

let selectedCube = null;
let offsetX = 0;
let offsetY = 0;

// Manually place cubes in grid initially
const cols = 3;
const gap = 10;
const cubeSize = 80;
cubes.forEach((cube, index) => {
  let row = Math.floor(index / cols);
  let col = index % cols;
  cube.style.left = col * (cubeSize + gap) + "px";
  cube.style.top = row * (cubeSize + gap) + "px";

  // Enable dragging
  cube.addEventListener("mousedown", (e) => {
    selectedCube = cube;
    const cubeRect = cube.getBoundingClientRect();
    offsetX = e.clientX - cubeRect.left;
    offsetY = e.clientY - cubeRect.top;
    cube.style.zIndex = 1000;
  });
});

// Dragging
document.addEventListener("mousemove", (e) => {
  if (selectedCube) {
    const containerRect = container.getBoundingClientRect();
    let newLeft = e.clientX - containerRect.left - offsetX;
    let newTop = e.clientY - containerRect.top - offsetY;

    // boundaries
    newLeft = Math.max(0, Math.min(newLeft, containerRect.width - selectedCube.offsetWidth));
    newTop = Math.max(0, Math.min(newTop, containerRect.height - selectedCube.offsetHeight));

    selectedCube.style.left = newLeft + "px";
    selectedCube.style.top = newTop + "px";
  }
});

// Drop
document.addEventListener("mouseup", () => {
  if (selectedCube) {
    selectedCube.style.zIndex = 1;
    selectedCube = null;
  }
});
