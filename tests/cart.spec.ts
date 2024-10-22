import {test} from '../utils/fixture/allFixture'
const testData = JSON.parse(JSON.stringify(require('../data/sauce_demo.json')))


test.beforeEach(async ({loginAction, loginAssertion}) => {
    await test.step('Given User should navigate to swag labs login page', async () => {
        await loginAction.navigateToWeb()
        await loginAssertion.verifyuserNavigateToLoginPage()
    })
    await test.step('When user input correct username and password and click login button', async () => {
        await loginAction.loginForm(testData.user.standard_user.username, testData.user.standard_user.password)
    })
})

test.describe('Cart Swag Lab', () => {
    test('User should be able to see added item in my shopping cart page', {
        tag: ["@p1", "@cart"],
      }, async ({
        productAssertion,
        productAction,
        component,
        cartAssertion
    }) => {
        await test.step('User should navigate to Swag Labs Product page', async () => {
            await productAssertion.verifyUserNavigateToProductPage()
        })
        await test.step('User add an inventory to cart', async() => {
            await productAction.toggleProductInCart(testData.inventory.inventory1,'Add')
            await productAction.toggleProductInCart(testData.inventory.inventory3,'Add')
            await productAction.verifyCartBadgeCount(2);
        })

        await test.step('User go to cart page to check added item', async () => {
            await component.navigateToCartPage()
        })
        await test.step('Verify added items are visible and correct in the cart', async () => {
            await cartAssertion.verifyItemsInCart([
                testData.inventory.inventory1,
                testData.inventory.inventory3
            ]);
        });
    }

)
})