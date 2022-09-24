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
            createBoard, updateBoard, resetBoard
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

        function checkForWinner() {
            if (!gameArray.includes('')) {
                return ({ status: "It's a tie!", result: 0 })
            }
            for (let i = 0; i <= 7; i += 3) {
                let sum = gameArray[i] + gameArray[i + 1] + gameArray[i + 2];
                if (sum === 'XXX' || sum === 'OOO') {
                    return ({ coordinates: [i, i + 1, i + 2], status: `The winner is ${sum[0]}!`, result: sum[0] })
                }
            }
            for (let i = 0; i <= 3; i++) {
                let sum = gameArray[i] + gameArray[i + 3] + gameArray[i + 6];
                if (sum === 'XXX' || sum === 'OOO') {
                    return ({ coordinates: [i, i + 3, i + 6], status: `The winner is ${sum[0]}!`, result: sum[0] })
                }
            }
            sum = gameArray[0] + gameArray[4] + gameArray[8];
            if (sum === 'XXX' || sum === 'OOO') {
                return ({ coordinates: [0, 4, 8], status: `The winner is ${sum[0]}!`, result: sum[0] })
            }
            sum = gameArray[2] + gameArray[4] + gameArray[6];
            if (sum === 'XXX' || sum === 'OOO') {
                return ({ coordinates: [2, 4, 6], status: `The winner is ${sum[0]}!`, result: sum[0] })
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
            gameArray = gameArray = ['', '', '', '', '', '', '', '', ''];
        }

        return {
            checkForWinner, updateArray, newGame, restartGame
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
    let clickEventListenerAttached = false;


    newGameButton.addEventListener('click', createChooseGameModeScreen);
    playerVsPlayerButton.addEventListener('click', startPlayerVsPlayerGame);
    restartButton.addEventListener('click', restart);

    function render() {
        let result = Game.checkForWinner();
        if (result) {
            gameScreenDiv.removeEventListener('click', clickListener);
            clickEventListenerAttached = false;
            updateDisplay(result.status);
            if (result.coordinates) {
                highlightBoxes(result.coordinates);
            }
        }
    }

    function startPlayerVsPlayerGame() {
        chooseGameModeScreen.remove();
        createGameDisplay();
        Game.newGame('Player VS Player');
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
            updateDisplay('Make your move...')
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

    function updateDisplay(text) {
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
        updateDisplay('Make your move...');
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