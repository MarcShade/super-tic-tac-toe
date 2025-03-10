function drawBoard() {
  // Assuming no air resistance
  stroke('black');
  strokeWeight(5);
  for (let i = 0; i < 4; i++) {
    line(300 * i + 50, 50, 300 * i + 50, 950);
    line(50, 300 * i + 50, 950, 300 * i + 50);
  }

  strokeWeight(3);
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
        for (let k = 0; k < 2; k++) {
          line(100 * k + 300 * i + 150, 70 + 300 * j, 100 * k + 300 * i + 150, 330 + 300 * j);
          line(70 + 300 * i, 100 * k + 150 + 300 * j, 330 + 300 * i, 100 * k + 150 + 300 * j);
        }
    }
  }
}

function mousePressed() {
  console.log(mouseX, mouseY)
}

function setup() {
  createCanvas(1000, 1000);
  background(220);
  drawBoard()
}

function draw() {
  
}
