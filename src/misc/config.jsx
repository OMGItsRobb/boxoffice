const API_BASE_URL = 'https://api.tvmaze.com';

export async function apiGet(querystring) {
  const res = await fetch(`${API_BASE_URL}${querystring}`).then(r => r.json());
  return res;
}
