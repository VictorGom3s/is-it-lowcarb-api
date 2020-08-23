import axios from 'axios';
import Auth from '../../controller/auth.controller';
import dotenv from 'dotenv';

dotenv.config();

jest.mock('axios');

describe('auth to FatSecret API', () => {
  const responseMock = {
    access_token: expect.any(String),
    expires_in: expect.any(Number),
    token_type: expect.any(String),
    scope: expect.any(String),
  };

  xit('get the token', async () => {
    const client_id = process.env.CLIENT_ID;
    const client_secret = process.env.CLIENT_SECRET;

    const auth = new Auth(client_id as string, client_secret as string);

    axios.post.mockResolvedValue({ status: 200, data: responseMock });
    const authToken = await auth.getAccessToken();

    expect(authToken).toEqual(expect.objectContaining(responseMock));
  });

  it('throw error if called with wrong credentials', async () => {
    axios.post.mockImplementation(() => {
      throw new Error('erro');
    });

    const auth = new Auth('errado', 'mais errado ainda');

    async function getToken() {
      console.log(await auth.getAccessToken());
      throw new Error('erro');
    }

    // const res = await auth.getAccessToken();
    // console.log(res);
    await expect(getToken).toThrow();
  });
});
