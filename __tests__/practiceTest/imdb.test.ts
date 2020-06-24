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