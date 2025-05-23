// Used cleverly in the function checkWin
const WINNING_CONDITIONS = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],

    [0, 3, 6],
    [1, 4 ,7],
    [2, 5, 8],

    [0, 4, 8],
    [2, 4, 6]
];

class Position {
    constructor() {
        this.mainBoard = [0, 0, 0, 0, 0, 0, 0, 0, 0];
        this.subBoards = [
            [0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0]
        ];
        this.turn = 1;

        this.isDraw = false;
        // Variable for keeping track of what subboard is playable. If 9, they're all playable
        this.legalBoard = 9;
        this.isOver = false;
        this.legalMoves = [];
        // Generate the legal moves for the current position
        for (let i = 0; i < 9; i++) {
            for (let j = 0; j < 9; j++) {
                this.legalMoves.push([i, j]);
            }
        }
    }

    move(x, y) {
        // Make move
        this.subBoards[x][y] = this.turn+1;
        
        if (this.checkWin(this.subBoards[x])) {
            this.mainBoard[x] = this.turn + 1;
            this.checkMainBoard();
        }

        if (this.mainBoard[y] == 0) this.legalBoard = y;
        else this.legalBoard = 9;
        // Stupid conversion from boolean to integer.
        this.turn = +(!this.turn);
        
        // Generate legal moves for the new position
        this.legalMoves = [];
        if (this.legalBoard != 9) {
            for (let i = 0; i < 9; i++) {
                if (this.subBoards[this.legalBoard][i] == 0) this.legalMoves.push([this.legalBoard, i]);
            }
        } else {
            for (let j = 0; j < 9; j++) {
                if (this.mainBoard[j] != 0) continue;
                for (let i = 0; i < 9; i++) {
                    if (this.subBoards[j][i] == 0) this.legalMoves.push([j, i]);
                }
            }
        }
        // If no legal moves are found, but noone won, position must be a draw.
        if (this.legalMoves.length == 0) {
            this.isDraw = true;
            this.isOver = true;
        }
    }

    checkWin(board) {
        // Iterate over winning conditions and check them on the current position
        for (const condition of WINNING_CONDITIONS) {
            if (board[condition[0]] == 0) {
                continue;
            }
            if (board[condition[0]] == board[condition[1]] && board[condition[1]] == board[condition[2]]) {
                return true;
            }
        }
        return false;
    }

    checkMainBoard() {
        if (this.checkWin(this.mainBoard)) {
            this.isOver = true;
            this.legalBoard = 9;
        }
    }

    getAiMove() {
        for (const move of this.legalMoves) {
            for (let i = 1; i <= 2; i++) {
                // Check if someone can win on a certain square. If yes, make that move
                this.subBoards[move[0]][move[1]] = i;
                if (this.checkWin(this.subBoards[move[0]])) return move;    
                this.subBoards[move[0]][move[1]] = 0;
            }
        }
        // Picks a random legal move to play
        return this.legalMoves[Math.floor(Math.random() * this.legalMoves.length)];
    }

    restart() {
        // Resets the object to its inital values
        this.mainBoard = [0, 0, 0, 0, 0, 0, 0, 0, 0];
        this.subBoards = [
            [0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0]
        ];
        this.turn = 1;

        this.legalBoard = 9;
        this.isOver = false;
        this.legalMoves = [];
        for (let i = 0; i < 9; i++) {
            for (let j = 0; j < 9; j++) {
                this.legalMoves.push([i, j]);
            }
        }
    } 
};