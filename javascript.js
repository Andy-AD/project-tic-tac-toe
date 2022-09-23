(function () {

    const Gameboard = (() => {

        const gameboard = createElement({ type: 'div', id: 'gameboard' });
        let currentMarker = 'X';

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
            for (let i = 0; i <= 8; i++) {
                const box = createElement({ type: 'div', textContent: '', id: `box-${i}` });
                gameboard.appendChild(box);
            }
            return gameboard;
        };

        function updateBox(index, marker) {
            let box = document.getElementById(`box-${index}`);
            box.textContent = marker;
        }

        return {
            createBoard, updateBoard
        }

    })();

    const Game = (() => {
        let gameArray = ['', '', '', '', '', '', '', '', ''];

        let mode = '';
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
                return ({status: "It's a tie!", result: 0})
            }
            for (let i = 0; i <= 7; i += 3) {
                let sum = gameArray[i] + gameArray[i + 1] + gameArray[i + 2];
                if (sum === 'XXX' || sum === 'OOO') {
                    return ({ coordinates: [i, i + 1, i + 2], status: `The winner is ${sum[0]}!`, result: sum[0]})
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
                return ({ coordinates: [0, 4, 8], status: `The winner is ${sum[0]}!`, result: sum[0]})
            }
            sum = gameArray[2] + gameArray[4] + gameArray[6];
            if (sum === 'XXX' || sum === 'OOO') {
                return ({ coordinates: [2, 4, 6], status: `The winner is ${sum[0]}!`, result: sum[0] })
            }
            return false;
        }

        return {
            checkForWinner, updateArray, mode
        }
    })();

    const mainDiv = document.getElementById('main');
    const newGameButton = document.getElementById('new-game');
    const startNewGameDiv = document.getElementById('start-screen');
    const selectModeText = createElement({ type: 'h2', textContent: 'Select mode:' });
    const playerVsPlayerButton = createElement({ type: 'button', textContent: 'Player VS Player', id: 'player-player-button' });
    const playerVsComputerButton = createElement({ type: 'button', textContent: 'Player VS Computer', id: 'player-computer-button' });
    const gameScreenDiv = createElement({ type: 'div', id: 'game-screen' });
    let displayElement = createElement({ type: 'div', textContent: 'Make your move...', id: 'display-element' })


    newGameButton.addEventListener('click', createChooseGameModeScreen);
    playerVsPlayerButton.addEventListener('click', startPlayerVsPlayerGame);
    gameScreenDiv.addEventListener('click', clickListener);

    function render() {
        let result = Game.checkForWinner();
        if (result) {
            gameScreenDiv.removeEventListener('click', clickListener);
            updateDisplay(result.status);
            if (result.coordinates) {
                highlightBoxes(result.coordinates);
            }
        }
    }

    function startPlayerVsPlayerGame() {
        startNewGameDiv.remove();
        createGameDisplay();
        Game.mode = 'Player VS Player';
    }

    function createGameDisplay() {

        let gameboard = Gameboard.createBoard();

        gameScreenDiv.appendChild(displayElement);
        gameScreenDiv.appendChild(gameboard);
        mainDiv.appendChild(gameScreenDiv);
    }

    function createChooseGameModeScreen() {
        newGameButton.remove();
        startNewGameDiv.appendChild(selectModeText);
        startNewGameDiv.appendChild(playerVsPlayerButton);
        startNewGameDiv.appendChild(playerVsComputerButton);
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





/* (function () {

    const createPlayer = (name, marker) => {
        return { name, marker };
    };

    const Gameboard = (() => {

        const gameBoardDiv = document.getElementById('game-board');
        let gameboardArray = ['', '', '', '', '', '', '', '', ''];
        let isBoardCreated = false;
        let currentMarker = 'X';


        gameBoardDiv.addEventListener('click', clickListener);

        const render = () => {
            isBoardCreated ? updateMarker() : createBoard();
            let winner = checkForWinner();
            if (winner) {
                gameOver(winner);
            }
        };

        function createBoard() {
            for (let i = 0; i <= 8; i++) {
                const box = createBox(`box-${i}`);
                gameBoardDiv.appendChild(box);
            }
            isBoardCreated = true;
        };

        function createBox(id) {
            let box = document.createElement('div');
            box.setAttribute('id', id);
            return box;
        };

        function placeMarker(boxNumber) {
            if (gameboardArray[boxNumber] === '') {

                gameboardArray[boxNumber] = currentMarker;

                changeMarker();

                render();
            }
        }

        function changeMarker() {
            (currentMarker === 'X') ? currentMarker = 'O' : currentMarker = 'X';
        }

        function clickListener(event) {
            let boxId = event.composedPath()[0].id;
            let boxNumber = boxId.split('-');
            placeMarker(boxNumber[1]);
        }

        function updateMarker() {
            gameboardArray.forEach((marker, index) => {
                let box = document.getElementById(`box-${index}`);
                box.textContent = marker;
            })
        }

        function checkForWinner() {
            for (let i = 0; i <= 7; i += 3) {
                let sum = gameboardArray[i] + gameboardArray[i + 1] + gameboardArray[i + 2];
                if (sum === 'XXX' || sum === 'OOO') {
                    console.log('winner', sum)
                    return ([i, i + 1, i + 2])
                }
            }
            for (let i = 0; i <= 3; i++) {
                let sum = gameboardArray[i] + gameboardArray[i + 3] + gameboardArray[i + 6];
                if (sum === 'XXX' || sum === 'OOO') {
                    console.log('winner', sum)
                    return ([i, i + 3, i + 6])
                }
            }
            sum = gameboardArray[0] + gameboardArray[4] + gameboardArray[8];
            if (sum === 'XXX' || sum === 'OOO') {
                console.log('winner', sum)
                return ([0, 4, 8])
            }
            sum = gameboardArray[2] + gameboardArray[4] + gameboardArray[6];
            if (sum === 'XXX' || sum === 'OOO') {
                console.log('winner', sum);
                return ([2, 4, 6])
            }
        }

        function gameOver(coordinates){
            coordinates.forEach(index => {
                let box = document.getElementById(`box-${index}`);
                box.classList.add('highlight');
            })
            gameBoardDiv.removeEventListener('click', clickListener);
        }

        return { render };
    })();

    Gameboard.render();

    const player1 = createPlayer('Player1', 'X');
    const player2 = createPlayer('Player2', 'O');

})();
 */