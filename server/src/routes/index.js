import Router from 'express';

const router = new Router();

/* enable CORS preflight */
router.options('/login');

/**
 * Route /login
 */
router.post('/login', (request, response) => {
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
  // responseData.data = requestData;
  response.status(200).json(responseData);
});

export default router;
