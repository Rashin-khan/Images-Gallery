import axioss from 'axios';

async function getImagesList(pageNo) {
    try {
      const response = await axioss.get(`https://api.unsplash.com/photos/?page=${pageNo}&client_id=i7ckBmIOpgDXmKHSxeJ9xXS7V8ytZ3hkzmcSSOWoaHw`);

      return response.data;
    } catch (error) {
      return null;
    }
  }

  export default getImagesList