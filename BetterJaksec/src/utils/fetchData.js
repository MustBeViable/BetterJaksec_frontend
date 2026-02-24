const fetchData = async (url, options = {}) => {
  console.log("fetchData calling:", url);
  const token = localStorage.getItem("token");
  const headers = {
    ...(options.headers || {}),
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  console.log("fetchData headers:", headers);
  
  const response = await fetch(url, {
    ...options,
    headers,
  });

  console.log("fetchData response status:", response.status);

  if (response.status === 204) return true;

  let data = null;
  try {
    data = await response.json();
    console.log("fetchData parsed data:", data);
  } catch (e) {
    console.log("fetchData JSON parse error:", e);
    data = null;
  }

  if (!response.ok) {
    throw new Error(data?.message || `Error ${response.status}`);
  }

  return data;
};
export {fetchData}