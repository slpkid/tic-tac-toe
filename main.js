function Gameboard() {
    columns = 3;
    rows = 3;
    board = [];
    playable = true;
    let winner;
    let gameResult = "inProgress";
    let currentPlayer = "X";
    playerTurnMessage = `Player ${currentPlayer}'s turn...`;

    for (let i = 0; i < rows; i++) {
        board[i] = [];
        for (let j = 0; j < columns; j++) {
            board[i].push("-");
        }
    }

    function changePlayer() {
        if (currentPlayer === "X") {
            currentPlayer = "O";
            playerTurnMessage = `Player ${currentPlayer}'s turn...`;
            return;
        };
        currentPlayer = "X";
        playerTurnMessage = `Player ${currentPlayer}'s turn...`;
        return
    }

    const getPlayerTurnMessage = () => {
        return playerTurnMessage;
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
        getState();
        if (playable === true) {
            console.log(`Player ${currentPlayer}'s turn...`)
        } else {
        return
        }
    }

    //logic for draws
    const draw = () => {
        let draw = [];
        for (let i = 0; i < 3; i++) {
            board[i].forEach((element) => {
            if (element === "-") {
                draw.push(element);
            }});
        };
        if (draw.length === 0) {
            console.log("Draw! Please start a new game.")
            gameResult = "draw";
            playable = false;
            return
        }
        return;
    };

    const hasWon = (input) => {
        //compares an input string against the two possible win states.
        if (input === "XXX") {
            winner = "X"
            playable = false;
            gameResult = "won"
            console.log("Player X won!")
            return
        } else if (input === "OOO") {
            winner = "O"
            playable = false;
            gameResult = "won"
            console.log("Player O won!")
            return
        }
        return
    }

    
    
    const getState = () => {
        //checks rows, columns, and diagonals for any wins.
        //if no win is detected, see if there is space on the board.
        //if not, then the game is a draw.
        //rows
        for (let i = 0; i < rows; i++) {
            let winner = "";
            for (let j = 0; j < columns; j++) {
                winner += `${board[i][j]}`;
            }
            hasWon(winner);
        }
        //columns
        for (let j = 0; j < columns; j++) {
            let winner = "";
            for (let i = 0; i < rows; i++) {
                winner += `${board[i][j]}`;
            }
            hasWon(winner);
        }
        //diagonal hell
        (function () {
            let winner = `${board[0][0]}${board[1][1]}${board[2][2]}`
            hasWon(winner);
            winner = `${board[0][2]}${board[1][1]}${board[2][0]}`
            hasWon(winner);
        })()
        //draw
        if (playable === true) {draw()}
    }

    // populate the board with random entries
    const fillBoard = () => {
        while (playable == true) {
            function random () {return Math.floor(Math.random() * 3)};
            x = random();
            y = random();
            playRound(x,y);
        }
        return
    }

    const getBoard = () => {
        return board;inProgress
    }

    //
    const clearBoard = () => {
        console.log("Board cleared. Starting a new game...");
        playable = true;
        winner = "";
        gameResult = "inProgress";
        Gameboard();
        return;
    }

    const result = () => {
        if (playable == false) {
            if (gameResult === "won") {
                return `Player ${winner} won! Click new game to play again`;
            }
            if (gameResult === "draw") {
                return `Draw! Click new game to play again.`;
            }
        }
        return gameResult;
    }

    console.log(board);
    console.log(`Player ${currentPlayer}'s turn...`);

    return {playRound, getBoard, clearBoard, fillBoard, getPlayerTurnMessage,result}
}

const game = Gameboard();

(function ScreenController() {
    const cells = document.getElementsByClassName("cell");
    const messageLog = document.getElementById("message-log");
    const newGameButton = document.getElementById("new-game-button");
    
    (function assignGrid() {
        let w = 0;
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                cells[w].dataset.row = i
                cells[w].dataset.column = j
                w++
            }
        }
    })();

    function StartUp() {for (cell of cells) {
        cell.addEventListener("click", (e) => {
            const row = e.srcElement.dataset.row
            const column = e.srcElement.dataset.column
            game.playRound(row,column);
            render();
        })
        newGameButton.addEventListener("click", (e) => {
            game.clearBoard();
            render();
        })
    }

    };
    
    function render(){
        for (cell of cells) {
            cell.textContent = "";
        }
        messageLog.textContent = "";

        let w = 0;
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                cells[w].textContent = board[i][j];
                w++
            }
        }

        messageLog.textContent = game.getPlayerTurnMessage();
        if (!(game.result() === "inProgress")) {
            messageLog.textContent = game.result();
        } 
    }
    StartUp();
})();    