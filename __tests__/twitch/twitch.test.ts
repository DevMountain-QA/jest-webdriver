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