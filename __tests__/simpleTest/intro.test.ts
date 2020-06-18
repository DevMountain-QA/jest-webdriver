import { Builder, Capabilities, By, until } from 'selenium-webdriver'

describe('google', () => {

    const driver = new Builder()
        .withCapabilities(Capabilities.chrome())
        .build()

    it('can do searches', async () => {
        await driver.get('https://www.google.com');
        var searchBar = await driver.findElement(By.name('q'))
        await searchBar.sendKeys('Devmountain\n')
        var results = await (await driver.findElement(By.id('res'))).getText()
        expect(results).toContain('Devmountain')
    })

    afterAll(async () => {
        await driver.quit()
    })
})