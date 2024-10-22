import {Page} from '@playwright/test';

export class CartLocator {
    page: Page;
    locators: Record<string, ReturnType<Page['locator']>>;


    constructor(page: Page){
        this.page = page;
        this.locators = {
          btnCheckout: page.getByRole('button',{ name: 'Checkout' }),
        }
    }

    getLocator(locatorName: keyof typeof this.locators) {
        return this.locators[locatorName];
    }
}