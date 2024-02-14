export default async function postDataToBackend(url: string, postData: {}) {
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(postData),
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    return response.statusText;
  } catch (error) {
    console.error('Error:', error);
  }
}
