// This file is not to be modified. Please ignore this.
// We will understand all of this later in the course.
// DO NOT MODIFY THIS FILE

const express = require('express');
const path = require('path');

const app = express();

app.use(express.static(__dirname))

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname + '/main.html'));
});
const container = document.querySelector('.container');
const items = document.querySelectorAll('.item');
let selectedItem = null;
let offsetX = 0;
let offsetY = 0;

// Initial grid placement
items.forEach((item, index) => {
  const col = index % 3;
  const row = Math.floor(index / 3);
  item.style.left = `${col * 110 + 10}px`;
  item.style.top = `${row * 110 + 10}px`;

  item.addEventListener('mousedown', (e) => {
    selectedItem = item;
    offsetX = e.clientX - item.offsetLeft;
    offsetY = e.clientY - item.offsetTop;
  });
});

document.addEventListener('mousemove', (e) => {
  if (!selectedItem) return;

  let x = e.clientX - offsetX;
  let y = e.clientY - offsetY;

  const containerRect = container.getBoundingClientRect();
  const itemWidth = selectedItem.offsetWidth;
  const itemHeight = selectedItem.offsetHeight;

  // Boundary constraints
  x = Math.max(containerRect.left + 10, Math.min(x, containerRect.right - itemWidth - 10));
  y = Math.max(containerRect.top + 10, Math.min(y, containerRect.bottom - itemHeight - 10));

  selectedItem.style.left = `${x - containerRect.left}px`;
  selectedItem.style.top = `${y - containerRect.top}px`;
});

document.addEventListener('mouseup', () => {
  selectedItem = null;
});

app.post('/add', (req, res) => {
  const {a,b} = req.body;
  res.status(200).send(a+b);
  // res.sendFile(path.join(__dirname + '/main.html'));
});
module.exports = app;