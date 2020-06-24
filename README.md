<img src="https://s3.amazonaws.com/devmountain/readme-logo.png" width="250" align="right">

# Project Summary

We will be creating a simple test using Selenium Webdriver, with Jest as our test runner, and TypeScript (basically "typed" JavaScript) as our language. This should show you how well your skills you've picked up using NightwatchJS will transfer to other automation stacks!

## Step 1

Setup

### Instructions

- Fork and clone this repo
- run `npm i`

## Step 2

### Instructions

- run `jest`
- You should see a simple test run, and a report that 1 out of 1 Tests passed.

## Step 3

### Summary

We're going to run through this as a class, but here is the summary.

### Instructions

- Create a folder in the `__tests__` folder named `practiceTest`
- In this folder create two files, `driverBuilder.ts` and `imdb.test.ts`
 - `imdb.test.ts` will do a search on [IMDb](https://www.imdb.com) and verify results
 - `driverBuilder.ts` will handle all the driver setup for us in one place, so we won't need to build our driver the long way in EVERY test file we use.
- Detailed instructions will be coming during the class, but you can see the contents of each file below.

<details>

<summary> <code> imdb.test.ts </code> </summary>

```javascript
//getting our driver builder - other dependencies are automatically imported if we use "tab" completion
import getDriver from './driverBuilder'
import { By, until } from 'selenium-webdriver'

describe('IMDb searching and movie pages', () => {
    //const driver is assigned the driver built by getDriver
    const driver = getDriver('chrome')
    const searchBar = By.name('q') //By is the way to specify locators, here we'll have 4 examples
    const searchButton = By.id('suggestion-search-button')
    const movieLinks = By.xpath('//h3[contains(text(), "Titles")]/..//td[@class="result_text"]/a')
    const resultTitle = By.css('.title_wrapper > h1')

    //beforeEach runs before every "it" statement, and will load the home page
    //don't forget to put 'async' in front of functions that will have any asynchronous code we'll need to 'await'
    beforeEach(async () => {
        await driver.get('https://www.imdb.com')
    })

    //"it" is how we specify a test in our test suite - we can have as many of these as we want
    it('can load', async ()=>{
        //pass the expect what you're looking at, then call the method to check it
        //like expect(<string>).toContain(<another string>)
        expect(await driver.getTitle()).toContain('IMDb')
    })

    it('can find a movie', async()=>{
        //Step 1: Do a search
        //this wait will run the find element command until the "until" is valid, which means
        //the search bar is now loaded and we can type in our search term
        await driver.wait(until.elementLocated(searchBar))
        var search = (await driver).findElement(searchBar)
        await search.sendKeys('Independence Day')
        //we don't need to wait for the page to load here, so we skip the "wait"
        //we can wrap our finding the searchButton in parenthesis to use the WebElement is returns
        //like `await <WebElement>.click()`
        await (await driver.findElement(searchButton)).click()
        
        //Step 2: Pick the first movie result
        await driver.wait(until.elementLocated(movieLinks))
        //findElements PLURAL will return an array of WebElements instead of just one
        //we'll store the array, and then wait for the click on the first one to go through       
        const results = await driver.findElements(movieLinks);
        await results[0].click();

        //Step 3: Check that the title matches what we searched for
        //wait for the result title element to show up
        await driver.wait(until.elementLocated(resultTitle))
        //grab the text and compare it to expected text
        expect(await (await driver.findElement(resultTitle)).getText()).toContain('Independence Day')
    })

    //afterAll runs after all of the "it" statements are done and closes our driver
    afterAll(async () => {
        await driver.quit()
    })
})
```

</details>

<details>

<summary> <code> driverBuilder.ts </code> </summary>

```javascript
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
```

</details>

## Step 3

### Instructions

- You can run all your tests with the command `jest`, but that will also run the `intro.test.ts` file.
- You can run JUST the new test by using the command `jest imdb` - it will find the test file that matches `imdb` and go from there!

## Contributions

If you see a problem or a typo, please fork, make the necessary changes, and create a pull request so we can review your changes and merge them into the master repo and branch.

## Copyright

© Devmountain LLC, 2020. Unauthorized use and/or duplication of this material without express and written permission from Devmountain, LLC is strictly prohibited. Excerpts and links may be used, provided that full and clear credit is given to Devmountain with appropriate and specific direction to the original content.

<p align="center">
<img src="https://s3.amazonaws.com/devmountain/readme-logo.png" width="250">
</p>
```
