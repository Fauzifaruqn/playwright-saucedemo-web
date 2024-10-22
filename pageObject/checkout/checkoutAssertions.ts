import { CheckoutLocator } from './checkoutLocators';
import { expect, Page } from '@playwright/test';
import testData from '../../data/sauce_demo.json'; // Ensure you import your test data

export class CheckoutAssertion {
    page: Page;
    checkout: CheckoutLocator;

    constructor(page: Page) {
        this.page = page;
        this.checkout = new CheckoutLocator(page);
    }

    async verifyOrder(inventoryItems: any[]) {
        const itemPrices = await Promise.all(
            inventoryItems.map(item => this.getPrice(item))
        );
    
        const subtotalValue = itemPrices.reduce((acc, price) => {
            const numericPrice = price ? parseFloat(price.replace('$', '')) : 0; // Handle null values here
            return acc + numericPrice;
        }, 0).toFixed(2);
    
        const taxValue = (parseFloat(subtotalValue) * 0.08).toFixed(2); // Assuming tax is 8%
        const totalValue = (parseFloat(subtotalValue) + parseFloat(taxValue)).toFixed(2); // Assuming flat shipping cost of $2.99
    
        // Assert shipping value
        // await expect(this.page.locator('[data-test="shipping-info-value"]')).toHaveText('$2.99');
    
        // Assert subtotal
        await expect(this.page.locator('[data-test="subtotal-label"]'),`Sub Total : ${subtotalValue}`).toHaveText(`Item total: $${subtotalValue}`);
    
        // Assert tax
        await expect(this.page.locator('[data-test="tax-label"]'),`Tax: ${taxValue} `).toHaveText(`Tax: $${taxValue}`);
    
        // Assert total
        await expect(this.page.locator('[data-test="total-label"]'), `Total Value : ${totalValue}`).toHaveText(`Total: $${totalValue}`);
    }
    

    async getPrice(item: any) {
        const priceLocator = this.page.locator(`//div[contains(@class,'inventory_item_name') and contains(text(),'${item.inventory_name}')]/parent::a/following-sibling::div[contains(@class,'item_pricebar')]/descendant::div`);
        const priceText = await priceLocator.textContent();
        return priceText ? priceText : '$0.00'; // Return '$0.00' if priceText is null
    }

    async verifyFinishCheckout(){
        await expect(this.checkout.getLocator('completeHeader'), "Header Complete checkout should be visible").toBeVisible()
        await expect(this.checkout.getLocator('completText'),'Contains Text: Your order has been dispatched, and will arrive just as fast as the pony can get there!').toContainText("Your order has been dispatched, and will arrive just as fast as the pony can get there!")
        await expect(this.page,'Verify in Checkout Page contains URL "/checkout-complete.html"').toHaveURL(/.*checkout-complete.html/)
    }
}
