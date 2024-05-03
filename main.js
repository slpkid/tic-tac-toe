function Gameboard() {
    columns = 3
    rows = 3
    board = []
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
        console.log(`Player ${currentPlayer}'s turn...`)
        return
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
    };

    const fillBoard = () => {
        playRound(0,0);
        playRound(0,1);
        playRound(0,2);
        playRound(1,0);
        playRound(1,1);
        playRound(1,2);
        playRound(2,0);
        playRound(2,1);
        playRound(2,2);
    }

    const getBoard = () => {
        return board;
    }

    const clearBoard = () => {
        Gameboard();
        console.log("Board cleared. Starting a new game...")
        return;
    }

    console.log(board)
    console.log(`Player ${currentPlayer}'s turn...`)

    return {playRound, getBoard, clearBoard, playableSpaces, fillBoard}
}

const game = Gameboard();