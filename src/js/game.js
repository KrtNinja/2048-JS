var cvs = document.getElementById('canvas');
var ctx = cvs.getContext('2d');

ctx.font="30px `Times New Roman`";

var startXposArea = 340;
var startYposArea = 150;

var gameArea;
var verticalLines = [];
var horizontalLines = []

function draw(){

    //Игровое поле
    ctx.strokeStyle = "#2B5278";
    ctx.strokeWidth = '10px'
    gameArea = ctx.strokeRect(startXposArea, startYposArea, 
                                cvs.width-680, cvs.height-300);

    //Вертикальные линии

    for( let i = 0; i < 3; i++){
        verticalLines[i] = ctx.strokeRect(startXposArea + ( (i + 1) * 150), startYposArea, 
                                            1, cvs.height-300);
    }
    //Горизонтальные линии
    for( let i = 0; i < 3; i++){
        horizontalLines[i] = ctx.strokeRect(startXposArea, startYposArea + ( (i + 1) * 150), 
                                            cvs.width-680, 1);
    }

    // ctx.beginPath();
    // ctx.moveTo(0,0);
    // ctx.lineWidth = 15;
    // ctx.lineTo(100, 100);
    // ctx.stroke();

}

draw();