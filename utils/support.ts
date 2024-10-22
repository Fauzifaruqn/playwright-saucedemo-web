import { expect, Locator } from '@playwright/test';
import { faker } from '@faker-js/faker';

export async function assertCssContains(locator: Locator, cssProperty: string, expectedValue: string) {
    const cssValue = await locator.evaluate((element, prop) => {
        return window.getComputedStyle(element).getPropertyValue(prop);
    }, cssProperty);

    expect(cssValue).toContain(expectedValue);
}



export const generateCheckoutData = () => {
    return {
        firstName: faker.person.firstName(),
        lastName: faker.person.lastName(),
        postalCode: faker.location.zipCode(),
    };
};