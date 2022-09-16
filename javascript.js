(function() {
    const createPlayer = (name, marker) => {
        return { name, marker };
    };

    const Gameboard = (() => {
        
        const gameBoardDiv = document.getElementById('game-board');        
        let gameboardArray = ['', '', '', '', '', '', '', '', ''];
        let isBoardCreated = false;

        const render = () => {
            isBoardCreated ? updateMarker(gameboardArray) : createBoard(gameboardArray);
        };

        function createBoard(array) {
            array.forEach((marker, index) => {
                const box = createBox(`box-${index}`, marker);
                gameBoardDiv.appendChild(box);
            });
            isBoardCreated = true;
        };
        
        function createBox(id,text) {
            let box = document.createElement('div');
            box.textContent = text;
            box.setAttribute('id', id);
            return box;
        };

        const placeMarker = (boxNumber, marker) => {
            gameboardArray[boxNumber] = marker;
            console.log(gameboardArray, isBoardCreated);
            render();
        }

        function updateMarker(array) {
            array.forEach( (marker, index) => {
                let box = document.getElementById(`box-${index}`);
                box.textContent = marker;
            })
        }

        return {render, placeMarker};
    })();

    

    Gameboard.render();

    const player1 = createPlayer('Player1', 'X');
    const player2 = createPlayer('Player2', 'O');

    
    Gameboard.placeMarker(2, 'O');
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
