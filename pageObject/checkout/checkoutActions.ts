// import { CartLocator } from "./cartLocators";
import { CheckoutLocator } from "./checkoutLocators";
import { Page } from "@playwright/test";

export class CheckoutAction {
    page: Page;
    checkout: CheckoutLocator;
    constructor(page: Page){
        this.page = page;
        this.checkout = new CheckoutLocator(page)
    }

    async fillCheckoutFormAndContinue(firstName: string, lastName: string, postalCode:string){
        await this.checkout.getLocator('fieldFirstName').fill(firstName)
        await this.checkout.getLocator('fieldLastName').fill(lastName)
        await this.checkout.getLocator('fieldPostalCode').fill(postalCode)
        await this.checkout.getLocator('btnContinue').click()
    }

    async finihCheckoutPage(){
        await this.checkout.getLocator('finishButton').click()

        
    }


    
}