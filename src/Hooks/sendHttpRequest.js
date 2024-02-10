export const sendHttpRequest = async (url, errName, config) => {
  const response = await fetch(url, config);
  if (!response.ok) {
    throw new Error(errName);
  }
  const result = response.json();
  return result;
};
