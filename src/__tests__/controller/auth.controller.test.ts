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

  it('get the token', async () => {
    const client_id = process.env.CLIENT_ID;
    const client_secret = process.env.CLIENT_SECRET;

    (axios.post as jest.Mock).mockResolvedValue({ status: 200, data: responseMock });
    const authToken = await Auth.fatSecret(client_id as string, client_secret as string);

    expect(authToken).toEqual(expect.objectContaining(responseMock));
  });

  it('return invalid_client if called with wrong credentials', async () => {
    (axios.post as jest.Mock).mockResolvedValue({ status: 400, data: 'invalid_client' });

    const authToken = await Auth.fatSecret('wrong', 'very wrong');

    expect(authToken).toEqual('invalid_client');
  });

  it('throw error if anything goes wrong', async () => {
    (axios.post as jest.Mock).mockRejectedValue({ status: 400, data: 'invalid_client' });

    expect(Auth.fatSecret).rejects.toThrow();
  });
});
