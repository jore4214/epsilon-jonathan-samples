
"use strict";
exports.Testframework = class {

    constructor(){
    }

    AssertionException(expected,actual) {
        this.message = ` expected ${expected} but is ${actual}`;
        this.name = "AssertionException:";
    }

    assertEquals(expected, actual){
       if(expected !== actual){
           throw new AssertionException(expected,actual);
       }
    }

    runTests(testClass){
        let test = new testClass();
        let testOverview = `Tests of ${testClass}`;
        for(let property in test){

            if(typeof test[property] === `function` &&  property.startsWith(`test`)){

                //run setup if available
                try{
                if(test.setup){
                    test.setup();
                }
                //call test

                test[property]();
                }catch (e if e instanceof AssertionException){
                    testOverview += `Test: ${property} failed assertion: ${e.name}${e.message}\n`;
                    continue;
                }catch(e){
                    testOverview += `Test: ${property} throws exception: ${e}\n`;
                    continue;
                }
                testOverview += `Test: ${property}: successful\n`;
            };
        }

        console.log(testOverview);
    }
}
