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

    const data = await response.text();
    console.log(data); // Log the response from the server
  } catch (error) {
    console.error('Error:', error); // Log any errors that occur
  }
}
