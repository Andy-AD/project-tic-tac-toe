(function () {
    
    const mainDiv = document.getElementById('main');
    const newGameButton = document.getElementById('new-game');
    const startNewGameDiv = document.getElementById('start-screen');
    const selectModeText = createElement({type: 'h2', textContent: 'Select mode:'});
    const playerVsPlayerButton = createElement({type: 'button', textContent: 'Player VS Player', id: 'player-player-button'});
    let playerVsComputerButton = document.createElement('button');


    newGameButton.addEventListener('click', newGame);

    function newGame() {
        newGameButton.remove();
        chooseGameMode();
    }

    function chooseGameMode() {
        
        playerVsPlayerButton.textContent = '';
        playerVsPlayerButton.setAttribute('id', '');
        
        playerVsComputerButton.textContent = 'Player VS Computer';
        playerVsComputerButton.setAttribute('id', 'player-computer-button');

        startNewGameDiv.appendChild(selectModeText);
        startNewGameDiv.appendChild(playerVsPlayerButton);
        startNewGameDiv.appendChild(playerVsComputerButton);        
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