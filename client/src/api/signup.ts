export default async function signup(signupData: {
  name: string;
  username: string;
  password: string;
}) {
  try {
    const response = await fetch('http://localhost:3000/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(signupData),
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    console.log(response);
    // Handle the response data
  } catch (error) {
    // Handle errors
    console.error('Error:', error);
  }
}
