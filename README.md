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

## Step 4

### Summary

Now it's time for you to shine! If you're wanting to start fresh from a working version of the code in Step 2, you can checkout the branch `solution`. If you want to see an example of Page Objects working in this stack (it's pretty cool!) take a look at the branch `pom-example`. But, it's time to move on to bigger things.

### Instructions

Your assignment will be to take this stack and add a new test file; you can make a new folder, or just add a new test to the test folder... `twitch.test.ts` where you will need to go to (twitch.tv)[https://www.twitch.tv/] and automate the following test:

1. Open the most popular channel listed in "Recommended Channels" on the left of the page.
2. Verify that the channel that opens is the channel you expected (it has the same title)

If you want a bit more of a challenge, try the following test!

1. Open the "Browse" page
2. Filter by the tag "Let's Play"
3. Sort by "Viewers (High to Low)"
4. Launch the most popular "Let's Play" stream

You can see example tests here - but keep in mind that they are not well commented, as these are intended for reference, and you are intended to complete these with much less guidance. It's also worth noting that the tests pass in Chrome, but fail in Firefox... Bonus points if you fix that in your version of the test! Their drivers handle loading and 'waiting' *slightly* differently from each other. Fun, huh?

<details>

<summary> <code> twitch.test.ts </code> </summary>

```javascript
import getDriver from './driverBuilder'
import { WebDriver, By, until, WebElement } from 'selenium-webdriver'

describe('Twitch TV', ()=>{
    const driver:WebDriver = getDriver('chrome')
    const popularChannels:By = By.css('[data-a-target="side-nav-title"]')
    const menuOptionBrowse:By = By.css('a[data-test-selector="top-nav__browse-link"]')
    const tagSearchBar:By = By.css('input[placeholder="Search Tags"]')
    const letsPlayOption:By = By.css('[title="For streams with an emphasis on the production of video documenting the playthrough of a game"]')
    const letsPlayTag:By = By.css('button[data-a-target="form-tag-Let\'s Play"]')
    const currentSort:By = By.xpath("//button[@data-a-target='browse-sort-menu']/div/div/div[contains(@class, 'tw-flex')]")
    const sortSelectToggle:By = By.className('tw-core-button-label--dropdown')
    const sortViewerCount:By = By.css('[data-test-selector="directory-channel-sort-VIEWER_COUNT"]')
    const firstChannel:By = By.xpath('//div[@data-target="directory-first-item"]//h3')
    const channelInfo:By = By.className('channel-info-content')
    const channelTitle:By = By.tagName('h1')

    beforeEach(async()=>{
        driver.get('https://www.twitch.tv')
        await driver.wait(until.elementLocated(menuOptionBrowse))
    })

    it('logs the current most popular channel, and makes sure the title matches', async()=>{
        await driver.wait(until.elementsLocated(popularChannels))
        const channels: WebElement[] = await driver.findElements(popularChannels)
        const channelName = await channels[0].getText()
        await channels[0].click()
        await driver.wait(until.elementLocated(channelInfo))
        await setTimeout(()=>{}, 1000) //probably not the cleanest option, but it works :)
        expect(channelName).toEqual(await (await driver.findElement(channelTitle)).getText())
    })

    it('launches the most popular "Let\'s Play" stream', async()=>{
        await (await driver.findElement(menuOptionBrowse)).click()
        await driver.wait(until.elementLocated(tagSearchBar))
        await (await driver.findElement(tagSearchBar)).sendKeys("Let's Play")
        await driver.wait(until.elementLocated(letsPlayOption))
        await (await driver.findElement(letsPlayOption)).click()
        await driver.wait(until.elementLocated(letsPlayTag))
        await driver.wait(until.elementLocated(firstChannel))
        await (await driver.findElement(sortSelectToggle)).click()
        await driver.wait(until.elementLocated(sortViewerCount))
        await (await driver.findElement(sortViewerCount)).click()
        await driver.wait(until.elementTextContains(await driver.findElement(currentSort), "High to Low"))
        await (await driver.findElement(firstChannel)).click()
        await driver.wait(until.elementLocated(channelInfo))
        console.log(`The most popular channel right now tagged "Let's Play" is: ${await (await driver.findElement(channelTitle)).getText()}`)
    })

    afterAll(async()=>{
        driver.quit()
    })
})
```

</details>

## Black Diamond Challenge

For a real challenge, try this out:

- Pick a popular site, like Twitch, Amazon, Buzzfeed, etc.
- Choose a use case of the site (i.e. finding a streamer for a game, shopping for clothes, taking a poll)
- Following the Page Object Model, create all the pages you'd need for that use case
- Automate an E2E (end to end) test following that use case

## Resources

## Contributions

If you see a problem or a typo, please fork, make the necessary changes, and create a pull request so we can review your changes and merge them into the master repo and branch.

## Copyright

© Devmountain LLC, 2020. Unauthorized use and/or duplication of this material without express and written permission from Devmountain, LLC is strictly prohibited. Excerpts and links may be used, provided that full and clear credit is given to Devmountain with appropriate and specific direction to the original content.

<p align="center">
<img src="https://s3.amazonaws.com/devmountain/readme-logo.png" width="250">
</p>
```
