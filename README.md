# Offerzen Technical Assessment Submission

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).
It also includes extended CRA configs to enable Tailwind support without having to eject to edit the postcss config.
Formatting and linting provided by ESLint and Prettier - configs are overridden from the CRA defaults

**This project was developed honestly. All code written has been written by me and me alone.**
The project contains some additional features ontop of what was requested, in order to demonstrate capabilities. This may seem impossible to have coded all of this in 10-12 hours. A lot of the additional features have been copy pasted from a side project I am working on currently, such as the auth and the component lib.
If any doubt to integrity and honesty is questioned, I am happy to share access to the side project to prove all commits have been only mine.

Notes: Tailwind is running in PostCSS 7 compatability mode, as CRA does not yet support PostCSS 8 (it was held back due to normalize having to upgrade to postcss 8 first - https://github.com/facebook/create-react-app/issues/9664)

## Available Features

- Typescript for type safety
- Linting and formatting
- Auth system with remember me functionality
- TailwindCSS for beautiful components with a utility first approach
- Fully responsive design (apart from the table, this would have to be reworked entirely for mobile with stripped data display)
- Sentry logging for error boundaries catching unhandled exceptions
- API Calls have been mocked using MirageJS to simulate data fetching, with react-query wrappers being implemented around fetch to simplify async operations
- A Snackbar system has been implemented with react context to provide a nice feedback system
- A login screen was added just for fun, also to demonstrate webpack chunking with lazy loading of components.
  - `usermame: demo@offerzen.com`
  - `password: P@ssw0rd1!`
- Form handling provided by Formik with schema validation provided by Yup (on the auth screens for demonstration)
- Web vitals handled by CRA bootstrapping - they will be logged to console
- I implemented your favicon :P
- All features requested in spec

Note: The images provided in the spec show that the table is sortable by last_communicated. The job spec did not ask for this so I did not implement it, but if you want me to I am happy to.

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
