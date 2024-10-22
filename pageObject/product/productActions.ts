import { ProductLocator } from "./productLocators";
import { Component } from "../component/components";
import {Page, test, expect} from '@playwright/test';

export class ProductAction {
    private cartCount: number = 0;
    page: Page;
    product: ProductLocator;
    component: Component;
    constructor(page: Page){
        this.page = page;
        this.product = new ProductLocator(page)
        this.component = new Component(page)
    }

    async selectSortingProduct(sortBy: string){
        await this.page.locator(".product_sort_container").selectOption({label: sortBy })
    }

    async toggleProductInCart(inventory: {inventory_name: string}, action: 'Add' | 'Remove') {
        const productName = inventory.inventory_name; 
        const addButtonLocator = `button[data-test="add-to-cart-${productName.toLowerCase().replace(/ /g, '-')}"]`;
        const removeButtonLocator  = `button[data-test="remove-${productName.toLowerCase().replace(/ /g, '-')}"]`;
    
        await test.step(`User ${action} an inventory : ${productName}`, async () => {
            if (action === 'Add') {
                const isAddButtonVisible = await this.page.locator(addButtonLocator).isVisible();
                if (isAddButtonVisible) {
                    await this.page.click(addButtonLocator);
                    this.cartCount++;
                    await expect(this.page.locator(removeButtonLocator), `The 'Remove' button for ${productName} should be visible`).toBeVisible();
                }
            } else if (action === 'Remove') {
                const isRemoveButtonVisible = await this.page.locator(removeButtonLocator).isVisible();
                if (isRemoveButtonVisible) {
                    await this.page.click(removeButtonLocator);
                    this.cartCount--;
                    await expect(this.page.locator(addButtonLocator), `The 'Add' button for ${productName} should be visible`).toBeVisible();
                }
            }
        })
    }

    async verifyCartBadgeCount(expectedCount?: number) {
        const cartBadgeLocator = this.component.getLocator('cartBadge')
        
        // Determine the count to verify (use parameter if provided, else use internal cartCount)
        const countToVerify = expectedCount !== undefined ? expectedCount : this.cartCount;
    
        // If there are no items in the cart, ensure the badge doesn't exist
        if (countToVerify === 0) {
            await expect(cartBadgeLocator,'There is no inventory added to card').not.toBeVisible();
        } else {
            // If items are in the cart, check the badge count
            await expect(cartBadgeLocator,'Cart counter should be visible').toBeVisible(); // Ensure the badge is visible
            await expect(cartBadgeLocator,`Cart counter: ${countToVerify.toString()}`).toHaveText(countToVerify.toString()); // Check the badge text
            expect(this.cartCount,`Cart counter: ${countToVerify}`).toBe(countToVerify); // Compare the internal counter with the expected count
        }
    }

}