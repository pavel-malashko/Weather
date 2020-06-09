import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://api.openweathermap.org/data/2.5/',
});

instance.interceptors.request.use(config => {
  config.params = {
    q: 'Minsk',
    appid: '6b474aa0006c665bf1049403ef8c8ac6',
    ...config.params,
  };
  return config;
});

export default instance;
