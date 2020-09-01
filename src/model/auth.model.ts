import db from '../config/db';
interface tokenObj {
  access_token: string;
  expires_in: number | string;
  token_type: string;
  scope: string;
}
export default class Auth {
  save(key: string, value: tokenObj) {
    try {
      db.multi()
        .hset(key, 'access_token', value.access_token)
        .hset(key, 'expires_in', value.expires_in)
        .hset(key, 'token_type', value.token_type)
        .hset(key, 'scope', value.scope)
        .exec();
    } catch (error) {
      throw new Error('Error saving auth info to redis. ' + error);
    }
  }

  async get(key: string) {
    const result = await db.hgetall(key);
    return result;
  }
}
