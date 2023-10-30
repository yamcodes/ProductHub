import axios from 'axios';
import { API_URL } from '~/config';

export const request = axios.create({
  baseURL: API_URL,
});
