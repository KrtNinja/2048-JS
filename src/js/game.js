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

        let titleElement = createAndAppend({
            className: 'title',
            parentElement: headerElement
        });

        let titleTextElement = createAndAppend({
            className: 'titleText',
            parentElement: titleElement
        });

        let titleButtonElement = createAndAppend({
            className: 'titleButton',
            parentElement: titleElement
        });

        let scoreElement = createAndAppend({
            className: 'score',
            parentElement: headerElement
        });

        let scoreTextElement = createAndAppend({
            className: 'scoreText',
            parentElement: scoreElement
        });

        let scoreNumberElement = createAndAppend({
            className: 'scoreNumber',
            parentElement: scoreElement
        });

        this.score = 1234;

        titleTextElement.innerHTML = '2048 NEON'
        scoreTextElement.innerHTML = 'Score ';
        scoreNumberElement.innerHTML = this.score;

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