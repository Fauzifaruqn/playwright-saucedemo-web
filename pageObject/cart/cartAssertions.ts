import { CartLocator } from './cartLocators';
import {expect, Page} from '@playwright/test';

export class CartAssertion {
    page: Page;
    cart: CartLocator
    constructor(page: Page){
        this.page = page;
        this.cart = new CartLocator(page);
    }
    async verifyItemsInCart(expectedItems: { inventory_name: string, inventory_description: string, inventory_price: string }[]) {
        const cartItemsLocator = this.page.locator('.cart_item');
    
        // Ensure the number of items in the cart matches the expected count
        const cartItemCount = await cartItemsLocator.count();
        expect(cartItemCount,`Total Inventory added to cart is : ${expectedItems.length} `).toBe(expectedItems.length);
    
        for (const expectedItem of expectedItems) {
            // Find the locator for the current expected item based on its name

            const currentItemLocator = cartItemsLocator.locator(`//div[contains(@class,'inventory_item_name') and contains(text(),'${expectedItem.inventory_name}')]`);
        
            await expect(currentItemLocator,`Selected Inventory name: ${expectedItem.inventory_name}`).toContainText(`${expectedItem.inventory_name}`);
    
            // Verify the description
            const descriptionLocator = this.page.locator(`//div[contains(@class,'inventory_item_name') and contains(text(),'${expectedItem.inventory_name}')]/parent::a/following-sibling::div[contains(@class,'inventory_item_desc')]`); // Adjust according to your HTML structure
            const actualDescription = await descriptionLocator.textContent();
            expect(actualDescription,`Contains Description : ${expectedItem.inventory_description}`).toBe(expectedItem.inventory_description);
    
            // Verify the price
            const priceLocator = this.page.locator(`//div[contains(@class,'inventory_item_name') and contains(text(),'${expectedItem.inventory_name}')]/parent::a/following-sibling::div[contains(@class,'item_pricebar')]/descendant::div`); // Adjust according to your HTML structure
            const actualPrice = await priceLocator.textContent();
            expect(actualPrice,`Contains Price : ${expectedItem.inventory_price}`).toBe(expectedItem.inventory_price);
        }
    }
    
}