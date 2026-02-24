const fetchData = async (url, options = {}) => {
  const token = localStorage.getItem("token");
  const headers = {
    ...(options.headers || {}),
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const response = await fetch(url, {
    ...options,
    headers,
  });

  if (response.status === 204) return true;

  let data = null;
  try {
    // Clone allows safe logging without consuming original body
    const clone = response.clone();

    // Optional: log the raw response
    const text = await clone.text();
    console.log("Fetched response:", text);

    // Then parse JSON from original response
    data = await response.json();
  } catch {
    data = null;
  }

  if (!response.ok) {
    throw new Error(data?.message || `Error ${response.status}`);
  }

  return data;
};

export { fetchData };