"use strict";
const testFrame = require(`./testframework.js`);
const tictactoe = require('../tictactoe/tictactoe.js');
const testRunner = new testFrame.Testframework();

//just check tstframework
class Easytest{
    constructor(){
        this. a = 1;
        this.b = null;
    }
    setup(){
        this.a= 2;
    }

    testAssign(){
        testRunner.assertEquals(2, this.a);
    }

    testFailedIf(){
        if(this.a > 0){
            testRunner.assertEquals(1, this.a)
        }
    }

    testException(){
        this.a =  this.b.a;
        testRunner.assertEquals(2, this.a)
        testRunner.assertEquals(1, this.a)
    }
}

//testRunner.runTests(Easytest);

class TicTacToeTest{

    constructor(){
        this.ttt = new tictactoe.TicTacToe();
    }

    setup(){
        this.ttt.initNewGame();
    }

    testInitState(){
        testRunner .assertEquals(`open`,this.ttt.gameState);
    }

    testDrawState(){
        testRunner .assertEquals(`open`,this.ttt.gameState);
        this.ttt.act(4);
        this.ttt.act(0);
        this.ttt.act(1);
        this.ttt.act(7);
        this.ttt.act(3);
        this.ttt.act(5);
        this.ttt.act(2);
        this.ttt.act(6);
        testRunner .assertEquals(`open`,this.ttt.gameState);
        this.ttt.act(8);
        testRunner .assertEquals(`draw`,this.ttt.gameState);
    }

    testPlaye1WinStateVertical(){
        testRunner .assertEquals(`open`,this.ttt.gameState);
        this.ttt.act(4);
        this.ttt.act(0);
        this.ttt.act(1);
        this.ttt.act(5);
        testRunner .assertEquals(`open`,this.ttt.gameState);
        this.ttt.act(7);
        testRunner .assertEquals(`player1won`,this.ttt.gameState);
    }

    testPlaye1WinStateHorizontal(){
        testRunner .assertEquals(`open`,this.ttt.gameState);
        this.ttt.act(0);
        this.ttt.act(4);
        this.ttt.act(1);
        this.ttt.act(5);
        testRunner .assertEquals(`open`,this.ttt.gameState);
        this.ttt.act(2);
        testRunner .assertEquals(`player1won`,this.ttt.gameState);
    }

    testPlaye1WinStateDiag(){
        testRunner .assertEquals(`open`,this.ttt.gameState);
        this.ttt.act(0);
        this.ttt.act(1);
        this.ttt.act(4);
        this.ttt.act(5);
        testRunner .assertEquals(`open`,this.ttt.gameState);
        this.ttt.act(8);
        testRunner .assertEquals(`player1won`,this.ttt.gameState);
    }

    testPlaye1WinStateDiag2(){
        testRunner .assertEquals(`open`,this.ttt.gameState);
        this.ttt.act(6);
        this.ttt.act(1);
        this.ttt.act(4);
        this.ttt.act(5);
        testRunner .assertEquals(`open`,this.ttt.gameState);
        this.ttt.act(2);
        testRunner .assertEquals(`player1won`,this.ttt.gameState);
    }

    testPlaye2WinState(){
        testRunner .assertEquals(`open`,this.ttt.gameState);
        this.ttt.act(2);
        this.ttt.act(4);
        this.ttt.act(0);
        this.ttt.act(1);
        this.ttt.act(5);
        testRunner .assertEquals(`open`,this.ttt.gameState);
        this.ttt.act(7);
        testRunner .assertEquals(`player2won`,this.ttt.gameState);
    }
}
testRunner.runTests(TicTacToeTest);