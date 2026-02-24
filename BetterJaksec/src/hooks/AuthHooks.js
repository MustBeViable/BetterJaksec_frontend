import { fetchData } from "../utils/fetchData";

const useAuthentication = () => {
  const postLogin = async (inputs) => {
    return await fetchData("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(inputs),
    });
  };

  return { postLogin };
};

const useUser = () => {
  const getUserByToken = async () => {
    const token = localStorage.getItem("token");
    if (!token) throw new Error("No token found");

    return await fetchData(`/api/auth/me/${token}`);
  };

  return { getUserByToken };
};

export { useAuthentication, useUser };