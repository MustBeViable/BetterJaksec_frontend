import { fetchData } from "../utils/fetchData";
//.
const useAuthentication = () => {
  const baseUrl = "/api/auth";
  const postLogin = async (inputs) => {
    return await fetchData(`${baseUrl}/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(inputs),
    });
  };

  const getRole = async () => {
    return await fetchData(`${baseUrl}/me`);
  }

  return { postLogin, getRole };
};

const useUser = () => {
  const getUserByToken = async () => {
    const token = localStorage.getItem("token");
    if (!token) throw new Error("No token found");

    return await fetchData(`/api/auth/me`);
  };

  return { getUserByToken };
};

export { useAuthentication, useUser };