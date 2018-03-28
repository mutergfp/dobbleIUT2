import { fetchingJSON } from '@server/utils/fetching';

const BASE_URL = 'http://dobbleCartes:82';

export const genMiddleCard = cards => fetchingJSON(`${BASE_URL}/carte`, cards, 'POST');

export const genStarterPack = nbPlayers => fetchingJSON(`${BASE_URL}/cartes/${nbPlayers}`);