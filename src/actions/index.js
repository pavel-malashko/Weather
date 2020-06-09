import { ERROR, FETCH_DATA, SUCCESS } from '../constants/types';

export const fetching = () => ({ type: FETCH_DATA });
export const success = response => ({ type: SUCCESS, response });
export const error = response => ({ type: ERROR, response });
