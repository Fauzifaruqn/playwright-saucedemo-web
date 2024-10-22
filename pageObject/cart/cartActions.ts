import { CartLocator } from "./cartLocators";
import { Page } from "@playwright/test";

export class CartAction {
    page: Page;
    cart: CartLocator;
    constructor(page: Page){
        this.page = page;
        this.cart = new CartLocator(page)
    }

    async clickCheckoutBtn(){
        await this.cart.getLocator('btnCheckout').click()
    }
}