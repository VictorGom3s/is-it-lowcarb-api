import axios from 'axios';
import querystring from 'querystring';
import dotenv from 'dotenv';
dotenv.config();

interface accessTokenResponse {
  access_token: string;
  expires_in: number;
  token_type: string;
  scope: string;
}

class Auth {
  private client_id: string;
  private client_secret: string;

  constructor(clientId: string, clientSecret: string) {
    this.client_id = clientId;
    this.client_secret = clientSecret;
  }

  async getAccessToken(): Promise<Error> {
    try {
      const response = await axios.post(
        'https://oauth.fatsecret.com/connect/token',
        querystring.stringify({ grant_type: 'client_credentials', scope: 'basic' }),
        {
          headers: {
            'content-type': 'application/x-www-form-urlencoded',
          },
          auth: {
            username: this.client_id,
            password: this.client_secret,
          },
        }
      );

      return response.data;
    } catch (error) {
      // console.error(error);
      throw new Error('Error getting access token');
    }
  }
}

export default Auth;
