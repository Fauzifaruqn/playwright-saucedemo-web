import base from '@playwright/test';

import { Component } from '../../pageObject/component/components';
export const test = base.extend<{
    component: Component

}>({
    component: async ({page}, use) => {
        await use(new Component(page))
    }
})

export const expect = base.expect;