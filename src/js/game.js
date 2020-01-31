class Game {
    constructor(parentElement, size = 4) {
        let gameFieldElement = createAndAppend({
            className: 'game',
            parentElement
        });

        let headerElement = createAndAppend({
            className: 'header',
            parentElement: gameFieldElement
        });

        this.score = 1234;

        headerElement.innerHTML = 'Score:' + this.score;

        let fieldElement = createAndAppend({
            className: 'field',
            parentElement: gameFieldElement
        });

        for (let i = 0; i < size; i++){
            for (let k = 0; k < size; k++){
                let cellElement = createAndAppend({
                    className: 'cell',
                    parentElement: fieldElement
                });

                new CellText(cellElement);

            }
        }
    }
}