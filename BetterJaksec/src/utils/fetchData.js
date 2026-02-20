const fetchData = async (url, options = {}) => {
  const response = await fetch(url, options);

  if (response.status === 204) return true;

  let data = null;

  try {
    data = await response.json();
  } catch (err) {
    data = null;
  }

  if (!response.ok) {
    throw new Error(data?.message || `Error ${response.status}`);
  }

  return data;
};

export { fetchData };