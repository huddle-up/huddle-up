# Huddle Up

This is the monorepo for HuddleUp.

## Development

### Installation

```sh
# Install dependencies and bootstrap packages
yarn
yarn bootstrap
```

### Commands

`yarn bootstrap` calls lerna to install all dependencies and link packages.

`yarn clean` removes all `node_modules` from dependencies.

`yarn start` starts the API and the frontend locally.

`yarn build` builds all packages for production.

`yarn test` runs tests in all packages.

`yarn test:cov` runs test and generates test coverage reports.

`yarn lint` lints all packages, use `yarn lint:fix` to fix errors.

`yarn format` formats all packages.
