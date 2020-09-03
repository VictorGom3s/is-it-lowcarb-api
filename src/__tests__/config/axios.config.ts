import axios from '../../config/axios.config';

describe('test if axios has the right configs', () => {
  it('Tests the baseUrl', () => {
    expect(axios.defaults.baseURL).toBe('https://platform.fatsecret.com/rest/server.api?');
  });
});
