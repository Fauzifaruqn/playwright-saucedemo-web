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

