
# bank-analysis

> Created with  the study purpose

It's a *Vue* app for display the bank's data from a client and a back-end in *express* to expose the data collected by a web crawler

**WARNING:** Using this tool without care may lead to your bank account being blocked. Use at your own risk!

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->

**Table of Contents**

- [About project](#about-project)
  - [Problems Found](#problems-found)
- [Banks Support](#banks-support)
- [Architecture](#architecture)
  - [Front-end](#front-end)
  - [Back-end](#back-end)
- [Project setup](#project-setup)
  - [How to use](#how-to-use)
  - [Clean sensitive data](#clean-sensitive-data)
  - [Compiles and hot-reloads for development](#compiles-and-hot-reloads-for-development)
  - [Compiles and minifies for production](#compiles-and-minifies-for-production)
  - [Lints and fixes files](#lints-and-fixes-files)
  - [Run your unit tests](#run-your-unit-tests)
  - [Run your end-to-end tests](#run-your-end-to-end-tests)
- [Roadmap](#roadmap)
- [Contributing](#contributing)
- [License](#license)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## About project

At this moment the project has toke around 20 hours, and I have tried three approaches to the crawling the Nubank Account data:

1. Using the package [request](https://github.com/request/request) to write a light web crawler, I already have inspected the page in DevTools and saw the requests, parameters, and responses. But I can't bypass the authentication because is an SPA and need JavaScript to render correctly.

2. Using [Puppeteer](https://github.com/GoogleChrome/puppeteer), it is a more heavy crawler, but I can render correctly the SPA. And here I tried to intercept the request after logged in page. I could intercept the request, but the request body comes empty, by my research this feature still not implemented well in Chrome DevTools API or in Puppeteer.

3. The most heavy approach I think. Yet using [Puppeteer](https://github.com/GoogleChrome/puppeteer) to emulate the user interaction with the Web App, and collect the HTML rendered. And [cheerio](https://github.com/cheeriojs/cheerio) to parser the whole HTML and extract the relevant information. Here I needed to understand the structure of the HTML.

### Problems Found

- The IP or Username are blocked by the bank security because of too many requests. This occurs in all approaches.

- If some part of HTML structure was changed it can break the whole crawler parser.

## Banks Support

- Nubank: Fetching the whole transactions timeline data, Categories and Tags; Displaying only Categories information.

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

Setting up the `.env` files in Vue App and in the Server App

> Vue App

Path: .env

```ini
VUE_APP_ROOT_API='http://localhost:3005/v1' # URL to Express API
```

> Server

 Path: server/.env

```ini
MAIN_PATH='/home/davi/Dropbox/Projects/bank-analysis/server/src' # Your server/src path
STORAGE_DIR='storage' # Store the HTML to parser and extracted data. The application uses in this way 'MAIN_PATH/../STORAGE_DIR'
PORT=3005 # Express Server PORT
PUPPETEER_HEADLESS=true # To use puppteer in headless mode
USE_STORED_DATA=true # Bypass the crawler in use the previous extracted data for the same username
NUBANK_URL='https://app.nubank.com.br' # Nubank Web App URL
```

## How to use

### Clean sensitive data

Remove all files from Server `STORAGE_DIR`

By default

```shell
rm -rf server/storage/*.json server/storage/*.html
```

### Compiles and hot-reloads for development

> Vue App

```shell
yarn run serve
```

By default Vue Cli serves in [http://localhost:8080](http://localhost:8080)

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

## Contributing

  Read the [contributing guide](./.github/CONTRIBUTING.md)

## License

[MIT LICENSE](./LICENSE)