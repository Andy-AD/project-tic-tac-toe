(function () {
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

/* (function() {

    const gameBoardDiv = document.getElementById('game-board');

    const GameBoard = {

        gameboard: ['','','','','','','','',''],

        render() {
            this.gameboard.forEach((marker, index) => {
                const box = this.createBox(`box-${index}`, marker);
                gameBoardDiv.appendChild(box);
            })
        },
        createBox(id,text) {
            let box = document.createElement('div');
            box.textContent = text;
            box.setAttribute('id', id);
            return box;
        }, 
        placeMarker(boxNumber, marker) {
            this.gameboard[boxNumber] = marker;
            this.render();
        }   
    }
    GameBoard.render();

})() */
