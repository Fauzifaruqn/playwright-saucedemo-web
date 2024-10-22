import base from '@playwright/test';

import { ProductAction } from '../../pageObject/product/productActions';
import { ProductAssertion } from '../../pageObject/product/productAssertions';
export const test = base.extend<{
    productAction: ProductAction,
    productAssertion: ProductAssertion

}>({
    productAction: async ({page}, use) => {
        await use(new ProductAction(page))
    },
    productAssertion: async ({page}, use) => {
        await use(new ProductAssertion(page))
    }
})

export const expect = base.expect;