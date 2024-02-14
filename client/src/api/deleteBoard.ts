export default async function (columnName: string) {
  try {
    const response = await fetch(
      `http://localhost:3000/delete/board/${columnName}`,
      {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    if (!response.ok) {
      throw new Error('Failed to delete rows');
    }

    const data = await response.text();
  } catch (error) {
    console.error('Error:', error);
  }
}
