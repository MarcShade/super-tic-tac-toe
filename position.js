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

        this.legalBoard = 9;
        this.isOver = false;
        this.legalMoves = []
        for (let i = 0; i < 9; i++) {
            for (let j = 0; j < 9; j++) {
                this.legalMoves.push([i, j]);
            }
        }

        this.prevMainBoard = [];
        this.prevSubBoards = [];
        this.prevLegalMoves = [];
        this.prevLegalBoard = 0;
        this.prevIsOver = false;
    }

    move(x, y) {
        this.prevMainBoard = this.mainBoard;
        this.prevSubBoards = this.subBoards;
        this.prevLegalMoves = this.legalMoves;
        this.prevLegalBoard = this.legalBoard;
        this.prevIsOver = this.isOver;

        this.subBoards[x][y] = this.turn+1;
        
        if (this.checkWin(this.subBoards[x])) {
            this.mainBoard[x] = this.turn + 1;
            this.checkMainBoard();
        }
        if (this.mainBoard[y] == 0) this.legalBoard = y;
        else this.legalBoard = 9;
        // Stupid fucking conversion from boolean to integer.
        this.turn = +(!this.turn);
        
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
    }

    unmakeMove() {
        this.mainBoard = this.prevMainBoard;
        this.subBoards = this.prevSubBoards;
        this.legalMoves = this.prevLegalMoves;
        this.legalBoard = this.prevLegalBoard;
        this.turn = +(!this.turn);
        this.isOver = this.prevIsOver;
    }

    checkWin(board) {
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
            console.log(this.turn + " won");
        }
    }
};