export default async function login(loginData: {
  username: string;
  password: string;
}) {
  try {
    const response = await fetch('http://localhost:3000/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(loginData),
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data = await response.json();
    return data;
    // Handle the response data
    console.log(data);
  } catch (error) {
    // Handle errors
    console.error('Error:', error);
  }
}