import axios from 'axios';

import { isRequired } from './error';

export const fetchingJSON = (url = isRequired('url'), params = {}, method = 'GET') => axios[method.toLowerCase()](url, params);

