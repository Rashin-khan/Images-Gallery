import axioss from 'axios';

const API_URL = 'https://api.unsplash.com/';
const CLIENT_CODE = 'client_id=i7ckBmIOpgDXmKHSxeJ9xXS7V8ytZ3hkzmcSSOWoaHw';
const headers = {'Authorization': 'Bearer 5AqAQLnZbxwyA4ThI2BXWuL31NQkHLS82dH0LMnZliA'}

async function getImagesList(pageNo, isLikedPhotos) {
  let url = '';
  if(isLikedPhotos) {
    url = `${API_URL}users/rashinkhan/likes?page=${pageNo}`;
  } else {
    url = `${API_URL}photos/?page=${pageNo}&${CLIENT_CODE}`
  }

  try {
    const response = await axioss({
      method: 'get',
      url: url,
      headers: headers
    })

    return response?.data;
  } catch (error) {
    return [];
  }
}

export async function searchList(pageNo, query) {
  try {
    const response = await axioss({
      method: 'get',
      url: `${API_URL}search/photos/?page=${pageNo}&query=${query}&${CLIENT_CODE}`,
      headers: headers
    })

    return response?.data?.results;
  } catch (error) {
    return [];
  }
}

export async function likePhoto(id, apiMethod) {
  try {
    const response = await axioss({
      method: apiMethod,
      url: `${API_URL}photos/${id}/like`,
      headers: headers
    })

    return true;
  } catch (error) {
    return false;
  }
}

export default getImagesList