import axios from 'axios';

export async function exchangeCodeWithNotionToken(code: string) {
  try {
    const response = await axios.post(
      'https://api.notion.com/v1/oauth/token',
      {
        grant_type: 'authorization_code',
        code,
        redirect_uri: 'https://chat.openai.com/chat/',
      },
      {
        auth: {
          username: process.env.NOTION_CLIENT_ID,
          password: process.env.NOTION_SECRET_ID,
        },
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    const data = response.data;

    if (!data) return null;

    return data;
  } catch (error) {
    throw error;
  }
}
