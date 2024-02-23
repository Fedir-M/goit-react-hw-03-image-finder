import axios from 'axios';

const baseURL = 'https://pixabay.com/api/';
const KEY_API = '42031506-26545a7af84e6a92777e1df63';

export async function fetchImages(q, page) {
  const params = new URLSearchParams({
    key: KEY_API,
    q,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: 'true',
    page,
    per_page: 12,
  });

  const { data } = await axios.get(`${baseURL}?${params}`);

  return data;
}
