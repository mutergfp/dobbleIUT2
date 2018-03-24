import { fetchingJSON } from '@server/utils/fetching';

const BASE_URL = 'http://gi1.univ-lr.fr:9200';

export const logPlayerMatch = obj => fetchingJSON(`${BASE_URL}/parties/partie?pretty`, obj, 'POST');

export const logClick = obj => fetchingJSON(`${BASE_URL}/clics/clic?pretty/`, obj, 'POST');