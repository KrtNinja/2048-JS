

class CellText {
    constructor(cellElement, game){
        this.game = game;

        this.element = createAndAppend({
            className: 'cell-text',
            parentElement: cellElement
        });

        
        if (Math.random() > 0.8){
            this.spawn();
        }
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
            this.game.addScore(this.value + cellText.value);
        }
        
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
}