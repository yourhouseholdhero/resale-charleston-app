export async function uploadImage(file) {
  const formData = new FormData();
  formData.append('image', file);

  const res = await fetch('/api/upload', {
    method: 'POST',
    body: formData
  });

  const data = await res.json();
  return data.url;
}
