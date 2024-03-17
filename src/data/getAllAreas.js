const apiUrl = process.env.EXPO_PUBLIC_API_URL;

export const getAllAreas = () => {
  return fetch(`${apiUrl}/getAreas`, {
    method: "GET",
    mode: "cors",
    headers: { "Content-Type": "application/json" },
  })
    .then((response) => response.json())
    .catch((e) => console.log(e));
};
