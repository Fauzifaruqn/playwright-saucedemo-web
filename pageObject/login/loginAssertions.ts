import { LoginLocator } from "./loginLocators";
import {expect, Page} from '@playwright/test';

export class LoginAssertion {
    page: Page;
    login: LoginLocator
    constructor(page: Page){
        this.page = page;
        this.login = new LoginLocator(page);
    }

    async verifyuserNavigateToLoginPage(){
        await expect(this.login.getLocator('uname'),'Verify by Default field username should be empty').toBeEmpty()
        await expect(this.login.getLocator('password'),'Verify by Default field email should be empty').toBeEmpty()
        await expect(this.login.getLocator('password'),'Verify Password field should contains type password').toHaveAttribute('type','password')
        
    }


    async verifyUserFailedLogin(){
        await expect(this.login.getLocator('MsgFailedLogin'),'Verify contains message : Epic sadface: Username and password do not match any user in this service').toHaveText('Epic sadface: Username and password do not match any user in this service')
        await expect(this.login.getLocator('containerFailedLogin'),'Background Container Failed login contains CSS: background-color #e2231a').toHaveCSS('background-color','rgb(226, 35, 26)')
        await expect(this.page,'Verify in should not contains URL "/inventory.html"').not.toHaveURL(/.*inventory.html/)

    }

    async verifyUsernameRequired () {
        await expect(this.login.getLocator('containerFailedLogin'),'Failed Login: Username is required').toHaveText("Epic sadface: Username is required")
    }
    async verifyPasswordRequired(){
        await expect(this.login.getLocator('containerFailedLogin'),'Failed Login: Password is required').toHaveText("Epic sadface: Password is required")
    }
}