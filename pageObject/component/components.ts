import {expect, Page,test} from '@playwright/test';

export class Component {
    page: Page;
    locators: Record<string, ReturnType<Page['locator']>>;
    constructor(page: Page){
        this.page = page;
        this.locators = {
            cart: page.locator('[data-test="shopping-cart-link"]'),
            titlePage: page.getByText('Swag Labs'),
            hamburgerButton: page.locator("#react-burger-menu-btn"),
            cartBadge: page.locator('.shopping_cart_badge'),
            yourCartTitle: page.getByText('Your Cart'),
            btnCheckout: page.getByRole('button', { name: 'Checkout' })
        };
    }

    async verifyTitlePage(){
        await expect(this.locators.titlePage,'Verify if page contains title Swag Labs').toContainText('Swag Labs')
    }

    async navigateToCartPage(){
        await this.locators.cart.click()
        await expect(this.locators.yourCartTitle).toBeVisible()
        await expect(this.locators.btnCheckout).toBeVisible()
    }

    getLocator(locatorName: keyof typeof this.locators) {
        return this.locators[locatorName];
    }
}