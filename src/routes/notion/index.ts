import express, { Request, Response } from 'express';
import { Client as NotionClient } from '@notionhq/client';

import { exchangeCodeWithNotionToken } from '../../utils';
import { COOKIES } from '../../constants';

const router = express.Router();

router.get('/', (req, res) => {
  res.send('listening notion api...');
});

router.post('/exchange-code', async (req: Request, res: Response) => {
  const { code } = req.body;

  try {
    const data = await exchangeCodeWithNotionToken(code as string);

    res.cookie(COOKIES.NOTION_ACCESS_TOKEN, data.access_token);

    res.status(200);
    res.json({
      code: 200,
      data,
    });
  } catch (error) {
    const { response, code } = error;

    res.status(response.status);
    res.json({
      code,
      data: response.data,
      status: response.status,
    });
  }
});

router.get('/search', async (req: Request, res: Response) => {
  const notion = new NotionClient({
    auth: req.cookies[COOKIES.NOTION_ACCESS_TOKEN],
  });

  try {
    const response = await notion.search({});

    res.status(200);
    res.json({
      code: 200,
      data: response.results,
    });
  } catch (error) {
    res.status(500);
    res.json({
      code: 500,
      message: error.message,
    });
  }
});

export default router;
