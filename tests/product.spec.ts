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


test.describe('Produc Swag Lab', () => {
    test('Check whether product sort option low to high is working correctly', async (
        {
        productAssertion,
        productAction
        }) => {
        await test.step('User should navigate to Swag Labs Product page', async () => {
            await productAssertion.verifyUserNavigateToProductPage()
        })
        await test.step('User Select Low To High Sorting', async() => {
            await productAction.selectSortingProduct('Price (low to high)')

        })
        await test.step('Verify if inventory sorting correctly from low to high price', async() => {
            await productAssertion.verifySortingByPrice('LowToHigh')
        })
    })  

    test('Check whether product sort option high to low is working correctly', async (
        {
        productAssertion,
        productAction
        }) => {
        await test.step('User should navigate to Swag Labs Product page', async () => {
            await productAssertion.verifyUserNavigateToProductPage()
        })
        await test.step('User Select Low To High Sorting', async() => {
            await productAction.selectSortingProduct('Price (high to low)')

        })
        await test.step('Verify if inventory sorting correctly from high to low price', async() => {
            await productAssertion.verifySortingByPrice('HighToLow')
        })
    })  

    test('Check whether product sort option AZ is working correctly', async (
        {
        productAssertion,
        productAction
        }) => {
        await test.step('User should navigate to Swag Labs Product page', async () => {
            await productAssertion.verifyUserNavigateToProductPage()
        })
        await test.step('User Select Sort Option Name (A to Z)', async() => {
            await productAction.selectSortingProduct('Name (A to Z)')

        })
        await test.step('Verify if inventory sorting correctly from Name A to Z', async() => {
            await productAssertion.verifySortingName('AZ')
        })
    })  

    test('Check whether product sort option ZA is working correctly', async (
        {
        productAssertion,
        productAction
        }) => {
        await test.step('User should navigate to Swag Labs Product page', async () => {
            await productAssertion.verifyUserNavigateToProductPage()
        })
        await test.step('User Select Sort Option Name (Z to A)', async() => {
            await productAction.selectSortingProduct('Name (Z to A)')

        })
        await test.step('Verify if inventory sorting correctly from Name A to Z', async() => {
            await productAssertion.verifySortingName('ZA')
        })
    })  

    test('Check user should be able to add an inventory to the cart', async (
        {
        productAssertion,
        productAction
        }) => {
        await test.step('User should navigate to Swag Labs Product page', async () => {
            await productAssertion.verifyUserNavigateToProductPage()
        })
        await test.step('User add an inventory to cart', async() => {
            await productAction.toggleProductInCart(testData.inventory.inventory1,'Add')
            await productAction.toggleProductInCart(testData.inventory.inventory3,'Add')
            await productAction.verifyCartBadgeCount(2);
        })
       
    })  

    test('Check user should be able to remove an inventory to the cart', async (
        {
        productAssertion,
        productAction
        }) => {
        await test.step('User should navigate to Swag Labs Product page', async () => {
            await productAssertion.verifyUserNavigateToProductPage()
        })
        await test.step('User add an inventory to cart', async() => {
            await productAction.toggleProductInCart(testData.inventory.inventory1,'Add')
            await productAction.toggleProductInCart(testData.inventory.inventory3,'Add')
        })
  
        await test.step('Verify the cart badge count and button state', async () => {
            await productAction.verifyCartBadgeCount(); // Ensure cart count is 1
            await productAction.toggleProductInCart(testData.inventory.inventory1,'Remove')
            await productAction.verifyCartBadgeCount();
           // Ensure 'Remove' button for remaining item
        });
    })  
})