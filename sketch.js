const board = new Position();

function drawCircle(i ,j) {
  fill("white");
  circle(105 + 95 * i + Math.floor(i / 3) * 15, 105 + 95 * j + Math.floor(j / 3) * 15, 60);
  fill(220);
  circle(105 + 95 * i + Math.floor(i / 3) * 15, 105 + 95 * j + Math.floor(j / 3) * 15, 40);
}

function drawX(i, j) {
  strokeWeight(3);
  line(85 + 95 * i + Math.floor(i / 3) * 15, 85 + 95 * j + Math.floor(j / 3) * 15, 125 + 95 * i + Math.floor(i / 3) * 15, 125 + 95 * j + Math.floor(j / 3) * 15);
  line(125 + 95 * i + Math.floor(i / 3) * 15, 85 + 95 * j + Math.floor(j / 3) * 15, 85 + 95 * i + Math.floor(i / 3) * 15, 125 + 95 * j + Math.floor(j / 3) * 15);
}

function drawBiggerCircle(b) {
  fill("white");
  circle(200 + 300 * (b % 3), 200 + 300 * Math.floor(b/3), 250);
  fill(220);
  circle(200 + 300 * (b % 3), 200 + 300 * Math.floor(b/3), 200);
}

function drawBiggerX(b) {
  circle(85 + 300 * (b % 3), 85 + 300 * Math.floor(b/3), 0);
  circle(315 + 300 * (b % 3), 315 + 300 * Math.floor(b/3), 0);
  strokeWeight(10)
  line(85 + 300 * (b % 3), 85 + 300 * Math.floor(b/3), 315 + 300 * (b % 3), 315 + 300 * Math.floor(b/3));
  line(85 + 300 * (b % 3), 315 + 300 * Math.floor(b/3), 315 + 300 * (b % 3), 85 + 300 * Math.floor(b/3));
  strokeWeight(3);
}

function drawBoard(board) {
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

  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      if (board.subBoards[i][j] != 0) {
        if (board.subBoards[i][j] == 1) drawCircle(3 * (i % 3) + (j % 3), 3 * Math.floor(i/3) + Math.floor(j/3));
        else drawX(3 * (i % 3) + (j % 3), 3 * Math.floor(i/3) + Math.floor(j/3));
      }
    }
    if (board.mainBoard[i] != 0) {
      if (board.mainBoard[i] == 1) drawBiggerCircle(i);
      else drawBiggerX(i);
    }
  }

  if (board.legalBoard == 9) return;
  let lBoard = board.legalBoard;
  fill(255, 255, 0, 50);
  rect(50 + 300 * (lBoard % 3), 50 + 300 * Math.floor(lBoard / 3), 300, 300);
}

let n = 0;
function mousePressed() {
  if (mouseX > 1000 || mouseY > 1000) return;
  let xPos = Math.floor((mouseX - 50) / 100);
  let yPos = Math.floor((mouseY - 50) / 100);
  let xPosDiv = Math.floor(xPos / 3);
  let yPosDiv = Math.floor(yPos / 3);
  let clickedBoard = xPosDiv + yPosDiv * 3;

  let coordinateX = clickedBoard;
  let coordinateY = (xPos % 3) + (yPos % 3) * 3;

  if (board.isOver) return;

  if (board.subBoards[coordinateX][coordinateY] == 0) {
    if (board.legalBoard != 9) {
      if (clickedBoard != board.legalBoard) return; 
    }
    board.move(coordinateX, coordinateY);
    background(220);
    drawBoard(board);
  }
}

function setup() {
  createCanvas(1000, 1000);
  background(220);
  drawBoard(board);
}

function draw() {
  
}