export async function createOwner(data) {
  try {
    const response = await fetch('/.netlify/functions/addOwner', {
      method: 'POST',
      body: JSON.stringify(data),
      headers: { 'Content-Type': 'application/json' },
    });

    if (!response.ok) {
      throw new Error('Failed to create owner');
    }

    return await response.json();
  } catch (error) {
    console.error('API error:', error);
    throw error;
  }
}

export async function getOwners() {
  try {
    const response = await fetch('/.netlify/functions/getOwners');

    if (!response.ok) {
      throw new Error('Failed to fetch owners');
    }

    return await response.json();
  } catch (error) {
    console.error('API error:', error);
    throw error;
  }
}
