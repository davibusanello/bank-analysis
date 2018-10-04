
# bank-analysis

> Created with  the study purpose

It's a *Vue* app for display the bank's data from a client and a back-end in *express* to expose the data collected by a web crawler

**WARNING:** Using this tool without care may lead to your bank account being blocked. Use at your own risk!

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->

**Table of Contents**

- [bank-analysis](#bank-analysis)
  - [Banks Support](#banks-support)
  - [Architecture](#architecture)
    - [Front-end](#front-end)
    - [Back-end](#back-end)
  - [Project setup](#project-setup)
  - [How to use](#how-to-use)
    - [Compiles and hot-reloads for development](#compiles-and-hot-reloads-for-development)
    - [Compiles and minifies for production](#compiles-and-minifies-for-production)
    - [Lints and fixes files](#lints-and-fixes-files)
    - [Run your unit tests](#run-your-unit-tests)
    - [Run your end-to-end tests](#run-your-end-to-end-tests)
  - [Roadmap](#roadmap)
  - [License](#license)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## Banks Support

- Nubank: Fetching the whole time-line data, Categories and Tags

## Architecture

- Based in Node.js v10.11

- JavaScript Style Guide from Airbnb to keep the code pattern. [reference](https://github.com/airbnb/javascript)

- Used ES6 with Babel to transpile the production code to common JS.

### Front-end

- [Vue 2](https://github.com/vuejs/vue) is an open source front-end framework to create robust SPA.

- [axios](https://github.com/axios/axios) to handle the api requests;

- [chart.js](http://www.chartjs.org/) Simple JS charts to display the information

### Back-end

> Inside ./server

- [express](https://github.com/expressjs/express) Minimal web framework for node, to handle the requests

- [Puppeteer](https://github.com/GoogleChrome/puppeteer) is a Node library which provides a high-level API to control Chrome or Chromium over the DevTools Protocol. Making possible to crawler a SPA like Nubank web app.

- [cheerio](https://github.com/cheeriojs/cheerio) implementation of jQuery to easy parser the HTML.

- dotenv to work with .env files

- [cors](https://github.com/expressjs/cors) is a middleware to handle the CORS in express

- [morgan](https://github.com/expressjs/morgan) HTTP request logger middleware

## Project setup

> Vue App

```shell
yarn install
```

> Server

```shell
cd server
yarn install
```

## How to use

### Compiles and hot-reloads for development

> Vue App

```shell
yarn run serve
```

> Server

```shell
cd server
yarn run serve:dev
```

### Compiles and minifies for production

> Vue App

```shell
yarn run build
```

### Lints and fixes files

> Vue App

```shell
yarn run lint
```

> Server

```shell
cd server
yarn run lint
```

### Run your unit tests

> Vue App

```shell
yarn run test:unit
```

### Run your end-to-end tests

> Vue App

```shell
yarn run test:e2e
```

## Roadmap

- Display the information

- Parser the User personal information

- Fake data to test the crawler

- Fake data to test the parser

- Tests to the front-end

- Integrate with MongoDB

- Better UI Design

## License

[MIT LICENSE](./LICENSE)