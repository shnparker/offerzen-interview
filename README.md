# Offerzen Technical Assessment Submission

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).
The defaults of CRA have been extended with Craco to enable Tailwind support without having to eject to edit the postcss config.
Default ESLint rules of CRA have also been overridden.

Notes:
Tailwind is running in PostCSS 7 compatability mode, as CRA does not yet support PostCSS 8 (https://github.com/facebook/create-react-app/issues/9664)
Please do not update the packages for autoprefixer or postcss until CRA supports them.
Tailwind has a huge css bundle, but uses purgeCSS to reduce it to a couple of KB on production build (don't panic if you see the network log on development mode).

## Available Features

- All features requested in spec
- Fully written in TypeScript
- Code quality via ESLint and Prettier
- Improved version of the offerzen sign in screen
- Authentication system with remember me functionality
  - `usermame: demo@offerzen.com`
  - `password: password`
- Routing by react-router-dom v6 beta
- Small and simple custom component library
- Fully responsive designs
- TailwindCSS utility-first appraoch design
- Sentry logging for unhandled exceptions and mishandled API calls
- Simulated data fetching with mocked backend via MirageJS
- Query caching via react-query and wrapper hooks for async operations
- Snackbar system to provide user feedback
- Webpack chunking via lazy importing
- Formik + Yup form validation and form submissions (demonstration purposes in the sign in screen)
- Web Vitals reporting to console
- Favicon :P

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### `yarn lint`

Runs the code linting tool in inspection mode only, no corrections (fixes for linting can be subjective)

### `yarn format`

Runs the code formatter with write mode enabled to ensure opinionated code standards

### `yarn test`

Launches the test runner in the interactive watch mode.\

### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

### `yarn eject`

Ejects the CRA app
