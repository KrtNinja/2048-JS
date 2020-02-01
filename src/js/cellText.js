

class CellText {
    constructor(cellElement, game){
        this.game = game;

        this.cellElement = cellElement;

        this.element = createAndAppend({
            className: 'cell-text',
            parentElement: cellElement
        });

        this.element.style.width = (this.game.cellSize - 3) + 'vmin';
        this.element.style.height = (this.game.cellSize - 3) + 'vmin';

    }

    get value(){
        return this._value  || 0;
    }

    set value(value){
        this._value = value;

        this.element.innerHTML = value == 0 ? '' : value;
        this.element.setAttribute('data-number', value);
    }

    clear(){
        this.value = '';
    }

    merge(cellText){
        if (this.value){
            this.highlight();
            this.game.addScore(this.value + cellText.value);
        }
        
        new AnimateCellText(cellText, this);

        this.value += cellText.value;
        cellText.clear();
    }

    isSameTo(cellText){
        return this.value == cellText.value;
    }

    spawn(){
        this.value = Math.random() > 0.5 ? 4 : 2;
    }

    get isEmpty(){
        return this.value == 0;
    }

    highlight(){
        this.element.className = 'cell-text highlight';

        this.element.style.width = this.game.cellSize + 1 + 'vmin';
        this.element.style.height = this.game.cellSize + 1 + 'vmin';

        let highlightTime = 100;
        let highlightStartTime = new Date();
        this.highlightStartTime = highlightStartTime;


        setTimeout(function(){
            if(highlightStartTime == this.highlightStartTime){
                this.element.className = 'cell-text';
                this.element.style.width = (this.game.cellSize - 3) + 'vmin';
                this.element.style.height = (this.game.cellSize - 3) + 'vmin';
            } 

        }.bind(this), highlightTime)
    }
}

class AnimateCellText {
    constructor(fromCellText, toCellText){
        this.element = fromCellText.element.cloneNode(true);
        this.element.className = 'cell-text animate';
        
        this.element.style.top = fromCellText.element.offsetTop + 'px';
        this.element.style.left = fromCellText.element.offsetLeft + 'px';
        
        fromCellText.cellElement.appendChild(this.element);

        this.element.style.top = toCellText.element.offsetTop + 'px';
        this.element.style.left = toCellText.element.offsetLeft + 'px';

        setTimeout(function(){
            fromCellText.cellElement.removeChild(this.element);
        }.bind(this), 300)
    }
}