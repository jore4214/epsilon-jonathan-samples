"use strict";
const OPEN = 'open';
const PLAYER1_WON = 'player1won';
const PLAYER2_WON = 'player2won';
const DRAW ='draw';
const FIELD_SIZE = 3;
const EMPTY_FIELD = 0;
const PLAYER1 = 1;
const PLAYER2 = 2;

exports.TicTacToe = class {


    constructor(){
        this.field = new Array(FIELD_SIZE*FIELD_SIZE).fill(EMPTY_FIELD);
        this.currentPlayer = PLAYER1;
        this.gameState = OPEN;
    }

    get OPEN(){return OPEN;}
    get PLAYER1_WON(){return PLAYER1_WON;}
    get PLAYER2_WON(){return PLAYER2_WON;}
    get DRAW(){return DRAW;}

    initNewGame(){
        this.field.fill(EMPTY_FIELD);
        this.currentPlayer = 1;
        this.gameState = OPEN;
    }


    act(pos){
        if(this.gameState != OPEN){
            console.log(`game already over`);
            return;
        }
        if(pos < 0){
            console.log(`ERROR: invalid pos:${pos}} player:${this.currentPlayer}}`);
            return;
        }
        if(this.field[pos] === EMPTY_FIELD){
            this.field[pos] = this.currentPlayer;
            this.currentPlayer = this._otherPlayer();
            this._updateGameState();
            return true;
        }else{
            return false;
        }
    };

    _otherPlayer(){
        return this.currentPlayer === PLAYER2 ? PLAYER1 : PLAYER2;
    }


    _updateGameState(){
        if(this._hasPlayerWon(PLAYER1)){
            this.gameState = PLAYER1_WON;
        }else if(this._hasPlayerWon(PLAYER2)){
            this.gameState = PLAYER2_WON;
        }else if(this._isDraw()){
            this.gameState = DRAW;
        }
    }

    //check if a player has won
    _hasPlayerWon(player){
        //horizontal lines
        for(let i=0; i < FIELD_SIZE*FIELD_SIZE; i+=FIELD_SIZE){
            let hasLine = true;
            for(let j =i; j < i +FIELD_SIZE; j++){
                if (this.field[j] != player){
                    hasLine = false;
                    break;
                }
            }
            if(hasLine){
                return true;
            }
        }
        //vertical lines
        for(let i=0; i < FIELD_SIZE; i++){
            let hasLine = true;
            for(let j =i; j < FIELD_SIZE*FIELD_SIZE; j+=FIELD_SIZE){
                if (this.field[j] != player){
                    hasLine = false;
                    break;
                }
            }
            if(hasLine){
                return true;
            }
        }
        //check diagonals
        //top left -> bottom right
        let diagonal = true;
        for(let i=0; i < FIELD_SIZE*FIELD_SIZE; i+=FIELD_SIZE+1){
            if (this.field[i] != player){
                diagonal = false;
                break;
            }
        }
        if(diagonal){
            return true;
        }
        //top right -> bottom left
        diagonal = true;
        for(let i= FIELD_SIZE-1; i < FIELD_SIZE*FIELD_SIZE; i+=FIELD_SIZE-1){
            if (this.field[i] != player){
                diagonal = false;
                break;
            }
        }
        if(diagonal){
            return true;
        }
        return false;
    }


    _isDraw(){
        for(let i=0; i < FIELD_SIZE*FIELD_SIZE; i++){
            if (this.field[i] === EMPTY_FIELD){
                return false;//still space
            }
        }
        return true;//all positions full
    }

    printGameState(){
        console.log(`State: ${this.gameState} CurrentPlayer:${this.currentPlayer}`);
        this._printGameField();
    }

    _printGameField(){
        for(let i =0; i < FIELD_SIZE*FIELD_SIZE; i+=FIELD_SIZE){
            let line = `|`;
            for(let j =i; j < i+FIELD_SIZE; j++){
                line += `${this.field[j]} |`;
            }
            console.log(line);
        }
    }

    //tic tac toe ai
    doAiTurn(){
        //try to win
        let attacPosition = this._checkForNearlyWon(this.currentPlayer);
        if(attacPosition > 0){
            console.log(`Ai: i won: playing ${attacPosition}`);
            this.act(attacPosition);
            return; //need turn to hinder opponent from winning
        }

        //try not to lose
        let defendPosition = this._checkForNearlyWon();
        if(defendPosition > 0){
            console.log(`Ai: not so easy. blocking ${defendPosition}`);
            this.act(defendPosition);
            return; //need turn to hinder opponent from winning
        }

        //just play somewhere good
        let positions = this._findWiningPositions();
        if(positions.length > 0){
            this.act(positions[Math.floor(Math.random()* positions.length)]);
        }else{
            //probably already draw , just fill empty spaces
            if(!this._findFirstEmpty()){
                console.log(`Ai[${this.currentPlayer}}]: no turn possible`);
            }
        }
    }

    _findFirstEmpty(){
        for(let i=0; i <  this.field.length; i++){
            if(this.field[i] === EMPTY_FIELD){
                this.act(i);
                return true;
            }
        }
        return false;
    }

    _findWiningPositions(){
        let player = this._otherPlayer();
        let winField = this.field.slice();
        //block out all positions that dont help wining anymore because other player has a field on them
        for(let i=0; i <  winField.length; i++){
            if(winField[i] === player){
                //block out horizontal line
                for(let j =  i-(i%FIELD_SIZE);j < i-(i%FIELD_SIZE) + FIELD_SIZE; j++){
                    winField[j] = player;
                }
                //block out vertical line
                for(let j = (i%FIELD_SIZE);j < FIELD_SIZE*FIELD_SIZE; j+=FIELD_SIZE){
                    winField[j] = player;
                }
                //top left -> bottom right
                if(Math.floor(i/FIELD_SIZE) === Math.floor(i%FIELD_SIZE)){
                    for(let i=0; i < FIELD_SIZE*FIELD_SIZE; i+=FIELD_SIZE+1){
                        winField[i] = player;
                    }
                }
                //top right -> bottom left
                if(Math.floor(i/FIELD_SIZE) === Math.floor(FIELD_SIZE-1 -i%FIELD_SIZE)){
                    for(let i= FIELD_SIZE-1; i < FIELD_SIZE*FIELD_SIZE; i+=FIELD_SIZE-1){
                        winField[i] = player;
                    }
                }
            }
        }

        let positions = [];
        for(let i=0; i <  winField.length; i++){
            if(winField[i] === EMPTY_FIELD){
                positions.push(i);
            }
        }
        return positions;
    }

    _checkForNearlyWon(player = this._otherPlayer()){
        let pos = -1;
        for(let i=0; i < FIELD_SIZE*FIELD_SIZE; i+=FIELD_SIZE){
            let hasLine = 0;
            for(let j =i; j < i +FIELD_SIZE; j++){
                if (this.field[j] != player){
                    hasLine++;
                    pos = j;
                }
            }
            if(hasLine === 1 && this.field[pos] == EMPTY_FIELD ){
                return pos;
            }
        }

        //vertical lines
        for(let i=0; i < FIELD_SIZE; i++){
            let hasLine = 0;
            for(let j =i; j < FIELD_SIZE*FIELD_SIZE; j+=FIELD_SIZE){
                if (this.field[j] != player){
                    hasLine++;
                    pos = j;
                }
            }
            if(hasLine === 1 && this.field[pos] == EMPTY_FIELD){
                return pos;
            }
        }
        //check diagonals
        //top left -> bottom right
        let diagonal = 0;
        for(let i=0; i < FIELD_SIZE*FIELD_SIZE; i+=FIELD_SIZE+1){
            if (this.field[i] != player){
                diagonal++;
                pos = i;
            }
        }
        if(diagonal === 1 && this.field[pos] == EMPTY_FIELD){
            return pos;
        }
        //top right -> bottom left
        diagonal = 0;
        for(let i= FIELD_SIZE-1; i < FIELD_SIZE*FIELD_SIZE; i+=FIELD_SIZE-1){
            if (this.field[i] != player){
                diagonal++;
                pos = i;
            }
        }
        if(diagonal === 1 && this.field[pos] == EMPTY_FIELD){
            return pos;
        }
        return -1;
    }
}
