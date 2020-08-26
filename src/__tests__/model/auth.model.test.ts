import axios from 'axios';
import Auth from '../../controller/auth.controller';
import AuthModel from '../../model/auth.model';

jest.mock('axios');

describe('Model tests', () => {
  // afterAll(() => {
  //   AuthModel.disconnect();
  // });

  xit('should save the acquired token to the redis database', async () => {
    const responseMock = {
      access_token: 'a beautiful token',
      expires_in: 86400,
      token_type: 'Bearer',
      scope: 'basic',
    };

    (axios.post as jest.Mock).mockResolvedValue({ status: 200, data: responseMock });

    const authToken = await Auth.fatSecret('client_id', 'client_secret');

    AuthModel.save('fatSecretAuth', authToken);

    expect(AuthModel.get('fatSecretAuth')).toEqual(authToken);
  });

  xit('should get the token from the database', () => {
    AuthModel.save('fakeEntry', { some: 'fakeData' });

    expect(AuthModel.get('fakeEntry')).toEqual({ some: 'fakeData' });
  });
});
