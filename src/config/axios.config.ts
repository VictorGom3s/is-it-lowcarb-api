import axios from 'axios';
import AuthModel from '../model/auth.model';

(async () => {
  const token = await AuthModel.get('fatSecret');
  axios.defaults.headers.common['Authorization'] = token.access_token;
})();

axios.defaults.baseURL = 'https://platform.fatsecret.com/rest/server.api?';

export default axios;
