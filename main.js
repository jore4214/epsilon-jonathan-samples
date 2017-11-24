const tictactoe  = require('./tictactoe.js');
const ttt = new tictactoe.TicTacToe();

ttt.initNewGame();
//ttt.act(0); // Player 1
//ttt.act(3); // Player 2
//ttt.act(1); // Player 1
//ttt.act(4); // Player 2
//ttt.act(2); // Player 1


//while(ttt.gameState === `open`){
//    ttt.doAiTurn();
//    ttt.printGameState(); // Player 1 Won!
//}

process.stdin.setEncoding('utf8');
const stdin = process.openStdin();

stdin.addListener('data', function(data) {
    /* do your tic tac toe interactive magic here */
    data =  data.replace(`\n`,``).trim();

    if(data === "newGame"){
        ttt.initNewGame();
        console.log(`new game, old thrown away`)
    }else if(data === "aiGame"){
        ttt.initNewGame();
        while(ttt.gameState === `open`){
            ttt.doAiTurn();
            ttt.printGameState();
        }
        console.log(`GameOver: ${ttt.gameState}`);
    }else{
        console.log(data);
        let pos = parseInt(data);
        if(isNaN(pos)){
            console.log("that's no position! Try again")
            return;
        }
        if(pos >= 0 && pos < 9 ){
            console.log(`Good turn!`);
            if(ttt.act(pos)){
                console.log(`Ai plays`);
                ttt.doAiTurn();
            }else{
                console.log(`you can't place there`);
            }
            console.log(`current State:`);
            ttt.printGameState();
            return;
        }

        console.log("yeah... you cant use a position outside the field. Try again.")
    }
});