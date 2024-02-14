async function fetchData(url: string) {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
  } catch (error) {
    console.error('There was a problem with the fetch operation:', error);
  }
}

export default async function initBoard() {
  try {
    await fetchData('http://localhost:3000/initTable');
    await fetchData('http://localhost:3000/initLogin');
  } catch (error) {
    console.error('Error:', error);
  }
}
