import db from '../config/db';
import { accessTokenResponse } from '../controller/auth.controller';

class AuthModel {
  save(key: string, value: accessTokenResponse) {
    try {
      db.multi()
        .hset(key, 'access_token', value.access_token)
        .hset(key, 'expires_in', value.expires_in)
        .hset(key, 'token_type', value.token_type)
        .hset(key, 'scope', value.scope)
        .exec();
    } catch (error) {
      console.error(error);
    }
  }

  async get(key: string) {
    try {
      const result = await db.hgetall(key);
      const newExpiresIn = parseInt(result.expires_in, 10);
      return { ...result, expires_in: newExpiresIn };
    } catch (error) {
      throw new Error('Key not found on redis');
    }
  }
}

export default AuthModel;
