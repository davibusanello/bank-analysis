import fs from 'fs';
import path from 'path';
import { config } from 'dotenv';
import puppeteer from 'puppeteer';
/* Needed for puppeteer */
import regeneratorRuntime from 'regenerator-runtime';

/* Load environment variables */
config();

const storagePath = `${path.dirname(require.main.filename || process.mainModule.filename)}/../${process.env.STORAGE_DIR}`;

/**
 * Check if the responseType is allowed
 * @param {String} responseType
 * @returns bool
 */
function isResponseTypeAllowed(responseType) {
  const responseTypeAllowed = [
    'document',
    'xhr',
    'texttrack',
    'fetch',
    'eventsource',
    'websocket',
    'manifest',
    'other',
  ];

  return responseTypeAllowed.includes(responseType);
}

/**
 * Responsible for authenticate in Nubank web app
 * @param {Object} page
 * @param {String} url
 * @param {String} user
 * @param {String} password
 */
async function authenticateUser(page, url, username, password) {
  await page.goto(url);
  await page.type('input[type="text"]#username', username, {
    delay: 100,
  });
  await page.type('input[type="password"]', password, {
    delay: 100,
  });
  await page.click('form > button[type="submit"]');
  await page.waitFor(1000);
}

/**
 *  Emulate the user interaction to fetch whole data time line in Nubank Web App
 * @param {puppeteer.page} page
 */
async function emulateUserScrollTimeLine(page) {
  await page.waitForSelector('.ng-scope > .nu-view > .toolbar > #timeChart > svg');
  await page.click('.ng-scope > .nu-view > .toolbar > #timeChart > svg');
  await page.click('#timeChart > svg > g > g.brush > g.resize.w');
  await page.mouse.down();
  await page.mouse.move(720 - 635, 200);
  await page.mouse.up();
  await page.waitFor(1000);
}

/**
 * Receive the HTML Document and store to parse after
 * @param {String} html
 * @returns {String} File path
 * @throws {Error} Error
 */
async function storePage(html) {
  try {
    fs.writeFileSync(`${storagePath}/nubank-collected.html`, html);
  } catch (error) {
    throw new Error('Error on store collected page');
  }
  return `${storagePath}/nubank-collected.html`;
}

/**
 * Make the flow to access the User Account and collect the informatio
 * @param {String} url
 * @param {String} username
 * @param {String} password
 * @param {Object} options
 */
async function collectInfirmation(url, username, password, options = {}) {
  let puppeteerOptions = options;
  if (typeof puppeteerOptions.headless === 'undefined') {
    puppeteerOptions = {
      headless: true,
    };
  }

  puppeteerOptions.args = ['--no-sandbox'];
  const browser = await puppeteer.launch(puppeteerOptions);
  let filePath;

  try {
    if (typeof url !== 'string') throw new TypeError('Invalid url!');
    if (typeof username !== 'string') throw new TypeError('Invalid username!');
    if (typeof password !== 'string') throw new TypeError('Invalid password!');
    const page = await browser.newPage();
    await page.setViewport({
      width: 1920,
      height: 1080,
    });

    /** Page interactions */
    await authenticateUser(page, url, username, password);
    await page.waitFor(5000);
    await emulateUserScrollTimeLine(page);

    /* Get the content and store */
    const html = await page.content();
    filePath = await storePage(html);
  } catch (error) {
    await browser.close();
    return {
      success: false,
      message: error.message,
    };
  }

  await browser.close();
  return {
    success: true,
    file: filePath,
  };
}

export default collectInfirmation;
