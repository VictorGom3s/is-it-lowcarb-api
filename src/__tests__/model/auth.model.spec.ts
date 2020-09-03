import Auth from '../../model/auth.model';
import db from '../../config/db';

jest.mock('../../model/auth.model');
jest.mock('../../config/db');

describe('auth model', () => {
  const authInfo = {
    access_token: 'a token',
    expires_in: 86400,
    token_type: 'Bearer',
    scope: 'basic',
  };

  it('save the auth info to redis', () => {
    Auth.save('fatSecret', authInfo);

    expect(db.multi).toBeCalledTimes(1);
    expect(db.exec).toBeCalledTimes(1);
    expect(db.hset).toBeCalledTimes(4);
    expect(db.hset).toBeCalledWith('fatSecret', 'access_token', authInfo.access_token);
  });

  it('get the auth info from redis', async () => {
    const response = await Auth.get('fatSecret');

    expect(response).toEqual(authInfo);
    expect(db.hgetall).toBeCalledTimes(1);
  });
});
