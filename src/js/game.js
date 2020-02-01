class Game {
    constructor(parentElement, size = 4) {
        this.fieldSize = 80;
        this.size = size;
        this.cellSize = (Math.floor(this.fieldSize / this.size) - 2)

        let gameFieldElement = createAndAppend({
            className: 'game',
            parentElement
        });

        let headerElement = createAndAppend({
            className: 'header',
            parentElement: gameFieldElement
        });

        let titleElement = createAndAppend({
            className: 'title',
            parentElement: headerElement
        });
        let titleTextElement = createAndAppend({
            className: 'titleText',
            parentElement: titleElement
        });
        let titleButtonElement = createAndAppend({
            className: 'titleButtons',
            parentElement: titleElement
        });
        this.titleButtonNewGameElement = createAndAppend({
            className: 'titleButtonNewGame',
            parentElement: titleButtonElement,
            value : 'New Game'
        }, 'button');


        let scoreElement = createAndAppend({
            className: 'score',
            parentElement: headerElement
        });
        let scoreTextElement = createAndAppend({
            className: 'scoreText',
            parentElement: scoreElement
        });
        this.scoreNumberElement = createAndAppend({
            className: 'scoreNumber',
            parentElement: scoreElement
        });

        this.score = 0;

        this.titleButtonNewGameElement.onclick = this.resetGame.bind(this);
        titleTextElement.innerHTML = '2048 NEON'
        scoreTextElement.innerHTML = 'Score ';

        let fieldElement = createAndAppend({
            className: 'field',
            parentElement: gameFieldElement
        });

        this.cell = [];

        for (let i = 0; i < size; i++){
            this.cell[i] = [];
            for (let k = 0; k < size; k++){
                
                let cellElement = createAndAppend({
                    className: 'cell',
                    parentElement: fieldElement
                });

                cellElement.style.width = this.cellSize + 'vmin';
                cellElement.style.height = this.cellSize + 'vmin';

                this.cell[i][k] = new CellText(cellElement, this);
            }
        }
        this.resetGame();

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


