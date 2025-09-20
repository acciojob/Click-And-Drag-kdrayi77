const container = document.querySelector('.container');
const cubes = document.querySelectorAll('.cube');

let selectedCube = null;
let offsetX = 0;
let offsetY = 0;

cubes.forEach(cube => {
  // Initial positioning based on grid
  const index = Array.from(cubes).indexOf(cube);
  const col = index % 4;
  const row = Math.floor(index / 4);
  cube.style.left = `${col * 110}px`;
  cube.style.top = `${row * 110}px`;

  cube.addEventListener('mousedown', (e) => {
    selectedCube = cube;
    offsetX = e.clientX - cube.offsetLeft;
    offsetY = e.clientY - cube.offsetTop;
    cube.style.cursor = 'grabbing';
  });
});

document.addEventListener('mousemove', (e) => {
  if (!selectedCube) return;

  let x = e.clientX - offsetX;
  let y = e.clientY - offsetY;

  // Boundary constraints
  const maxX = container.clientWidth - selectedCube.offsetWidth;
  const maxY = container.clientHeight - selectedCube.offsetHeight;

  x = Math.max(0, Math.min(x, maxX));
  y = Math.max(0, Math.min(y, maxY));

  selectedCube.style.left = `${x}px`;
  selectedCube.style.top = `${y}px`;
});

document.addEventListener('mouseup', () => {
  if (selectedCube) {
    selectedCube.style.cursor = 'grab';
    selectedCube = null;
  }
});
