import BasePage from './BasePage'
import { WebDriver, By } from 'selenium-webdriver';

export default class ResultsPage extends BasePage {
    movieResults: By
    peopleResults: By
    keywordResults: By
    companyResults: By
    constructor(driver: WebDriver) {
        super(driver);
        this.movieResults = By.xpath('//h3[contains(text(), "Titles")]/..//td[@class="result_text"]/a');
        this.peopleResults = By.xpath('//h3[contains(text(), "Names")]/..//td[@class="result_text"]/a');
        this.keywordResults = By.xpath('//h3[contains(text(), "Keywords")]/..//td[@class="result_text"]/a');
        this.companyResults = By.xpath('//h3[contains(text(), "Companies")]/..//td[@class="result_text"]/a');
    }
    async getMovieResults() {
        let movies = []
        let elements = await this.getElements(this.movieResults)
        for (let i = 0; i < elements.length; i++) {
            movies.push(await elements[i].getText())
        }
        return movies
    }
    async getPeopleResults() {
        let people = []
        let elements = await this.getElements(this.peopleResults)
        for (let i = 0; i < elements.length; i++) {
            people.push(await elements[i].getText())
        }
        return people
    }
    async getKeywordResults() {
        let keywords = []
        let elements = await this.getElements(this.keywordResults)
        for (let i = 0; i < elements.length; i++) {
            keywords.push(await elements[i].getText())
        }
        return keywords
    }
    async getCompanyResults() {
        let companies = []
        let elements = await this.getElements(this.companyResults)
        for (let i = 0; i < elements.length; i++) {
            companies.push(await elements[i].getText())
        }
        return companies
    }
    async clickMovieByIndex(index:number){
        await (await this.getElements(this.movieResults))[index].click()
    }
    async clickPersonByIndex(index:number){
        await (await this.getElements(this.peopleResults))[index].click()
    }
    async clickKeywordByIndex(index:number){
        await (await this.getElements(this.keywordResults))[index].click()
    }
    async clickCompanyByIndex(index:number){
        await (await this.getElements(this.companyResults))[index].click()
    }
}