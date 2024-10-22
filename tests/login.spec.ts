import {test} from '../utils/fixture/allFixture'
const testData = JSON.parse(JSON.stringify(require('../data/sauce_demo.json')))


test.beforeEach(async ({loginAction, loginAssertion}) => {
    await test.step('Given User should navigate to swag labs login page', async () => {
        await loginAction.navigateToWeb()
        await loginAssertion.verifyuserNavigateToLoginPage()
    })
})


test.describe('Login to Swag lab page', () => {
    test('Check the login functionality with accepted usernames and passwords', async (
        {
        loginAction,
        loginAssertion,
        productAssertion
        }) => {
        
        await test.step('When user input correct username and password and click login button', async () => {
            await loginAction.loginForm(testData.user.standard_user.username, testData.user.standard_user.password)
        })
        await test.step('User should navigate to Swag Labs Product page', async () => {
            await productAssertion.verifyUserNavigateToProductPage()
        })
    })

    test('Check the login functionality with valid usernames and invalid passwords', async (
        {
        loginAction,
        loginAssertion
        }) => {
        await test.step('Given User should navigate to swag labs login page', async () => {
            await loginAction.navigateToWeb()
            await loginAssertion.verifyuserNavigateToLoginPage()
        })
        await test.step('When user input correct username but invalid password and click login button', async () => {
            await loginAction.loginForm(testData.user.standard_user.username, 'wrongpassword')
        })
        await test.step('User should not navigate to Swag Labs home page', async () => {
            await loginAssertion.verifyUserFailedLogin()
        })
    })

    test('Check the login functionality with invalid usernames and valid passwords', async (
        {
        loginAction,
        loginAssertion
        }) => {
        await test.step('Given User should navigate to swag labs login page', async () => {
            await loginAction.navigateToWeb()
            await loginAssertion.verifyuserNavigateToLoginPage()
        })
        await test.step('When user input correct username but invalid password and click login button', async () => {
            await loginAction.loginForm('wrongusername', testData.user.standard_user.password)
        })
        await test.step('User should not navigate to Swag Labs home page', async () => {
            await loginAssertion.verifyUserFailedLogin()
        })
    })

    test('Check the login functionality with blank username and password', async (
        {
        loginAction,
        loginAssertion
        }) => {
        await test.step('Given User should navigate to swag labs login page', async () => {
            await loginAction.navigateToWeb()
            await loginAssertion.verifyuserNavigateToLoginPage()
        })
        await test.step('When user blank username and password and click login button', async () => {
            await loginAction.validateLoginFields('', '',loginAssertion)
        })
    })

    test('Check the login functionality with blank username and some password', async (
        {
        loginAction,
        loginAssertion
        }) => {
        await test.step('Given User should navigate to swag labs login page', async () => {
            await loginAction.navigateToWeb()
            await loginAssertion.verifyuserNavigateToLoginPage()
        })
        await test.step('When user blank username and some password and click login button', async () => {
            await loginAction.validateLoginFields('', 'something',loginAssertion)
        })
    })

    test('Check the login functionality with some username and blank password', async (
        {
        loginAction,
        loginAssertion
        }) => {
        await test.step('Given User should navigate to swag labs login page', async () => {
            await loginAction.navigateToWeb()
            await loginAssertion.verifyuserNavigateToLoginPage()
        })
        await test.step('When user input correct username but blank password and click login button', async () => {
            await loginAction.validateLoginFields('somethig', '',loginAssertion)
        })
    })
})