import Redis from 'ioredis';
import { accessTokenResponse } from '../controller/auth.controller';

class AuthModel {
  private redis: Redis.Redis;

  constructor() {
    this.redis = new Redis();
  }

  disconnect() {
    return this.redis.disconnect();
  }

  save(key: string, value: accessTokenResponse) {
    try {
      this.redis.hset(key, 'access_token', value.access_token);
      this.redis.hset(key, 'expires_in', value.expires_in);
      this.redis.hset(key, 'token_type', value.token_type);
      this.redis.hset(key, 'scope', value.scope);
    } catch (error) {
      console.error(error);
    }
  }

  async get(key: string) {
    try {
      const result = await this.redis.hgetall(key);
      const newExpiresIn = parseInt(result.expires_in, 10);
      return { ...result, expires_in: newExpiresIn };
    } catch (error) {
      throw new Error('Key not found on redis');
    }
  }
}

export default AuthModel;
