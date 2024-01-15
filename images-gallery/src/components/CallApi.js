import axioss from 'axios';

const API_URL = 'https://api.unsplash.com/';
const CLIENT_CODE = 'client_id=i7ckBmIOpgDXmKHSxeJ9xXS7V8ytZ3hkzmcSSOWoaHw';

async function getImagesList(pageNo) {
  try {
    const response = await axioss.get(`${API_URL}photos/?page=${pageNo}&${CLIENT_CODE}`);

    return response?.data;
  } catch (error) {
    return [];
  }
}


export async function searchList(pageNo, query) {
  try {
    const response = await axioss.get(`${API_URL}search/photos/?page=${pageNo}&query=${query}&${CLIENT_CODE}`);

    return response?.data?.results;
  } catch (error) {
    return [];
  }
}

export default getImagesList