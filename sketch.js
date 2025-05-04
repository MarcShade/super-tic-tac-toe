// Create the object the entire game will be referring to.
const board = new Position();
// Scenes to keep track of where the program is
const SCENES = ["main", "game", "restart"];

let singleplayerButton; let multiplayerButton;

let scene = SCENES[0];

let ai;
let sceneChange;
let aiMove;

let mainMenu; let gameScreen;

// General function that checks if something is contained within an array
function includes(arr, values) {
  for (element of arr) {
    if (element.toString() == values.toString()) return true;
  }
  return false;
}

// Function to place circles in nested board
function drawCircle(i ,j) {
  fill("white");
  circle(105 + 95 * i + Math.floor(i / 3) * 15, 105 + 95 * j + Math.floor(j / 3) * 15, 60);
  fill(220);
  circle(105 + 95 * i + Math.floor(i / 3) * 15, 105 + 95 * j + Math.floor(j / 3) * 15, 40);
}

// Function to place x'es in nested board
function drawX(i, j) {
  strokeWeight(3);
  line(85 + 95 * i + Math.floor(i / 3) * 15, 85 + 95 * j + Math.floor(j / 3) * 15, 125 + 95 * i + Math.floor(i / 3) * 15, 125 + 95 * j + Math.floor(j / 3) * 15);
  line(125 + 95 * i + Math.floor(i / 3) * 15, 85 + 95 * j + Math.floor(j / 3) * 15, 85 + 95 * i + Math.floor(i / 3) * 15, 125 + 95 * j + Math.floor(j / 3) * 15);
}

// Function to place circles in the bigger board
function drawBiggerCircle(b) {
  fill("white");
  circle(200 + 300 * (b % 3), 200 + 300 * Math.floor(b/3), 250);
  fill(220);
  circle(200 + 300 * (b % 3), 200 + 300 * Math.floor(b/3), 200);
}

// Function to place x'es in the bigger board
function drawBiggerX(b) {
  circle(85 + 300 * (b % 3), 85 + 300 * Math.floor(b/3), 0);
  circle(315 + 300 * (b % 3), 315 + 300 * Math.floor(b/3), 0);
  strokeWeight(10);
  line(85 + 300 * (b % 3), 85 + 300 * Math.floor(b/3), 315 + 300 * (b % 3), 315 + 300 * Math.floor(b/3));
  line(85 + 300 * (b % 3), 315 + 300 * Math.floor(b/3), 315 + 300 * (b % 3), 85 + 300 * Math.floor(b/3));
  strokeWeight(3);
}

// Actually drawing the board
function drawBoard(board) {
  stroke('black');
  strokeWeight(5);

  // Draw the outline of the board
  for (let i = 0; i < 4; i++) {
    line(300 * i + 50, 50, 300 * i + 50, 950);
    line(50, 300 * i + 50, 950, 300 * i + 50);
  }

  // Draw the outline of the nested boards
  strokeWeight(3);
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      for (let k = 0; k < 2; k++) {
        line(100 * k + 300 * i + 150, 70 + 300 * j, 100 * k + 300 * i + 150, 330 + 300 * j);
        line(70 + 300 * i, 100 * k + 150 + 300 * j, 330 + 300 * i, 100 * k + 150 + 300 * j);
      }
    }
  }

  // Draw a game-piece where there has been placed a gamepiece
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

  // Highlight where the next legal move is
  if (board.legalBoard == 9 || board.isOver) return;
  fill(255, 255, 0, 50);
  rect(50 + 300 * (board.legalBoard % 3), 50 + 300 * Math.floor(board.legalBoard / 3), 300, 300);
}

let n = 0;
function mousePressed() {
  // Delay to prevent the user from selecting gamemode and making their move with the same click
  if (Date.now() - sceneChange < 100) return;
  if (scene != SCENES[1]) return;
  if (mouseX > 1000 || mouseY > 1000) return;

  // Math to determine where the user clicked
  let xPos = Math.floor(((mouseX * 1.2) - 50) / 100);
  let yPos = Math.floor(((mouseY * 1.2) - 50) / 100);
  let xPosDiv = Math.floor(xPos / 3);
  let yPosDiv = Math.floor(yPos / 3);
  let clickedBoard = xPosDiv + yPosDiv * 3;

  let coordinateX = clickedBoard;
  let coordinateY = (xPos % 3) + (yPos % 3) * 3;

  // Probably not necessary
  if (board.isOver) return;
  // Check if the move the user made is actually a legal move
  if (includes(board.legalMoves, [coordinateX, coordinateY])) {
    if (board.legalBoard != 9) {
      if (clickedBoard != board.legalBoard) return; 
    }
    board.move(coordinateX, coordinateY);
    background(220);
    // If ai is enabled (singleplayer gamemode), the ai will make its move after the user
    if (ai) {
      // If this isn't checked, the program will crash
      if (board.isOver) return;
      aiMove = board.getAiMove(board);
      board.move(...aiMove);
    }
    // Make the entire canvas smaller without messing with the magic numbers
    scale(1 / 1.2);
    drawBoard(board);
  }
}

function setup() {
  // Setting up interactibles and text
  singleplayerButton = select("#singleplayer-btn");
  multiplayerButton = select("#multiplayer-btn");
  restartButton = select("#restart-btn");
  mainMenu = select("#main-menu");
  gameScreen = select("#game-screen");
  endScreen = select("#end-container");
  gameResultText = document.getElementById("game-result-txt");

  singleplayerButton.mousePressed(() => {
    ai = true;
    scene = SCENES[1];
    hideUIElements([mainMenu]);
    showUIElements([gameScreen]);
    sceneChange = Date.now();
    board.isOver = false;

    let canvas = createCanvas(1000 / (1.2), 1000 / (1.2));
    canvas.parent("#canvas");
    background(220);
    scale(1 / 1.2);
    drawBoard(board);
  })

  multiplayerButton.mousePressed(() => {
    ai = false;
    scene = SCENES[1];
    hideUIElements([mainMenu]);
    showUIElements([gameScreen]);
    sceneChange = Date.now();
    board.isOver = false;

    let canvas = createCanvas(1000 / (1.2), 1000 / (1.2));
    canvas.parent("#canvas");
    background(220);
    scale(1 / 1.2);
    drawBoard(board);
  })

  restartButton.mousePressed(() => {
    scene = SCENES[0];
    hideUIElements([endScreen]);
    showUIElements([mainMenu]);
    sceneChange = Date.now();
    noCanvas();
  })
}

function draw() {
  // If the game is over, but the endscreen isn't loaded
  if (board.isOver && scene != SCENES[2]) {
    scene = SCENES[2];
    if (board.isDraw) {
      gameResultText.innerHTML = "Draw";
    } else {
      if(board.turn == 0) gameResultText.innerHTML = "X wins the game";
      else gameResultText.innerHTML = "O wins the game";
    }
    board.restart();
    showUIElements([endScreen]);
    hideUIElements([gameScreen]);
  }
}

// Useful functions
function hideUIElements(elements) {
  for (const element of elements) {
    element.addClass("hidden");
  }
}

function showUIElements(elements) {
  for (const element of elements) {
    element.removeClass("hidden");
  }
}