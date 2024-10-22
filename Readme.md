## Swag Labs Test Automation Project
Project Overview
This project is an automation testing framework for Swag Labs' shopping and checkout functionality. It leverages Playwright to perform end-to-end tests such as adding products to the cart, verifying them, and completing the checkout process.

The tests are designed with the Page Object Model (POM) pattern for better maintainability and reusability. Test data is dynamically generated using Faker for filling out checkout forms.

### Folder Structure
The project follows a well-structured organization to separate concerns and responsibilities:

```bash
├── data/                   # Test data configurations (e.g., inventory details)
├── PageObject/              # Page Object Model (POM) files
│   ├── actions/             # Actions to interact with the web elements
│   ├── assertions/          # Assertions to verify page behavior
│   └── locators/            # Locators for web elements
├── test/                    # Contains all test cases (e.g., spec.ts)
├── utils/                   # Utilities for setup, fixtures, and other reusable components
│   ├── Fixture/             # Contains fixtures for Playwright tests
│   ├── globalSetup.ts       # Global setup to configure the environment
│   └── support/             # Helper functions (e.g., Faker for generating data)
└── README.md   
```
### Prerequisites
Ensure that the following are installed:

- Node.js (version 14 or higher)
- Playwright (installed via npm)
- npm (Node package manager)

## Installation
 Clone the repository:

```bash
git clone <repo-url>
cd <repo-directory
```

 Install dependencies:

```bash
npm install
```

 Install Playwright Browsers:

```bash
npx playwright install
```

## How to Run Tests
* Run All Tests

```bash
npx playwright test
```

* Generate Test Report

```bash
npx playwright show-report
```

## CI/CD Documentation

### Workflow Overview
- Triggers:
    - Manual Dispatch (workflow_dispatch): The workflow can be triggered manually with an optional input for filtering tests by tag (e.g., @reservation).
    - Scheduled (cron): The workflow is scheduled to run every day at 2 AM.

```bash
name: End to End Tests - API
on:
  workflow_dispatch:
    inputs:
      tag:
        description: 'Tag for Playwright test grep (e.g., @reservation)'
        required: false
        default: ''
  schedule:
    - cron: '00 2 * * *'
```
- Jobs
The job tests executes the Playwright tests in the following steps:

* **Checkout the Repository**: Uses actions/checkout@v3 to pull the code from the repository.

* **Setup Node.js**: Sets up Node.js version 18 using actions/setup-node@v3.

* **Install Dependencies:** Runs npm ci to install project dependencies.

* **Install Playwright Browsers:** Runs npx playwright install to install necessary browsers for Playwright tests.

* **Run Playwright Tests:**

    If a tag is provided via the manual dispatch (workflow_dispatch), tests matching the tag will be executed. Otherwise, all tests are executed.


* **Get Allure Report History:** Checks out the gh-pages branch to preserve previous test report history.

* **Generate Allure Report:** Uses the simple-elf/allure-report-action@master action to generate Allure test reports.

* **Deploy Allure Report to GitHub Pages**: Publishes the generated Allure report to GitHub Pages using peaceiris/actions-gh-pages@v3. This ensures that the test results are available publicly or privately via GitHub Pages.

