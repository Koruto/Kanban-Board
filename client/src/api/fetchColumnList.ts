import fetchData from './fetchData';

export default async function fetchColumnList() {
  try {
    const data = await fetchData('http://localhost:3000/column_list');

    return data;
  } catch (error) {
    console.error('There was a problem with the fetch operation:', error);
    throw error;
  }
}
