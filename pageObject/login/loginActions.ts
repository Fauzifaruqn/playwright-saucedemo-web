import { LoginLocator } from "./loginLocators";
import {Page,test} from '@playwright/test';
import { LoginAssertion } from "./loginAssertions";

export class LoginAction {
    page: Page;
    login: LoginLocator
    constructor(page: Page){
        this.page = page;
        this.login = new LoginLocator(page)
    }

    async navigateToWeb(){
        await this.page.goto(process.env.BASE_URL as string)
    }

    async loginForm(username: string, password: string){
        await this.login.getLocator('uname').fill(username)
        await this.login.getLocator('password').fill(password)
        await this.login.getLocator('loginButton').click()
    }

    async validateLoginFields(username: string, password: string, loginAssertion: LoginAssertion) {

        await this.login.getLocator('uname').fill(username)
        await this.login.getLocator('password').fill(password)
        await this.login.getLocator('loginButton').click()
        
        const isUsernameEmpty = !username;
        const isPasswordEmpty = !password;

        if (isUsernameEmpty && isPasswordEmpty) {
            await loginAssertion.verifyUsernameRequired();  // Check for both empty fields
        } else if (isUsernameEmpty) {
            await loginAssertion.verifyUsernameRequired();  // Check for empty username
        } else if (isPasswordEmpty) {
            await loginAssertion.verifyPasswordRequired();  // Check for empty password
        } else {
            return true;  // Indicates that both fields are filled
        }

        return false;  // Indicates validation failed
    }
}