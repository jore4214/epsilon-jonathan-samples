"use strict";
const testFrame = require(`./testframework.js`);
const tictactoe = require('../tictactoe/tictactoe.js');
const testRunner = new testFrame.Testframework();


class TicTacToeTest{

    constructor(){

        this.ttt = new tictactoe.TicTacToe();
    }
}

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

testRunner.runTests(Easytest);