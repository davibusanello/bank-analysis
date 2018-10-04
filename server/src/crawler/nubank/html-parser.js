import fs from 'fs';
import cheerio from 'cheerio';

let html;

/**
 * Extract the categories information from HTML
 * @param {String} htmlData
 * @returns [{name, value}]
 */
function getCategoriesData(htmlData) {
  const categories = [];
  htmlData('#categoryChart > svg > g > g.row')
    .each((key, element) => {
      const category = {
        name: html(element).children('text').text(),
        value: html(element).children('title').text(),
      };
      categories.push(category);
    });

  return categories;
}
/**
 * Extract the tags information from HTML
 * @param {String} htmlData
 * @returns [{name, value}]
 */
function getTagsData(htmlData) {
  const tags = [];
  htmlData('#tagChart > svg > g > g.row')
    .each((key, element) => {
      const tag = {
        name: html(element).children('text').text(),
        value: html(element).children('title').text(),
      };
      tags.push(tag);
    });
  return tags;
}

/**
 * Get ID of item from feed
 * @param {String} element
 */
function getItemId(element) {
  return html(element).find('td.dc-table-column > div.event-card').attr('id');
}

/**
 * Get Date of item from feed
 * @param {String} element
 * @returns String date day/month/YYYY
 */
function getItemDate(element) {
  return html(element).find('tr > td.dc-table-label').text();
}

/**
 * Extract direct link to item transaction
 * @param {String} item Each item from Nubank Feed
 */
function getItemLink(item) {
  return html(item).find('td.dc-table-column > div.event-card').data('link');
}

/**
 * Extract Item type
 * @param {String} item Each item from Nubank Feed
 */
function getItemType(item) {
  return html(item).find('td.dc-table-column > div.type').text();
}

/**
 * Extract Item description
 * @param {String} item Each item from Nubank Feed
 */
function getItemDescription(item) {
  return html(item).find('td.dc-table-column > div > h4.description').text();
}

/**
 * Extract title from feed item
 * @param {String} item Each item from Nubank Feed
 */
function getItemTitle(item) {
  return html(item).find('td.dc-table-column > div > span.title').text();
}

/**
 * Extract value in BR Currency from feed item
 * @param {String} item Each item from Nubank Feed
 */
function getItemAmount(item) {
  return html(item).find('td.dc-table-column > div > div.amount').html();
}

/**
 * Extract value in US dollar Currency from feed item
 * @param {String} item Each item from Nubank Feed
 */
function getItemValueInDollar(item) {
  return html(item).find('td.dc-table-column > div > div.fx').html();
}

/**
 * Extract tags from feed item
 * @param {String} item Each item from Nubank Feed
 */
function getItemTags(item) {
  return html(item).find('td.dc-table-column > div > span.tags').text();
}

/**
 * Extract information from Nubank feed
 * @param {String} htmlData HTML
 */
function getFeedData(htmlData) {
  const feed = [];

  htmlData('table#feedTable > tbody')
    .each((key, element) => {
      const itemDate = getItemDate(element);

      html(element).find('tr.dc-table-row').each((key, item) => {
        const feedItem = {
          date: itemDate,
          id: getItemId(item),
          link: getItemLink(item),
          type: getItemType(item),
          description: getItemDescription(item),
          title: getItemTitle(item),
          amount: getItemAmount(item),
          dollar: getItemValueInDollar(item),
          tags: getItemTags(item),
        };

        feed.push(feedItem);
      });
    });
  return feed;
}

/**
 * Parse the Nubank HTML and extract the data
 * @param {String} filePath Path to HTML file
 * @returns  {Object} {feedData, categories, tags}
 * @throws {Error}
 */
export default function htmlParser(filePath) {
  try {
    if (typeof filePath !== 'string') throw new TypeError('HTML file path is not a string');

    html = cheerio.load(fs.readFileSync(filePath));

    const categories = getCategoriesData(html);
    const tags = getTagsData(html);
    const feedData = getFeedData(html);
    return {
      feedData,
      categories,
      tags,
    };
  } catch (error) {
    throw new Error(`Error parsing HTML: ${error.message}`);
  }
}
