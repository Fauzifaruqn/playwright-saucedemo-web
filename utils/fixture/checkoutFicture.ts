import base from '@playwright/test';

import { CheckoutAction } from '../../pageObject/checkout/checkoutActions';
import { CheckoutAssertion } from '../../pageObject/checkout/checkoutAssertions';
export const test = base.extend<{
    checkoutAction: CheckoutAction,
    checkoutAssertion: CheckoutAssertion

}>({
    checkoutAction: async ({page}, use) => {
        await use(new CheckoutAction(page))
    },
    checkoutAssertion: async ({page}, use) => {
        await use(new CheckoutAssertion(page))
    }
})

export const expect = base.expect;