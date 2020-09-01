import Auth from '../../controller/auth.controller';
import axios from 'axios';
import db from './../../config/db';

jest.mock('axios');
jest.mock('./../../config/db');

describe('canary', () => {
  it('auth to fatSecret', () => {
    const clientId = 'fakeClientID';
    const clientSecret = 'fakeClientSecret';

    Auth.fatSecret(clientId, clientSecret);

    expect(axios.post).toHaveBeenCalledTimes(1);
    expect(db.hgetall).toHaveBeenCalledTimes(1);
  });
});
