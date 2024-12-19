# Contributing - Collect & Verything App

Thanks for your interest in contributing to Collect & Verything App We're happy to have you here.

Please take a moment to review this document before submitting your first pull request. We also strongly recommend that you check for open issues and pull requests to see if someone else is working on something similar.

If you need any help, feel free to reach out to [@DevGenius-IT](https://github.comm/DevGenius-IT) on GitHub.

## Table of Contents 📚

- [About this repository](#about-this-repository-)
- [Structure](#structure-)
- [Testing](#testing-)
- [Development](#development-)
  - [Fork this repo](#fork-this-repo)
  - [Clone on your local machine](#clone-on-your-local-machine)
  - [Navigate to project directory](#navigate-to-project-directory)
  - [Create a new Branch](#create-a-new-branch)
  - [Install dependencies](#install-dependencies)
  - [Run the project](#run-the-project)
- [Commit Convention](#commit-convention-)
  - [Commits](#commits)
    - [Emojis](#emojis)
    - [Types](#types)
    - [Scopes](#scopes)
    - [Breaking Changes](#breaking-changes)
    - [Subject](#subject)
    - [Examples](#examples)
- [Releases](#releases)
  - [Versioning](#versioning)
  - [Examples](#examples)

## About this repository 📁

This repository is a Laravel API RESTful application that serves as the backend for the Fiches Pédagogiques application. It is built using the Laravel framework and follows the RESTful API conventions.

## Structure 🏗️

This repository is structured as follows:

```
├── components
├── docs
├── public
├── layouts
├── pages
├── server
├── .env.example
├── app.vue
├── bun.lockb
├── CONTRIBUTING.md
├── nuxt.config.ts
├── package.json
├── tsconfig.json
└── phpunit.xml
```

| Path                 | Description                                                |
| -------------------- | ---------------------------------------------------------- |
| `app`                | Contains the main application code                         |
| `app/Components`     | Contains the components of the application                 |
| `app/Modules`        | Contains the modules of the application                    |
| `app/Providers`      | Contains the service providers of the application          |
| `app/Services`       | Contains the services of the application                   |
| `app/Utils`          | Contains the utility classes of the application            |
| `bootstrap`          | Contains the Laravel bootstrap files                       |
| `config`             | Contains the configuration files of the application        |
| `database`           | Contains the database migrations and seeds                 |
| `public`             | Contains the public files of the application               |
| `routes`             | Contains the routes of the application                     |
| `storage`            | Contains the storage files of the application              |
| `tests`              | Contains the tests of the application                      |
| `composer.json`      | Contains the composer dependencies of the application      |
| `composer.lock`      | Contains the composer lock file of the application         |
| `docker-compose.yml` | Contains the docker compose file of the application        |
| `phpunit.xml`        | Contains the PHPUnit configuration file of the application |

## Testing 🧪

> [!IMPORTANT]
> Not yet implemented 🏗️

## Development 🚀

### Fork this repo

You can fork this repo by clicking the fork button in the top right corner of this page.

### Clone on your local machine

```bash
git clone https://github.com/DevGenius-IT/fiches-pedagogiques-api-rest.git
```

### Navigate to project directory

```bash
cd fiches-pedagogiques-api-rest
```

### Create a new Branch

```bash
git checkout -b my-new-branch
```

### Install dependencies

```bash
composer install
```

### Run the project

```bash
php artisan serve
```

## Documentation 📖

Documentation is written using [MDX](https://mdxjs.com). You can find the documentation files in the `docs` directory.

## Commit Convention 📝

Before you create a Pull Request, please check whether your commits comply with the commit conventions used in this repository.

When you create a commit we kindly ask you to follow the convention `category(scope or module): message` in your commit message while using one of the following categories:

- `feat / feature`: all changes that introduce completely new code or new features
- `fix`: changes that fix a bug (ideally you will additionally reference an issue if present)
- `refactor`: any code related change that is not a fix nor a feature
- `docs`: changing existing or creating new documentation (i.e. README, docs for usage of a lib or cli usage)
- `build`: all changes regarding the build of the software, changes to dependencies or the addition of new dependencies
- `test`: all changes regarding tests (adding new tests or changing existing ones)
- `ci`: all changes regarding the configuration of continuous integration (i.e. github actions, ci system)
- `chore`: all changes to the repository that do not fit into any of the above categories

  e.g. `feat(components): add new prop to the avatar component`

If you are interested in the detailed specification you can visit https://www.conventionalcommits.org/ or check out the [Angular Commit Message Guidelines](https://github.com/angular/angular/blob/22b96b9/CONTRIBUTING.md#-commit-message-guidelines).

### Commits

Use the following prefixes for your commit messages:
`<emoji> <type>(<scope>)<!>: <subject>`

#### Emojis

Use the following emoji prefixes for your commit messages [Gitmoji](https://gitmoji.dev/)

You can install the Gitmoji extension for VSCode [here](https://marketplace.visualstudio.com/items?itemName=seatonjiang.gitmoji-vscode)

#### Types

Choose a type from the following list, in terms of the kind of change that you're committing:

- `feat`: A new feature
- `fix`: A bug fix
- `docs`: Documentation only changes
- `style`: Changes that do not affect the meaning of the code (white-space, formatting, missing semi-colons, etc)
- `refactor`: A code change that neither fixes a bug nor adds a feature
- `perf`: A code change that improves performance
- `test`: Adding missing or correcting existing tests
- `chore`: Changes to the build process or auxiliary tools and libraries such as documentation generation

#### Scopes

> [!NOTE]
> Only use in monorepo projects or if you have multiple modules in your project.

Choose a scope from the following list, in terms of the location of the change:

- `app`
- `back-office`
- `docs`
- `lambda`
- `assets`
- `cli`
- `composables`
- `constants`
- `stores`
- `types`
- `ui`
- `utils`
- `scripts`

#### Breaking Changes

Any breaking changes should be indicated with `!` after the type/scope. e.g. `✨ feat(back)!: this is a breaking change`

#### Subject

- Describe what you did in imperative mood, e.g.:
  | Word | Description | Example |
  | --- | --- | --- |
  | `add` | Create a capability e.g. feature, test, dependency. | `✨ feat: add new feature` |
  | `change` | Change behavior of the code e.g. refactor, style, doc. | `🔧 chore: change config` |
  | `remove` | Delete a capability e.g. feature, test, dependency. | `🔥 feat: remove feature` |
  | `fix` | Fix an issue e.g. bug, typo, accident, misstatement. | `🐛 fix: fix typo` |
  | `bump` | Increase the version of something e.g. dependency. | `⬆️ chore: bump version` |
  | `make` | Add or change something to make it work. | `🏗 chore: make build` |
  | `start` | Begin doing something; e.g. create a feature flag. | `🏁 chore: start feature flag` |
  | `stop` | End doing something; e.g. remove a feature flag. | `🏁 chore: stop feature flag` |
  | `optimize` | A change that MUST be just about performance, e.g. speed up code. | `🚀 chore: optimize code` |
  | `revert` | Revert a change e.g. revert commit. | `⏪ chore: revert commit` |
  | `clean` | A change that MUST be just about removing code. | `🧹 chore: clean code` |
  | `disable` | A change that MUST be just about disabling code. | `🔒 chore: disable code` |
  | `refactor` | A change that MUST be just about refactoring code. | `♻️ chore: refactor code` |
  | `update` | A change that MUST be just about updating code. | `🚀 chore: update code` |
  | `improve` | A change that MUST be just about improving code. | `🚀 chore: improve code` |
  | `clean` | A change that MUST be just about cleaning code. | `🧹 chore: clean code` |
  | `optimize` | A change that MUST be just about optimizing code. | `🚀 chore: optimize code` |
  > Source: [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/)
- Don't capitalize first letter
- No dot (.) at the end

#### Examples

- `✨ feat(app): add new feature`
- `🐛 fix(back-office): fix typo`
- `🔧 chore(cli): change config`
- `♻️ chore(types): refactor code`
- `💄 style(ui): change style`
- `🚑️ hotfix(composables): fix import`
- `🔥 feat(lambda)!: remove feature`
- `⬆️ chore(docs): bump version`
- `🏗 chore(scripts/donwload-images): make build`

## Release 🚀

Versioning is done automatically by [GitHub Actions](https://docs.github.com/fr/actions).

Using [Github worflows](https://docs.github.com/en/actions/writing-workflows) and release `vX.X.X` branches

### Versioning

- `major`: Breaking changes
- `minor`: New features
- `patch`: Bug fixes

e.g. `<major>.<minor>.<patch>`

### Examples

- `1.0.0` First release
- `1.1.0` New feature
- `1.1.1` Bug fix

---

<p align="center">
	Copyright &copy; 2024-present <a href="https://github.com/DevGenius-IT" target="_blank">@DevGenius-IT</a>
</p>

<p align="center">
	<a href="https://github.com/DevGenius-IT/collect-n-verything-app/blob/main/LICENSE.md"><img src="https://img.shields.io/static/v1.svg?style=for-the-badge&label=License&message=MIT&logoColor=d9e0ee&colorA=363a4f&colorB=b7bdf8"/></a>
</p>