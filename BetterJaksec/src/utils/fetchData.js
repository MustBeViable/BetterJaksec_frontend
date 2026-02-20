const fetchData = async (url, options = {}) => {
  const response = await fetch(url, options);

  let data = null;

  try {
    data = await response.json();
  } catch (err) {
    data = null;
    console.log(err)
  }

  if (!response.ok) {
    throw new Error(data?.message || `Error ${response.status}`);
  }

  return data;
};

export { fetchData };