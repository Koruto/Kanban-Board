export default async function fetchIssueDetails(uniqueId: string) {
  try {
    const response = await fetch(`http://localhost:3000/getIssue/${uniqueId}`);

    if (!response.ok) {
      throw new Error('Failed to fetch issue details');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error:', error);
  }
}
