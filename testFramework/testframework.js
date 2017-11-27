
"use strict";
exports.Testframework = class {

    constructor(){
    }

    assertEquals(expected, actual){
       if(expected != actual){
           throw `Testframework.assertEquals: expected ${expected} but is ${actual}`;
       }
    }

    runTests(testClass){
        let test = new testClass();

        for(let property in test){
            //run setup if available
            if(test.setup){
                test.setup();
            }
        }
    }
}
