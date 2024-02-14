export default async function addBoard(tableId: string) {
  try {
    const response = await fetch(`http://localhost:3000/add/table/${tableId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Failed to add table');
    }
  } catch (error) {
    console.error('Error:', error);
  }
}
