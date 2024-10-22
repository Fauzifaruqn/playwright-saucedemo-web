import {Page} from '@playwright/test';

export class CheckoutLocator {
    page: Page;
    locators: Record<string, ReturnType<Page['locator']>>;


    constructor(page: Page){
        this.page = page;
        this.locators = {
            fieldFirstName: page.getByPlaceholder('First Name'),
            fieldLastName: page.getByPlaceholder('Last Name'),
            fieldPostalCode: page.getByPlaceholder('Zip/Postal Code'),
            btnContinue: page.getByRole('button',{name: 'Continue'}),
            paymentInfoValue: page.locator('[data-test="payment-info-value"]'),
            shippingValue: page.locator('[data-test="shipping-info-value"]'),
            subTotal: page.locator('[data-test="subtotal-label"]'),
            tax: page.locator('[data-test="tax-label"]'),
            total: page.locator('[data-test="total-label"]'),
            finishButton: page.locator('[data-test="finish"]'),
            completeHeader: page.locator('[data-test="complete-header"]'),
            completText: page.locator('[data-test="complete-text"]'),
            completeCheckout : page.locator('[data-test="pony-express"]')
        }
    }

    getLocator(locatorName: keyof typeof this.locators) {
        return this.locators[locatorName];
    }
}