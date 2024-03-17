const apiUrl = process.env.EXPO_PUBLIC_API_URL;

export const updateUser = (formData) => {
  return fetch(`${apiUrl}/updateUser`, {
    method: "POST",
    mode: "cors",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(formData),
  })
    .then((response) => response.json())
    .catch((e) => console.log(e));
};
