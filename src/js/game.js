class Game {
    constructor(parentElement, size = 4) {
        
        this.fieldSize = 80;
        this.size = size;
        this.cellSize = (this.fieldSize / this.size - 2)

        this.gameFieldElement = createAndAppend({
            className: 'game',
            parentElement
        });

        this.headerElement = createAndAppend({
            className: 'header',
            parentElement: this.gameFieldElement
        });

        this.titleElement = createAndAppend({
            className: 'title',
            parentElement: this.headerElement
        });
        let titleTextElement = createAndAppend({
            className: 'titleText',
            parentElement: this.titleElement
        });
        this.titleButtonElement = createAndAppend({
            className: 'titleButtons',
            parentElement: this.titleElement
        });
        this.titleButtonNewGameElement = createAndAppend({
            className: 'titleButtonNewGame',
            parentElement: this.titleButtonElement,
            value : 'New Game'
        }, 'button');


        this.scoreElement = createAndAppend({
            className: 'score',
            parentElement: this.headerElement
        });
        let scoreTextElement = createAndAppend({
            className: 'scoreText',
            parentElement: this.scoreElement
        });
        this.scoreNumberElement = createAndAppend({
            className: 'scoreNumber',
            parentElement: this.scoreElement
        });

        this.score = 0;

        this.titleButtonNewGameElement.onclick = this.resetGame.bind(this);
        titleTextElement.innerHTML = '2048 NEON'
        scoreTextElement.innerHTML = 'Score ';

        this.fieldElement = createAndAppend({
            className: 'field',
            parentElement: this.gameFieldElement
        });

        this.cell = [];

        this.detectDevice();

        for (let i = 0; i < size; i++){
            this.cell[i] = [];
            for (let k = 0; k < size; k++){
                
                let cellElement = createAndAppend({
                    className: 'cell',
                    parentElement: this.fieldElement
                });

                cellElement.style.width = this.cellSize + 'vmin';
                cellElement.style.height = this.cellSize + 'vmin';

                this.cell[i][k] = new CellText(cellElement, this);
            }
        }

        //Движение элементов клавишами клавиатуры
        window.addEventListener('keyup', function(e){
            switch (e.keyCode){
                case 38:
                    this.moveUp()
                    break;
                case 40:
                    this.moveDown()
                    break;
                case 37:
                    this.moveLeft()
                    break;
                case 39:
                    this.moveRight()
                    break;
            }
        }.bind(this));
        
        //Движение элементов на мобильных устройствах свайпами
        let initialPoint;
        let finalPoint;
        window.addEventListener('touchstart', function(event) {
            initialPoint=event.changedTouches[0];
        }, false);
        window.addEventListener('touchend', function(event) {
            finalPoint=event.changedTouches[0];

            let xAbs = Math.abs(initialPoint.pageX - finalPoint.pageX);
            let yAbs = Math.abs(initialPoint.pageY - finalPoint.pageY);
            if (xAbs > 20 || yAbs > 20) {
                if (xAbs > yAbs) {
                    if (finalPoint.pageX < initialPoint.pageX){
                        this.game.moveLeft();
                    }
                    else{
                        this.game.moveRight();
                    }
                }
                else {
                    if (finalPoint.pageY < initialPoint.pageY){
                        this.game.moveUp();
                    }
                    else{
                        this.game.moveDown();
                    }
                }
            }
        }, false);

        this.resetGame();
    }

    detectDevice(){
        if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
            this.gameFieldElement.style.justifyContent = 'center';

            this.headerElement.style.width = 95 + 'vmin';
            this.headerElement.style.height = 25 + 'vmin';

            this.titleElement.style.justifyContent = 'space-between';
            this.titleElement.style.fontSize = 9 + 'vmin';

            this.scoreElement.style.fontSize = 4.5 + 'vmin';

            this.titleButtonElement.style.width = 30 + 'vmin';
            this.titleButtonNewGameElement.style.fontSize = 3.5 + 'vmin';

            this.fieldElement.style.width = 95 + 'vmin';
            this.fieldElement.style.height = 95 + 'vmin';

            this.fieldSize = 95;
            this.cellSize = (this.fieldSize / this.size - 2);
        }
    }
    spawnNumber(){
        let emptyCellText = [];

        for (let i = 0; i < this.cell.length; i++){
            for (let k = 0; k < this.cell[i].length; k++){
                if (!this.cell[i][k].value){
                    emptyCellText.push(this.cell[i][k]);
                }
            }
        }

        if (emptyCellText.length != 0){
            emptyCellText[randomInt(0, emptyCellText.length - 1)].spawn();
        }
        else{
            alert('You Lose!')
        }
    }

    resetGame(){
        for (let i = 0; i < this.size; i++){
            for (let k = 0; k < this.size; k++){
                this.cell[i][k].value = '';
            }
        }

        for (let z = 0; z < 2; z++){
            this.spawnNumber();
        }
        this.score = 0;
    }

    set score(value){
        this._score = value;
        this.scoreNumberElement.innerHTML = value;
    }

    get score(){
        return this._score;
    }

    addScore(value){
        this.score += value;
    }


    onCellTextMerge(CellText){
        
    }

    moveRight(){
        let hasMoved = false;
        for (let i = 0; i < this.size; i++){
            for (let k = this.size - 2; k >= 0; k--){
                let currentCellText = this.cell[i][k];
                if (currentCellText.isEmpty){
                    continue;
                }

                let nextCellTextKey = k + 1;
                while (nextCellTextKey < this.size){
                    let nextCellText = this.cell[i][nextCellTextKey];
                    if (!nextCellText.isEmpty || this.isLastKey(nextCellTextKey) ){
                        if ( (nextCellText.isEmpty && this.isLastKey(nextCellTextKey) )
                            || nextCellText.isSameTo(currentCellText) ){
                                this.cell[i][nextCellTextKey].merge(currentCellText);
                                // this.score = this.cell[i][nextCellTextKey].value;
                                hasMoved = true;
                        } else if (!nextCellText.isEmpty && nextCellTextKey - 1 != k ){
                            this.cell[i][nextCellTextKey - 1].merge(currentCellText);
                            hasMoved = true;
                        }

                        break;
                    }
                    nextCellTextKey++;
                    nextCellText = this.cell[i][nextCellTextKey];
                }
            }
        }
        
        if (hasMoved){
            this.spawnNumber();
        }
    }
    isLastKey(key){
        return key == (this.size - 1);
    }

    isFirstKey(key){
        return key == 0;
    }

    moveLeft(){
        let hasMoved = false;
        for (let i = 0; i < this.size; i++){
            for (let k = 1; k < this.size; k++){
                let currentCellText = this.cell[i][k];
                if (currentCellText.isEmpty){
                    continue;
                }

                let nextCellTextKey = k - 1;
                while (nextCellTextKey >= 0){
                    let nextCellText = this.cell[i][nextCellTextKey];
                    if (!nextCellText.isEmpty || this.isFirstKey(nextCellTextKey) ){
                        if ( (nextCellText.isEmpty && this.isFirstKey(nextCellTextKey) )
                            || nextCellText.isSameTo(currentCellText) ){
                                this.cell[i][nextCellTextKey].merge(currentCellText);
                                hasMoved = true;
                        } else if (!nextCellText.isEmpty && nextCellTextKey + 1 != k ){
                            this.cell[i][nextCellTextKey + 1].merge(currentCellText);
                            hasMoved = true;
                        }

                        break;
                    }
                    nextCellTextKey--;
                    nextCellText = this.cell[i][nextCellTextKey];
                }
            }
        }
        
        if (hasMoved){
            this.spawnNumber();
        }
    }

    moveDown(){
        let hasMoved = false;
        for (let k = 0; k < this.size; k++){
            for (let i = this.size - 2; i >= 0; i--){
                let currentCellText = this.cell[i][k];
                if (currentCellText.isEmpty){
                    continue;
                }

                let nextCellTextKey = i + 1;
                while (nextCellTextKey < this.size){

                    let nextCellText = this.cell[nextCellTextKey][k];
                    if (!nextCellText.isEmpty || this.isLastKey(nextCellTextKey) ){
                        if ( (nextCellText.isEmpty && this.isLastKey(nextCellTextKey) )
                            || nextCellText.isSameTo(currentCellText) ){
                                this.cell[nextCellTextKey][k].merge(currentCellText);
                                hasMoved = true;
                        } else if (!nextCellText.isEmpty && nextCellTextKey - 1 != i ){
                            this.cell[nextCellTextKey -1][k].merge(currentCellText);
                            hasMoved = true;
                        }

                        break;
                    }
                    nextCellTextKey++;
                    nextCellText = this.cell[nextCellTextKey][k];
                }
            }
        }
        
        if (hasMoved){
            this.spawnNumber();
        }
    }

    moveUp(){
        let hasMoved = false;

        for (let k = 0; k < this.size; k++){
            for (let i = 1; i < this.size; i++){
                let currentCellText = this.cell[i][k];
                if (currentCellText.isEmpty){
                    continue;
                }

                let nextCellTextKey = i - 1;
                while (nextCellTextKey < this.size){

                    let nextCellText = this.cell[nextCellTextKey][k];
                    if (!nextCellText.isEmpty || this.isFirstKey(nextCellTextKey) ){
                        if ( (nextCellText.isEmpty && this.isFirstKey(nextCellTextKey) )
                            || nextCellText.isSameTo(currentCellText) ){
                                this.cell[nextCellTextKey][k].merge(currentCellText);
                                hasMoved = true;
                        } else if (!nextCellText.isEmpty && nextCellTextKey + 1 != i ){
                            this.cell[nextCellTextKey + 1][k].merge(currentCellText);
                            hasMoved = true;
                        }

                        break;
                    }
                    nextCellTextKey--;
                    nextCellText = this.cell[nextCellTextKey][k];
                }
            }
        }
        
        if (hasMoved){
            this.spawnNumber();
        }
    }

}


