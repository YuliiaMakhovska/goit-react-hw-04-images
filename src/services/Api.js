import axios from 'axios';

axios.defaults.baseURL = 'https://pixabay.com/api/';
const KEY = '30705371-14a7eb31a425b5bed29cbaaa0';

async function fetchImages(name, page) {
  try {
    const response = await axios.get(
      `?q=${name}&page=${page}&key=${KEY}&image_type=photo&orientation=horizontal&per_page=12`
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
}

export default fetchImages;
