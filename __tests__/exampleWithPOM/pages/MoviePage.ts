import BasePage from './BasePage' 
import { WebDriver, By } from "selenium-webdriver";

export default class MoviePage extends BasePage{
    title:By
    year:By
    rating:By
    constructor(driver:WebDriver){
        super(driver);
        this.title = By.css('.title_wrapper > h1')
        this.year = By.id('titleYear')
        this.rating = By.css('span[itemprop=ratingValue]')
    }
    async getTitle(){
        let text:string = await this.getText(this.title)
        return text.slice(0, text.indexOf(await this.getText(this.year))).trim()
    }
    async getYear(){
        let text:string = await this.getText(this.year)
        return text.substring(1, text.length - 1)
    }
    async getRating(){
        return Number(await this.getText(this.rating))
    }
}