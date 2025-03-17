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
    }

    move(i, j) {
        this.subBoards[i][j] = this.turn+1;
        if (this.mainBoard[j] == 0) this.legalBoard = j;
        else this.legalBoard = 9;
        
        if (this.checkWin(this.subBoards[i])) {
            this.mainBoard[i] = this.turn + 1;
            this.checkMainBoard();
        }
        // Stupid fucking conversion from boolean to integer.
        this.turn = +(!this.turn);
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
        }
    }
};