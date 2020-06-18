import { WebDriver, By, until } from "selenium-webdriver";

export default class BasePage {
    driver: WebDriver
    url: string
    constructor(driver: WebDriver) {
        this.driver = driver
    }
    async navigate(){
        if(this.url == undefined || this.url == null)
            console.log('URL is undefined, unable to navigate.')
        else
            this.driver.get(this.url)
    }
    getDriver(){
        return this.driver
    }
    async quit(){
        await this.driver.quit()
    }
    async waitUntilVisible(elementBy: By) {
        await this.driver.wait(until.elementLocated(elementBy))
        let element = await this.driver.findElement(elementBy)
        await this.driver.wait(until.elementIsVisible(element))
    }
    async getElement(elementBy: By) {
        await this.waitUntilVisible(elementBy)
        return await this.driver.findElement(elementBy)
    }
    async getElements(elementBy: By) {
        await this.waitUntilVisible(elementBy)
        return await this.driver.findElements(elementBy)
    }
    async sendKeys(elementBy: By, keys: string) {
        await (await this.getElement(elementBy)).sendKeys(keys)
    }
    async getText(elementBy: By) {
        return await (await this.getElement(elementBy)).getText()
    }
    async click(elementBy: By){
        await (await this.getElement(elementBy)).click()
    }
    async getURL(){
        return await this.driver.getCurrentUrl()
    }
    async getTitle(){
        return await this.driver.getTitle()
    }
}