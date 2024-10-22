import { Page } from "@playwright/test";

export class LoginLocator {
    page: Page;
    locators: Record<string, ReturnType<Page['locator']>>;

    constructor(page: Page) {
        this.page = page;
        this.locators = {
            uname: page.getByPlaceholder('Username'),
            password: page.getByPlaceholder('Password'),
            loginButton: page.getByRole('button', { name: 'Login' }),
            listLoginCredential: page.locator("[data-test='login-credentials']"),
            listDataPassword: page.locator('[data-test="login-password"]'),
            MsgFailedLogin: page.locator("//div[contains(@class,'error-message-container')]/descendant::h3[contains(text(),'Epic sadface')]"),
            containerFailedLogin: page.locator("//div[contains(@class,'error-message-container')]")
        };
    }

    getLocator(locatorName: keyof typeof this.locators) {
        return this.locators[locatorName];
    }
}
