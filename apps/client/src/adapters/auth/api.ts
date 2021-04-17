export async function authenticate(url: string, token: string) {
  const response = await fetch(url, {
    method: 'POST',
    credentials: 'omit',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ idToken: token }),
  });
  const body = await response.json();
  return body;
}
