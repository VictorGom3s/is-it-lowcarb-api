import Auth from '../../controller/auth.controller';
import axios from 'axios';

jest.mock('axios');
jest.mock('./../../config/db');
jest.mock('./../../model/auth.model');

describe('request the token from the auth server', () => {
  it('auth to fatSecret', async () => {
    const clientId = 'fakeClientID';
    const clientSecret = 'fakeClientSecret';

    (axios.post as jest.Mock).mockResolvedValue({ data: {} });

    await Auth.fatSecret(clientId, clientSecret);

    expect(axios.post).toHaveBeenCalledTimes(1);
  });
});
