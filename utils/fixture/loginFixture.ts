import base from '@playwright/test';

import { LoginAction } from '../../pageObject/login/loginActions';
import { LoginAssertion } from '../../pageObject/login/loginAssertions';

export const test = base.extend<{
    loginAction: LoginAction,
    loginAssertion: LoginAssertion

}>({
    loginAction: async ({page}, use) => {
        await use(new LoginAction(page))
    },
    loginAssertion: async ({page}, use) => {
        await use(new LoginAssertion(page))
    }
})

export const expect = base.expect;