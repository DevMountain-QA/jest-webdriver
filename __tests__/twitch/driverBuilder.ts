const chromedriver = require('chromedriver') //this makes chromedriver avaiable to our tests
const geckodriver = require('geckodriver') //same for geckodriver
import { Builder, Capabilities } from "selenium-webdriver";

// we're exporting a function that will build a driver from scratch
// so we don't need to remember all the steps or include them in EVERY test file
// one thing to remember, `export default` == `module.exports`
export default function getDriver(browser: string) { //we're taking `browser`, which HAS to be a string, as an argument
    //based on the value of `browser`, we'll do something different... Returning a driver for the appropriate browser
    switch (browser.toLowerCase()) {
        case 'chrome':
            return new Builder()
                .withCapabilities(Capabilities.chrome())
                .build()
            break; //technically with a return statement in this 'case' we don't need a `break`, but it doesn't hurt
        case 'firefox':
            return new Builder()
                .withCapabilities(Capabilities.firefox())
                .build()
            break;
        default:
            console.log(`The browser '${browser}' is not supported by this function. Defaulting to Chrome.`)
    }
    //if something goes wrong in the switch, we'll hand back a chromedriver by recalling the function
    return getDriver('chrome'); 
}