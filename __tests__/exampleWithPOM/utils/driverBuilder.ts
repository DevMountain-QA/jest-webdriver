import { Builder, Capabilities, By, until, WebDriver } from 'selenium-webdriver'

export default function getDriver(browser: string) {
    switch (browser.toLowerCase()) {
        case ("firefox"):
            return new Builder()
                .withCapabilities(Capabilities.firefox())
                .build()
        default:
            return new Builder()
                .withCapabilities(Capabilities.chrome())
                .build()
    }

}