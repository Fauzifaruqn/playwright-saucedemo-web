import {Page} from '@playwright/test';

export class ProductLocator {
    page: Page;
    locators: Record<string, ReturnType<Page['locator']>>;


    constructor(page: Page){
        this.page = page;
        this.locators = {
            titlePage: page.getByText('Swag Labs'),
            sorting: page.locator('[data-test="product-sort-container"]'),
            cart: page.locator('[data-test="shopping-cart-link"]'),
            allPriceInventory: page.locator('div.inventory_item_price[data-test="inventory-item-price"]'),
            inventoryName: page.locator('div.inventory_item_name[data-test="inventory-item-name"]')
        }
    }

    getLocator(locatorName: keyof typeof this.locators) {
        return this.locators[locatorName];
    }
}