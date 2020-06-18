import BasePage from './BasePage'
import { WebDriver, By } from 'selenium-webdriver';

export default class HomePage extends BasePage{
    searchBar:By;
    constructor(driver:WebDriver){
        super(driver)
        this.url = "https://www.imdb.com"
        this.searchBar = By.name('q')
    }
    async search(text:string){
        await this.sendKeys(this.searchBar, `${text}\n`);
    }
    async waitUntilAppLoaded(){
        await this.waitUntilVisible(this.searchBar)
    }
}