import base from '@playwright/test';

import { CartAction } from '../../pageObject/cart/cartActions';
import { CartAssertion } from '../../pageObject/cart/cartAssertions';
export const test = base.extend<{
    cartAction: CartAction,
    cartAssertion: CartAssertion

}>({
    cartAction: async ({page}, use) => {
        await use(new CartAction(page))
    },
    cartAssertion: async ({page}, use) => {
        await use(new CartAssertion(page))
    }
})

export const expect = base.expect;