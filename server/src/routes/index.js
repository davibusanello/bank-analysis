import Router from 'express';

import NubankModel from '../models/nubank';

const router = new Router();

/* enable CORS preflight */
router.options('/login');

/**
 * Route /login
 */
router.post('/login', async (request, response) => {
  const requestData = request.body;
  const responseData = {
    success: true,
    message: 'User authenticated',
    data: null,
  };

  if (typeof requestData.username !== 'string' || requestData.username === '') {
    responseData.message = 'Invalid username!';
    responseData.success = false;
  } else if (typeof requestData.password !== 'string' || requestData.password === '') {
    responseData.message = 'Invalid password!';
    responseData.success = false;
  }

  responseData.data = await NubankModel(requestData)
    .then((value) => {
      responseData.success = true;
      responseData.message = value.message;
      return value.data;
    })
    .catch((error) => {
      responseData.success = false;
      responseData.message = error.message;
    });

  await response.status(200).json(responseData);
});

export default router;
