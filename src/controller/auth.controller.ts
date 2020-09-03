import axios from 'axios';
import AuthModel from '../model/auth.model';
import qs from 'qs';
export default class Auth {
  static async fatSecret(clientId: string, clientSecret: string) {
    try {
      const { data: result } = await axios.post(
        'https://oauth.fatsecret.com/connect/token',
        qs.stringify({ grant_type: 'client_credentials', scope: 'basic' }),
        {
          headers: {
            'content-type': 'application/x-www-form-urlencoded',
          },
          auth: {
            username: clientId,
            password: clientSecret,
          },
        }
      );

      AuthModel.save('fatSecret', result);
    } catch (error) {
      console.error(error);
    }
  }
}
