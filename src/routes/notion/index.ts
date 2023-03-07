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

  console.log({
    cookies: req.cookies,
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

router.post('/export', async (req: Request, res: Response) => {
  const { content, pageId } = req.body;

  console.log({
    content,
    pageId,
  });

  const notion = new NotionClient({
    auth: req.cookies[COOKIES.NOTION_ACCESS_TOKEN],
  });

  try {
    const createdBlock = await notion.blocks.children.append({
      block_id: pageId,
      children: content.content.map((chat) => ({
        type: chat.type,
        paragraph: {
          rich_text: chat[chat.type].content.map((text) => ({
            text: {
              content: text.content,
              ...(text.type === 'link' && {
                link: {
                  url: text.content,
                },
              }),
            },

            ...(text.type === 'bold' && {
              annotations: {
                [text.type]: true,
              },
            }),
          })),
        },
      })),
    });

    res.status(201);
    res.json({
      code: 201,
      data: createdBlock,
    });
  } catch (error) {
    res.status(500);
    res.json({
      code: 500,
      message: error.message,
    });
  }
});

router.post('/check-auth', async (req: Request, res: Response) => {
  const { token } = req.body;

  console.log({ token });

  try {
    const notion = new NotionClient({
      auth: token,
    });

    await notion.search({});

    res.cookie(COOKIES.NOTION_ACCESS_TOKEN, token);

    res.status(200);
    res.json({
      code: 200,
      data: {
        isAuth: true,
      },
    });
  } catch (error) {
    res.status(error.status);
    res.json({
      code: error.code,
      message: error.message,
      isAuth: false,
    });
  }
});

export default router;
