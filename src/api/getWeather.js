import { error, fetching, success } from '../actions';
import { setCity } from '../utils';
import openweathermap from './api';

const getWeather = (cities, city = '') => {
  return dispatch => {
    dispatch(fetching());
    openweathermap
      .get('/weather', { params: { q: city } })
      .then(response => {
        dispatch(success(response));
        setCity(cities, city);
      })
      .catch(e => dispatch(error(e)));
  };
};

export default getWeather;
