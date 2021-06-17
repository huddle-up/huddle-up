
# HuddleUp

<p align="center">
  <img alt="HuddleUp Logo" src="./assets/huddleup-logo-bgwhite.svg">
</p>

<p align="center">A place to discuss, meet and get to know each other online</p>
<p align="center"><a target="_BLANK" href="https://huddle-up.github.io/handbook">Documentation & Guide</a></p>

---


## About HuddleUp

Learn more about HuddleUp in the [documentation](https://huddle-up.github.io/handbook).

---

## Development

This is the monorepository for HuddleUp, managed with [lerna](https://github.com/lerna/lerna).

### Structure

HuddleUp consists of two applications:

- The frontend / client (`apps/client`), implemented with React
- The backend / API (`apps/api`), implemented with NestJS

Both applications are written in TypeScript. The client interacts with the api through GraphQL.

### Requirements

To run HuddleUp locally, you need the following software installed:

- [Yarn v1.x](https://classic.yarnpkg.com)
- [Node.js v14+](https://nodejs.org)
- [PostgreSQL v11+](https://www.postgresql.org) with the [UUID extension](https://www.postgresql.org/docs/13/uuid-ossp.html) enabled
- Access to an OpenID Connect provider with credentials for local development ([Auth0](https://auth0.com) is a good fit)

We recommend using Visual Studio Code as an IDE.

### Installation

Create `.env` files for the client and the api in the respective folders under `config/`. Refer to the example files, or the [documentation](https://huddle-up.github.io/handbook/docs/host/configuration) for more information. When developing, we recommend setting the `HU_DB_SYNCHRONIZE` variable to `true`.

```sh
# Install dependencies and bootstrap packages
yarn
yarn bootstrap
```

### Running locally

To start the application, run `yarn start:dev` in the project root. For an improved experience, we recommend starting the client and the frontend in separate terminals.

```bash
# Start the api
cd apps/api
yarn start:dev
# Start the client
cd apps/client
yarn start:dev
```

### GraphQL

The GraphQL schema of the api is defined code-first and a schema file is generated automatically into `apps/api/schema.gql`.

During development the GraphQL playground can be accessed through the `[apihost]/graphl` url.

Interfaces and type definitions of GraphQL queries in the client are generated automatically through the Apollo CLI. The generation can be run with the `yarn apollo:codegen` in the `apps/client` project.

### Translations

Translations are located under `apps/client/public/locales`. Locales for dates and Material-UI components are located under `apps/client/src/contexts/locales`.

### Commands

`yarn bootstrap` calls lerna to install all dependencies and link packages.

`yarn clean` removes all `node_modules` from dependencies.

`yarn start:dev` starts the API and the frontend locally.

`yarn migrate` runs the TypeORM migrations.

`yarn build` builds all packages for production.

`yarn test` runs tests in all packages.

`yarn test:cov` runs test and generates test coverage reports.

`yarn lint` lints all packages, use `yarn lint:fix` to fix errors.

`yarn format` formats all packages.

## Contributions

### Bugs

If you find a bug, or have a problem, please [create an issue](https://github.com/huddle-up/huddle-up/issues) in this project.

### Code

If you have created a new feature that you want to contribute to this project, or fixed a bug, create a Pull Request.

### Guidelines

Coding style is according to the prettier and eslint configurations in the project. We recommend using the Prettier plugin in VS Code and enabling `Format on Save` to ensure your submissions are formatted accordingly. You can lint your code with `yarn lint` and fix it with `yarn format`.

For commit messages, we use [conventional commits](https://www.conventionalcommits.org/en/v1.0.0/). This should be checked autmatically when commiting locally.
