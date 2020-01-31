

class CellText {
    constructor(cellElement){
        this.element = createAndAppend({
            className: 'cell-text',
            parentElement: cellElement
        });

        
        if (Math.random() > 0.8){
            this.value = Math.random() > 0.5 ? 4 : 2;
        }

        this.element.onclick = this.merge.bind(this);
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

    merge(){
        this.value *= 2;
    }
}