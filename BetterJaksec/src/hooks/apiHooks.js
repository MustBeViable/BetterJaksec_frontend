import { fetchData } from "../utils/fetchData";

const useAuthentication = ()=>{
const postLogin = async (inputs) => {
   const fetchOptions = {
     method: 'POST',
     headers: {
       'Content-Type': 'application/json',
     },
     body: JSON.stringify(inputs),
   };
   const loginResult = await fetchData(import.meta.env.API + '/auth/login', fetchOptions);
   return loginResult;
 };
return {postLogin}}

const useUser = ()=>{
const getUserByToken=async ()=> {
  const token =localStorage.getItem("token")
  try {
      if (!token) throw new Error("No token found");

      const userData = await fetchData(import.meta.env.API + "/users/token", {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      });

      return userData;
      } catch (err) {
            console.error("getUserByToken error:", err.message);
            throw err;
          }
        };



  return { getUserByToken };
};