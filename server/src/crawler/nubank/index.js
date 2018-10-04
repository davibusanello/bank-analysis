import fs from 'fs';
import path from 'path';
import { config } from 'dotenv';
import crawler from './collect-information';
import parser from './html-parser';

/* Load environment variables */
config();

let storagePath = `${path.dirname(require.main.filename || process.mainModule.filename)}/../${process.env.STORAGE_DIR}`;

if (process.env.NODE_ENV === 'test') {
  storagePath = `${process.env.MAIN_PATH}/../${process.env.STORAGE_DIR}`;
}

/**
 * Store de data parsed
 * @param {Object} data
 * @param {String} filePrefix
 * @throws {Error}
 */
function storeData(data, filePrefix) {
  try {
    fs.writeFileSync(`${storagePath}/${filePrefix}.json`, JSON.stringify(data));
  } catch (error) {
    throw new Error(`Error on store ${filePrefix}`);
  }
}

/**
 * Get previous stored Data
 * @param {String} filePrefix
 * @returns {JSON}
 * @throws {Error}
 */
function getStoredData(filePrefix) {
  try {
    return JSON.parse(fs.readFileSync(`${storagePath}/${filePrefix}.json`));
  } catch (error) {
    throw new Error(`Error on getting stored ${filePrefix}`);
  }
}

/**
 * Get previous collected data and return
 * @param {String} username
 * @returns {Object} {success, message, data}
 * @throws {Error}
 */
function giveStored(username) {
  try {
    const parsedData = {
      feedData: getStoredData(`${username}_feed`),
      categories: getStoredData(`${username}_categories`),
      tags: getStoredData(`${username}_tags`),
    };
    return {
      success: true,
      data: parsedData,
      message: 'Information from your Nubank Account was from the previous collection.',
    };
  } catch (error) {
    throw new Error(error.message);
  }
}

/**
 * Control the flow of collect Nubank Account data
 * @param {String} url
 * @param {String} username
 * @param {String} password
 * @returns {Object} {success, message, data}
 */
export default async function getInformation(url, username, password) {
  try {
    if (typeof url !== 'string') {
      throw new TypeError('URL should be string!');
    }
    if (typeof username !== 'string') {
      throw new TypeError('Username should be string!');
    }
    if (typeof password !== 'string') {
      throw new TypeError('Password should be string!');
    }

    /* If Env USE_STORED_DATA is true to use already stored information */
    if (process.env.USE_STORED_DATA) {
      return giveStored(username);
    }

    /**
     * Execute the crawler in Nubank Web App
     */
    const crawlerOptions = { headless: process.env.PUPPETEER_HEADLESS || false };
    const crawlerResult = await crawler(`${url}/#/login`, username, password, crawlerOptions)
      .then(value => value)
      .catch((error) => {
        throw new Error(error.message);
      });

    if (!crawlerResult.success) {
      throw new Error(`Error Nubank Crawler :${crawlerResult.message}`);
    }

    /**
     * If crawler was successful parse and store the data
     */
    const parsedData = await parser(crawlerResult.file);
    await storeData(parsedData.feedData, `${username}_feed`);
    await storeData(parsedData.categories, `${username}_categories`);
    await storeData(parsedData.tags, `${username}_tags`);

    return {
      success: true,
      data: parsedData,
      message: 'Information from your Nubank Account was collected.',
    };
  } catch (error) {
    return {
      success: false,
      message: error.message,
    };
  }
}
