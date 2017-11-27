
"use strict";
exports.Testframework = class {

    constructor(){
    }

    assertEquals(expected, actual){
       if(expected !== actual){
           throw `Assertion failed: expected ${expected} but is ${actual}`;
       }
    }

    runTests(testClass){
        let test = new testClass();
        let testOverview = `runTests:\n`;

        let functions = Object.getOwnPropertyNames(testClass.prototype);

        for(let property of functions){

            if(typeof test[property] === `function` &&  property.startsWith(`test`)){

                //need new testclass to test each function to not have tests influence each other
                let propertyTest = new testClass();
                //run setup if available
                try{
                if(propertyTest.setup && typeof propertyTest.setup === `function`){
                    propertyTest.setup();
                }
                //call test
                propertyTest[property]();

                }catch(e){
                    testOverview += `Test: ${property} failed: ${e}\n`;
                    continue;
                }
                testOverview += `Test: ${property}: successful\n`;
            };
        }

        console.log(testOverview);
    }
}
