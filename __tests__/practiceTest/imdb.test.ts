import getDriver from './driverBuilder'
import { By, until, WebDriver } from 'selenium-webdriver';

describe('IMDb', () => {
    const driver: WebDriver = getDriver('chrome');
    const searchBar: By = By.name('q');
    const titleResults: By = By.xpath('//h3[contains(text(), "Titles")]/..//td[@class="result_text"]/a');
    const movieTitle: By = By.css('.title_wrapper > h1');

    beforeEach(async () => {
        await driver.get('https://www.imdb.com');
    })

    it('loads correctly', async () => {
        expect(await driver.getTitle()).toContain('IMDb');
    })

    it('finds Independence Day', async () => {
        await driver.wait(until.elementLocated(searchBar));
        await (await driver.findElement(searchBar)).sendKeys('Independence Day\n');
        await driver.wait(until.elementLocated(titleResults));
        const results = await driver.findElements(titleResults);
        await results[0].click();
        await driver.wait(until.elementLocated(movieTitle));
        expect(await (await driver.findElement(movieTitle)).getText()).toEqual('Independence Day (1996)')
    })

    afterAll(async () => {
        await driver.quit();
    })
})