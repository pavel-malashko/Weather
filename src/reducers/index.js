import { ERROR, FETCH_DATA, SUCCESS } from '../constants/types';
import { parseData } from '../utils';

export const initialState = {
  status: null,
  response: null,
  weatherInfo: null,
  error: false,
};

const reducer = (state = initialState, { type, response } = {}) => {
  switch (type) {
    case FETCH_DATA:
      return { ...initialState, status: FETCH_DATA };
    case SUCCESS:
      return { ...state, status: SUCCESS, weatherInfo: parseData(response.data) };
    case ERROR:
      return { ...state, status: ERROR, error: true };
    default:
      return state;
  }
};

export default reducer;
