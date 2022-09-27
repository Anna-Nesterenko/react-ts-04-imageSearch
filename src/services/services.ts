import axios from "axios";

const API_KEY = "28157961-50aacf6d1ff0efe2e77cab6d2";
const BASE_URL = "https://pixabay.com/api/?";

export async function getImages(searchQuery: string, page: number) {
  try {
    const { data } =
      await axios.get(`${BASE_URL}q=${searchQuery}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12
`);
    return data;
  } catch (error) {
    throw new Error(`We did not find anything with ${searchQuery}`);
  }
}
