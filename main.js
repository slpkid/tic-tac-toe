function Gameboard() {
    columns = 3
    rows = 3
    board = []
    playable = true
    let winner
    let currentPlayer = "X"

    for (let i = 0; i < rows; i++) {
        board[i] = [];
        for (let j = 0; j < columns; j++) {
            board[i].push("-");
        }
    }

    function changePlayer() {
        if (currentPlayer === "X") {
            currentPlayer = "O"
            return
        }
        currentPlayer = "X"
        return
    }

    const playRound = (row,col) => {
        if (playable === false) {
            console.log(`Player ${winner} won the game. Run game.clearBoard() to play again...`)
            return
        }
        if (row > 2 || col > 2) {
            console.log("Invalid move!")
            return
        }
        const targetedCell = board[row][col];
        if (targetedCell === "O" || targetedCell === "X" ) {
            console.log("Choose a different space!")
            return
        }
        board[row][col] = currentPlayer;
        changePlayer();
        console.log(board);
        hasWon();
        if (playable === true) {
            console.log(`Player ${currentPlayer}'s turn...`)
        } else {
        return
        }
    }

    const playableSpaces = () => {
        let playableSpaces = [];
        for (let i = 0; i < 3; i++) {
            board[i].forEach((element) => {
            if (element === "-") {
                playableSpaces.push(element);
            }});
        };
        if (playableSpaces.length === 0) {
            console.log("Draw! Please start a new game.")
        }
        return;
    };

    const getState = (input) => {
        if (input === "XXX") {
            winner = "X"
            playable = false;
            console.log("Player X won!")
            return
        } else if (input === "OOO") {
            winner = "O"
            playable = false;
            console.log("Player O won!")
            return
        }
        return
    }

    const hasWon = () => {
        //rows
        for (let i = 0; i < rows; i++) {
            let winner = "";
            for (let j = 0; j < columns; j++) {
                winner += `${board[i][j]}`;
            }
            getState(winner);
        }
        //columns
        for (let j = 0; j < columns; j++) {
            let winner = "";
            for (let i = 0; i < rows; i++) {
                winner += `${board[i][j]}`;
            }
            getState(winner);
        }
        //diagonal hell
        (function () {
            let winner = `${board[0][0]}${board[1][1]}${board[2][2]}`
            getState(winner);
            winner = `${board[0][2]}${board[1][1]}${board[2][0]}`
            getState(winner);
        })()

    }

    const fillBoard = () => {
        playRound(0,0);
        playRound(1,2);
        playRound(0,1);
        playRound(2,2);
        playRound(0,2);
        playRound(1,1);
        playRound(1,0);
        playRound(2,0);
        playRound(2,1);
    }

    const getBoard = () => {
        return board;
    }

    const clearBoard = () => {
        console.log("Board cleared. Starting a new game...");
        playable = true;
        winner = "";
        Gameboard();
        return;
    }

    console.log(board)
    console.log(`Player ${currentPlayer}'s turn...`)

    return {playRound, getBoard, clearBoard, playableSpaces, fillBoard, getState, hasWon}
}

const game = Gameboard();