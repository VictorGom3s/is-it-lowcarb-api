import axios from 'axios';
import db from './../config/db';
export default class Auth {
  static fatSecret(clientId: string, clientSecret: string) {
    /* Check if it's already authenticated */
    /*if it is, check if it need refreshing*/
    /*if yes, refresh token*/
    this.refreshToken();
  }

  private static refreshToken() {}
}
