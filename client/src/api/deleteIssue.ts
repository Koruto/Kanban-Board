export default async function deleteRow(uniqueIdToDelete: string) {
  try {
    const response = await fetch(
      `http://localhost:3000/delete/issue/${uniqueIdToDelete}`,
      {
        method: 'DELETE',
      }
    );

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
  } catch (error) {
    console.error('Error:', error); // Log any errors that occur
  }
}
