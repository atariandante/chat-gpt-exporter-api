import { Router } from 'express';
import notionRouter from './notion';

const router = Router();

router.use('/notion', notionRouter);

router.get('/', (req, res) => {
  res.send('Listening... choose a route');
});

export default router;
