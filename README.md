# Front-end

## Structure

```
.
├── /.github/workflows       # Github CI/CD configuration script
├── /.storybook              # Storybook configuration
├── /node_modules            # 3rd-party packages
├── /public                  # Static assets to be served
├── /src                     # Application source code
│   ├── /app                 # Pages Router
│   │   ├── layout.tsx       # Shared layout for all pages
│   │   ├── not-found.tsx          # Error handler for unknown routes
│   │   ├── 500.tsx          # Error handler for 500 error
│   │   ├── /api/auth/       # NextAuth.js route
│   │   └── /*               # Routes
|   |── /asets               # Custom styles
│   ├── /components          # React components
|   |── /core                # Root store for reducers
│   ├── /screens             # Validation functions
│   ├── /source              # Functions for communication with back-end API
│   ├── /store               # Redux Toolkit store files
│   └── /types               # TS types
├── /tutorials               # Project tutorials
├── .env                     # Project environment variables
├── .env.example             # Template for project environment variables file
├── .env.local               # Project environment variables for local development
├── .eslintrc.json           # ESLint configuration
├── .gitignore               # Git files and folders to ignore
├── .prettierrc.json         # Prettier configuration
├── middleware.ts            # Next.js Middleware with NextAuth.js to secure protected routes
├── next.config.mjs          # Configuration file for Next.js
├── next-env.d.ts            # TypeScript declaration file for Next.js
├── package.json             # Project dependencies and scripts
feature
└── tsconfig.json            # TS compiler config
```

## Overview

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).
It uses [Prime React](https://primereact.org/installation/) UI components for React, [Prime Flex](https://primeflex.org/installation) CSS utility library featuring various helpers such as a grid system, flexbox, spacing, elevation and more., [Formik](https://formik.org/), and [Redux Toolkit](https://redux-toolkit.js.org/).

This project is written in [TypeScript](https://www.typescriptlang.org).

## Configuration

Environment variables are [managed by Next](https://nextjs.org/docs/app/building-your-application/configuring/environment-variables#environment-variable-load-order).

The `development` and `production` values of the `NODE_ENV` NodeJS environment variable are used to enable\disable additional debugging features.

Environment variables are looked up in the following places, in order, stopping once the variable is found.

1. `process.env`
2. `.env.$(NODE_ENV).local`
3. `.env.local` (Not checked when `NODE_ENV` is `test`.)
4. `.env.$(NODE_ENV)`
5. `.env`

For example, if `NODE_ENV` is `development` and you define a variable in both `.env.development.local` and `.env`, the value in `.env.development.local` will be used.

If the environment variable `NODE_ENV` is unassigned, Next.js automatically assigns `development` when running the `next dev command`, or `production` for all other commands.

## Documentation

To view the project documentation for developers

- check the `tutorials` folder in the project
- Start the local Storybook with the command `npm run build-storybook`

## Developing

The default package manager is [npm](https://docs.npmjs.com/).

Source files are formatted by [Prettier](https://prettier.io/).

Code are linted by [ESLint v8](https://eslint.org/).

### Clone and install dependencies

```
git clone git@github.com:solvworld/web-react.git
cd web-react
npm i
```

### Running in development mode

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

### Build the production bundle

```
npm run build
```

### Start project in production mode

```
npm run start
```

### Check code by linter

```
npm run lint
```

### Automatically check and fix source code with Prettier

```
npm run prettier
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### Store debug

To debug the Redux Toolkit store you can use the [Redux DevTools](https://github.com/reduxjs/redux-devtools).

_Note: It works in development mode only._
