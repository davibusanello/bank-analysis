import crawler from '../crawler/nubank';

const NUBANK_URL = 'https://app.nubank.com.br';

/**
 * Method to handle the process of collect the information from Nubank Web App
 * @param {Object} authenticationInfo {username: 'user', password: 'pass'}
 * @returns {Object} {success, message, data}
 */
async function getInformationFromNubankServer(authenticationInfo) {
  try {
    const [username, password] = [authenticationInfo.username, authenticationInfo.password];
    const result = await crawler(NUBANK_URL, username, password)
      .then(value => value)
      .catch((error) => {
        throw new Error(error.message);
      });
    return result;
  } catch (error) {
    return {
      success: false,
      message: error.message,
    };
  }
}

export default getInformationFromNubankServer;
