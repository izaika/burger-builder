import axios from 'axios';
import secret from './secret';

const instance = axios.create({
  baseURL: secret.firebaseUrl
});

export default instance;
