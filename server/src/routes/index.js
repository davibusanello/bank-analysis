import Router from 'express';

const router = new Router();

router.post('/login', (request, response) => {
  const result = {
    success: true,
    message: 'User authenticated',
    data: request.body,
  };
  response.status(200).json(result);
});

export default router;
