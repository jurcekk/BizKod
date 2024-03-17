const apiUrl = process.env.EXPO_PUBLIC_API_URL;

export const register = (formData) => {
  return fetch(`${apiUrl}/register`, {
    method: 'POST',
    mode: 'cors',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(formData),
  })
    .then((response) => response.json())
    .catch((e) => console.log(e));
};

export const login = (formData) => {
  return fetch(`${apiUrl}/login`, {
    method: 'POST',
    mode: 'cors',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(formData),
  })
    .then((response) => response.json())
    .catch((e) => console.log(e));
};
