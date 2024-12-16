# ZymeBusiness

This project uses `npm` as package manager and `eslint+prettier` as linter and formatter.

## Conventions

This project is 100% standalone!
In this project are used **flat**, components with changeDetection OnPush. Please proceed accordingly; the Angular CLI is already configured.

Do not use document directly, instead inject DOCUMENT

## Commands needed to bump the dependencies

> IMPORTANT! Dependency updates should be done at least once a month.

```sh
# If you have not the angular CLI installed you can use npx
npm update
ng update @taiga-ui/cdk
ng update @angular/cli @angular/core
```
