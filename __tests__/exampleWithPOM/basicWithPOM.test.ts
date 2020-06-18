import getDriver from './utils/driverBuilder'
import HomePage from './pages/HomePage';
import ResultsPage from './pages/ResultsPage';
import MoviePage from './pages/MoviePage';

describe('IMDb', () => {
    var home: HomePage
    var results: ResultsPage
    var movie: MoviePage
    beforeAll(async () => {
        home = new HomePage(getDriver('chrome'))
        results = new ResultsPage(home.getDriver())
        movie = new MoviePage(home.getDriver())
    })
    beforeEach(async () => {
        await home.navigate()
        await home.waitUntilAppLoaded()
    })

    it('loads correctly', async () => {
        expect(await home.getTitle()).toContain('IMDb');
    })

    it('finds Independence Day', async () => {
        await home.search('Independence Day')
        await results.clickMovieByIndex(0)
        const title = await movie.getTitle()
        const year = await movie.getYear()
        const rating = await movie.getRating()
        expect(title).toEqual('Independence Day')
        expect(year).toEqual('1996')
        expect(rating).toBeGreaterThan(5)
    })

    it('rates TESB higher than TLJ', async ()=> {
        await home.search('The Empire Strikes Back')
        await results.clickMovieByIndex(0)
        const tesbRating = await movie.getRating()
        await home.search('The Last Jedi')
        await results.clickMovieByIndex(0)
        const tljRating = await movie.getRating()
        expect(tesbRating).toBeGreaterThan(tljRating)
    })

    afterAll(async () => {
        await home.quit();
    })
})