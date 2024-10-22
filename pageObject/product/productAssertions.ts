import { ProductLocator } from "./productLocators";
import {expect, Page} from '@playwright/test';

export class ProductAssertion {
    page: Page;
    product: ProductLocator
    constructor(page: Page){
        this.page = page;
        this.product = new ProductLocator(page);
    }

    async verifyUserNavigateToProductPage(){
        await expect(this.page,'Verify in Product Page contains URL "/inventory.html"').toHaveURL(/.*inventory.html/)
        const cartEmpty = await this.product.getLocator('cart')
        await expect(cartEmpty,'Default Cart should be empty').toHaveText(''); 
    }

    async verifySortingByPrice(order: 'LowToHigh' | 'HighToLow') {
        const priceLocator = this.product.getLocator('allPriceInventory');
        const priceTexts = await priceLocator.allTextContents();
    
        // Convert price texts to float numbers (removing the '$' sign)
        const prices = priceTexts.map(text => parseFloat(text.replace('$', '')));
    
        for (let i = 0; i < prices.length - 1; i++) {
            if (order === 'LowToHigh') {
                expect(prices[i], `Inventory Price ${prices[i]} To be less than or Equal Inventory price  ${prices[i + 1]}`).toBeLessThanOrEqual(prices[i + 1]);  // Check if prices are in ascending order
            } else {
                expect(prices[i],`Inventory Price ${prices[i]} To be greter than or Equal Inventory price  ${prices[i + 1]}`).toBeGreaterThanOrEqual(prices[i + 1]);  // Check if prices are in descending order
            }
        }
    }

    async verifySortingName(order: 'AZ' | 'ZA') {
        const nameLocator = this.product.getLocator('inventoryName');
        const nameTexts = await nameLocator.allTextContents();
    
        const sortedNames = [...nameTexts].sort((a, b) => {
            return order === 'AZ' ? a.localeCompare(b) : b.localeCompare(a);
        });
    
        expect(nameTexts).toEqual(sortedNames);
    }

    
}