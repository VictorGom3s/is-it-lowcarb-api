import axios from 'axios';
import Auth from '../../controller/auth.controller';
import AuthModel from '../../model/auth.model';

jest.mock('axios');

describe('Model tests', () => {
  let authModel: AuthModel;

  beforeAll(() => {
    authModel = new AuthModel();
  });

  afterAll(() => {
    authModel.disconnect();
  });

  it('should save the acquired token to the redis database', async () => {
    const responseMock = {
      access_token: 'a beautiful token',
      expires_in: 86400,
      token_type: 'Bearer',
      scope: 'basic',
    };

    (axios.post as jest.Mock).mockResolvedValue({ status: 200, data: responseMock });

    const authToken = await Auth.fatSecret('client_id', 'client_secret');

    authModel.save('fatSecretAuth', authToken);

    expect(await authModel.get('fatSecretAuth')).toEqual(authToken);
  });

  it('should get the token from the database', async () => {
    const fakeObj = {
      access_token: 'a beautiful token',
      expires_in: 86400,
      token_type: 'Bearer',
      scope: 'basic',
    };

    authModel.save('fakeEntry', fakeObj);

    expect(await authModel.get('fakeEntry')).toEqual(fakeObj);
  });

  it('try to get an unexistent key from redis', async () => {
    expect(authModel.get).rejects.toThrowError('Key not found on redis');
  });
});
