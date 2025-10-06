const container = document.getElementById("container");
const cubes = document.querySelectorAll(".cube");

let selectedCube = null;
let offsetX = 0;
let offsetY = 0;

cubes.forEach(cube => {
  // Make cubes absolutely positioned relative to container
  cube.style.position = "absolute";

  // Store initial grid positions
  const rect = cube.getBoundingClientRect();
  const containerRect = container.getBoundingClientRect();
  cube.style.left = rect.left - containerRect.left + "px";
  cube.style.top = rect.top - containerRect.top + "px";

  // Mouse down event
  cube.addEventListener("mousedown", (e) => {
    selectedCube = cube;

    // Calculate offset between mouse and cube position
    const cubeRect = cube.getBoundingClientRect();
    offsetX = e.clientX - cubeRect.left;
    offsetY = e.clientY - cubeRect.top;

    cube.style.zIndex = 1000; // Bring dragged cube to front
  });
});

// Mouse move event on whole document
document.addEventListener("mousemove", (e) => {
  if (selectedCube) {
    const containerRect = container.getBoundingClientRect();
    let newLeft = e.clientX - containerRect.left - offsetX;
    let newTop = e.clientY - containerRect.top - offsetY;

    // Constrain within boundaries
    newLeft = Math.max(0, Math.min(newLeft, containerRect.width - selectedCube.offsetWidth));
    newTop = Math.max(0, Math.min(newTop, containerRect.height - selectedCube.offsetHeight));

    // Apply new position
    selectedCube.style.left = newLeft + "px";
    selectedCube.style.top = newTop + "px";
  }
});

// Mouse up event
document.addEventListener("mouseup", () => {
  if (selectedCube) {
    selectedCube.style.zIndex = 1; // Reset stacking order
    selectedCube = null;
  }
});
