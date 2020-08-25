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

interface fatSecretArgs {
  (clientId: string, clientSecret: string): Promise<accessTokenResponse | Error>;
}

class Auth {
  static fatSecret: fatSecretArgs = async (clientId, clientSecret) => {
    const options = {
      headers: {
        'content-type': 'application/x-www-form-urlencoded',
      },
      auth: {
        username: clientId,
        password: clientSecret,
      },
    };

    try {
      const response = await axios.post(
        'https://oauth.fatsecret.com/connect/token',
        querystring.stringify({ grant_type: 'client_credentials', scope: 'basic' }),
        options
      );

      return response.data;
    } catch (error) {
      throw new Error('Error getting access token');
    }
  };
}

export default Auth;
