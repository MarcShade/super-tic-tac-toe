function getAiMove(board) {
    let bestScore = -1000;
    let bestMove = 0;
    let score;
    
    for (const move of board.legalMoves) {
        board.move(...move);
        score = minimax(false);
        console.log("Evaluated " + move + " at " + score);
        board.unmakeMove();
        if (score > bestScore) {
            bestScore = score;
            bestMove = move;
        }
    }
    console.log(bestMove);
    return bestMove;
}

function minimax(isMaximizing) {
    return -999;
}