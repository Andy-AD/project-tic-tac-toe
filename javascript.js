(function () {

    const Gameboard = (() => {

        const gameboard = createElement({ type: 'div', id: 'gameboard' });
        let currentMarker = 'X';
        let isCreated = false;

        function updateBoard(index) {
            let updateResult = Game.updateArray(index, currentMarker);
            if (updateResult) {
                updateBox(index, currentMarker);
                (currentMarker === 'X') ? currentMarker = 'O' : currentMarker = 'X';
                return true;
            }
            return false;
        }

        function getMarker() {
            return currentMarker;
        }

        function createBoard() {
            if (isCreated) {
                resetBoard();
                return 'already created'
            } else {
                for (let i = 0; i <= 8; i++) {
                    let box = createElement({ type: 'div', textContent: '', id: `box-${i}` });
                    gameboard.appendChild(box);
                }
                isCreated = true;

                return gameboard;
            }
        };

        function updateBox(index, marker) {
            let box = document.getElementById(`box-${index}`);
            box.textContent = marker;
        }

        function resetBoard() {
            currentMarker = 'X';
            for (let i = 0; i <= 8; i++) {
                let box = document.getElementById(`box-${i}`);
                box.textContent = '';
                box.classList.remove('highlight');
            }
        }

        return {
            createBoard, updateBoard, resetBoard, getMarker
        }

    })();

    const Game = (() => {
        let gameArray = ['', '', '', '', '', '', '', '', ''];

        let gameMode = '';
        let difficultyLevel = '';

        function updateArray(index, marker) {
            if (gameArray[index] === '') {
                gameArray[index] = marker;
                return true;
            }
            return false;
        }

        function getGameArray() {
            let array = [...gameArray]
            return array;
        }

        function checkForWinner(gameboardArray) {

            let gameboard = gameboardArray || getGameArray();

            for (let i = 0; i <= 7; i += 3) {
                let sum = gameboard[i] + gameboard[i + 1] + gameboard[i + 2];
                if (sum === 'XXX' || sum === 'OOO') {
                    return ({ coordinates: [i, i + 1, i + 2], status: `The winner is ${sum[0]}!`, result: sum[0] })
                }
            }
            for (let i = 0; i <= 3; i++) {
                let sum = gameboard[i] + gameboard[i + 3] + gameboard[i + 6];
                if (sum === 'XXX' || sum === 'OOO') {
                    return ({ coordinates: [i, i + 3, i + 6], status: `The winner is ${sum[0]}!`, result: sum[0] })
                }
            }
            sum = gameboard[0] + gameboard[4] + gameboard[8];
            if (sum === 'XXX' || sum === 'OOO') {
                return ({ coordinates: [0, 4, 8], status: `The winner is ${sum[0]}!`, result: sum[0] })
            }
            sum = gameboard[2] + gameboard[4] + gameboard[6];
            if (sum === 'XXX' || sum === 'OOO') {
                return ({ coordinates: [2, 4, 6], status: `The winner is ${sum[0]}!`, result: sum[0] })
            }
            if (!gameboard.includes('')) {
                return ({ status: "It's a tie!", result: 0 })
            }
            return false;
        }

        function newGame(mode, difficulty) {
            gameArray = ['', '', '', '', '', '', '', '', ''];
            if (mode === 'Player VS Player') {
                gameMode = mode;
            } else {
                gameMode = mode;
                difficultyLevel = difficulty;
            }
        }

        function restartGame() {
            gameArray = ['', '', '', '', '', '', '', '', ''];
        }

        function calculateMove() {
            if (difficultyLevel === 'Easy') {
                return easyMode();
            } else if (difficultyLevel === 'Normal') {
                return normalMode();
            } else if (difficultyLevel === 'Hard') {
                return hardMode()
            }
        }

        function easyMode() {
            let successful = false;
            let move;
            while (!successful) {
                move = Math.floor(Math.random() * 9);
                if (gameArray[move] === '') {
                    successful = true;
                }
            }
            return move;
        }

        function normalMode() {
            console.log(gameArray)
            if (gameArray[4] === '') {
                return 4;
            }
            sum = gameArray[0] + gameArray[4] + gameArray[8];
            if (sum === 'XX') {
                if (gameArray[0] === '') {
                    return 0;
                } else {
                    return 8;
                }
            }
            sum = gameArray[2] + gameArray[4] + gameArray[6];
            if (sum === 'XX') {
                if (gameArray[2] === '') {
                    return 2;
                } else {
                    return 6;
                }
            }
            for (let i = 0; i <= 7; i += 3) {
                let sum = gameArray[i] + gameArray[i + 1] + gameArray[i + 2];
                if (sum === 'XX') {
                    if (gameArray[i] === '') {
                        return i;
                    } else if (gameArray[i + 1] === '') {
                        return i + 1;
                    } else {
                        return i + 2;
                    }
                }
            }
            for (let i = 0; i <= 3; i++) {
                let sum = gameArray[i] + gameArray[i + 3] + gameArray[i + 6];
                if (sum === 'XX') {
                    if (gameArray[i] === '') {
                        return i;
                    } else if (gameArray[i + 3] === '') {
                        return i + 3;
                    } else {
                        return i + 6;
                    }
                }
            }
            sum = gameArray[0] + gameArray[4] + gameArray[8];
            if (sum.length === 2) {
                if (gameArray[0] === '') {
                    return 0;
                } else {
                    return 8;
                }
            }
            sum = gameArray[2] + gameArray[4] + gameArray[6];
            if (sum.length === 2) {
                if (gameArray[2] === '') {
                    return 2;
                } else {
                    return 6;
                }
            }
            for (let i = 0; i <= 7; i += 3) {
                let sum = gameArray[i] + gameArray[i + 1] + gameArray[i + 2];
                if (sum.length === 2) {
                    if (gameArray[i] === '') {
                        return i;
                    } else if (gameArray[i + 1] === '') {
                        return i + 1;
                    } else {
                        return i + 2;
                    }
                }
            }
            for (let i = 0; i <= 3; i++) {
                let sum = gameArray[i] + gameArray[i + 3] + gameArray[i + 6];
                if (sum.length === 2) {
                    if (gameArray[i] === '') {
                        return i;
                    } else if (gameArray[i + 3] === '') {
                        return i + 3;
                    } else {
                        return i + 6;
                    }
                }
            }
            for (let i = 0; i <= 8; i += 2) {
                if (gameArray[i] === '') {
                    return i;
                }
            }
            for (let i = 1; i <= 7; i += 2) {
                if (gameArray[i] === '') {
                    return i;
                }
            }
        }

        function hardMode() {
            let move = minimax(getGameArray(), 'O').index;
            return move
        }

        function minimax(board, player) {
            let moves = [];
            let availableMoves = [];
            let isWon = checkForWinner(board);
            if (isWon) {
                if (isWon.result === 'O') {
                    return { score: 10 }
                } else if (isWon.result === 'X') {
                    return { score: -10 };
                } else if (availableMoves.length === 0) {
                    return { score: 0 };
                }
            } else {
                board.forEach((item, index) => {
                    if (item === '') {
                        availableMoves.push(index);
                    }
                });
                availableMoves.forEach(item => {
                    let move = {};
                    move.index = item;
                    let tempBoard = [...board];
                    let tempPlayer;
                    tempBoard[item] = player;
                    (player === 'X') ? tempPlayer = 'O' : tempPlayer = 'X';
                    let result = minimax(tempBoard, tempPlayer);
                    move.score = result.score;
                    moves.push(move);
                });
            }

            let bestMove;
            if (player === 'X') {
                let bestScore = 100;
                moves.forEach((move, index) => {
                    if (move.score < bestScore) {
                        bestScore = move.score;
                        bestMove = index;
                    }
                })
            } else {
                let bestScore = -100;
                moves.forEach((move, index) => {
                    if (move.score > bestScore) {
                        bestScore = move.score;
                        bestMove = index;
                    }
                })
            }
            return moves[bestMove];
        }

        function getMode() {
            return gameMode;
        }

        return {
            checkForWinner, updateArray, newGame, restartGame, calculateMove, getMode, getGameArray
        }
    })();

    const mainDiv = document.getElementById('main');
    const newGameButton = document.getElementById('new-game-button');
    const gameName = createElement({ type: 'h1', textContent: 'Tic-Tac-Toe' });
    const restartButton = createElement({ type: 'button', textContent: 'Restart', id: 'restart-button' });
    const chooseGameModeScreen = createElement({ type: 'div', id: 'choose-mode-screen' });
    const selectModeText = createElement({ type: 'h2', textContent: 'Select mode:' });
    const playerVsPlayerButton = createElement({ type: 'button', textContent: 'Player VS Player', id: 'player-player-button' });
    const playerVsComputerButton = createElement({ type: 'button', textContent: 'Player VS Computer', id: 'player-computer-button' });
    const gameScreenDiv = createElement({ type: 'div', id: 'game-screen' });
    const buttonContainer = createElement({ type: 'div', id: 'button-container' });
    let displayElement = createElement({ type: 'div', textContent: 'Make your move...', id: 'display-element' });
    const easyButton = createElement({ type: 'button', textContent: 'Easy', id: 'easy-mode-button' });
    const normalButton = createElement({ type: 'button', textContent: 'Normal', id: 'normal-mode-button' });
    const hardButton = createElement({ type: 'button', textContent: 'Hard', id: 'hard-mode-button' });
    const chooseDifficultyScreen = createElement({ type: 'div', id: 'difficulty-container' });
    const selectDifficultyText = createElement({ type: 'h2', textContent: 'Select difficulty:' });
    let clickEventListenerAttached = false;


    newGameButton.addEventListener('click', createChooseGameModeScreen);
    playerVsPlayerButton.addEventListener('click', startPlayerVsPlayerGame);
    restartButton.addEventListener('click', restart);
    playerVsComputerButton.addEventListener('click', chooseDifficulty);
    easyButton.addEventListener('click', startPlayerVsComputerGame);
    normalButton.addEventListener('click', startPlayerVsComputerGame);
    hardButton.addEventListener('click', startPlayerVsComputerGame);

    function render() {
        let result = Game.checkForWinner();
        if (result) {
            gameScreenDiv.removeEventListener('click', clickListener);
            clickEventListenerAttached = false;
            updateDisplayText(result.status);
            if (result.coordinates) {
                highlightBoxes(result.coordinates);
            }
            return;
        }
        if (Gameboard.getMarker() === 'O' && Game.getMode() === 'Player VS Computer') {
            let computerMove = Game.calculateMove();
            let moveIsSubmitted = Gameboard.updateBoard(computerMove);
            if (moveIsSubmitted) {
                render();
            }
        }
    }

    function chooseDifficulty() {
        chooseGameModeScreen.remove();
        chooseDifficultyScreen.appendChild(selectDifficultyText);
        chooseDifficultyScreen.appendChild(easyButton);
        chooseDifficultyScreen.appendChild(normalButton);
        chooseDifficultyScreen.appendChild(hardButton);
        mainDiv.appendChild(chooseDifficultyScreen);
    }

    function startPlayerVsPlayerGame() {
        chooseGameModeScreen.remove();
        createGameDisplay();
        Game.newGame('Player VS Player');
    }

    function startPlayerVsComputerGame(event) {
        let difficulty = event.composedPath()[0].textContent;
        chooseDifficultyScreen.remove();
        createGameDisplay();
        Game.newGame('Player VS Computer', difficulty);
    }

    function createGameDisplay() {
        mainDiv.appendChild(gameScreenDiv);
        let gameboard = Gameboard.createBoard();
        if (gameboard !== 'already created') {
            gameScreenDiv.appendChild(displayElement);
            gameScreenDiv.appendChild(gameboard);
            buttonContainer.appendChild(newGameButton);
            buttonContainer.appendChild(restartButton);
            gameScreenDiv.appendChild(buttonContainer);
        } else {
            updateDisplayText('Make your move...')
        }
        gameScreenDiv.addEventListener('click', clickListener);
        clickEventListenerAttached = true;
    }

    function createChooseGameModeScreen() {
        mainDiv.firstElementChild.remove();
        chooseGameModeScreen.appendChild(gameName);
        chooseGameModeScreen.appendChild(selectModeText);
        chooseGameModeScreen.appendChild(playerVsPlayerButton);
        chooseGameModeScreen.appendChild(playerVsComputerButton);
        mainDiv.appendChild(chooseGameModeScreen);
    }

    function clickListener(event) {
        let boxId = event.composedPath()[0].id;
        let boxNumber = boxId.split('-');
        let result = Gameboard.updateBoard(boxNumber[1]);
        if (result) {
            render();
        }
    }

    function updateDisplayText(text) {
        displayElement.textContent = text;
    }

    function highlightBoxes(coordinates) {
        coordinates.forEach(index => {
            let box = document.getElementById(`box-${index}`);
            box.classList.add('highlight');
        });
    }

    function restart() {
        Game.restartGame();
        Gameboard.resetBoard();
        if (!clickEventListenerAttached) {
            gameScreenDiv.addEventListener('click', clickListener);
        }
        updateDisplayText('Make your move...');
    }

    function createElement(el) {
        // el -- is an object containing type, text content and id
        let element = document.createElement(el.type);

        if (el.textContent) {
            element.textContent = el.textContent;
        }

        if (el.id) {
            element.setAttribute('id', el.id)
        }

        return element;
    }




})()