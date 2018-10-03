import crawler from '../crawler/nubank/collect-information';

const NUBANK_URL = 'https://app.nubank.com.br';

/**
 * Method to handle the process of collect the information from Nubank Web App
 * @param {Object} authenticationInfo {username: 'user', password: 'pass'}
 */
async function getInformationFromNubankServer(authenticationInfo) {
  const [username, password] = [authenticationInfo.username, authenticationInfo.password];
  const result = await crawler(`${NUBANK_URL}/#/login`, username, password, {
    headless: false,
  })
    .then(value => value)
    .catch((error) => {
      throw new Error(error.message);
    });
  return result;
}

export default getInformationFromNubankServer;
