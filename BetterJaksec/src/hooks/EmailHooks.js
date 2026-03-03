import { fetchData } from "../utils/fetchData";

const useEmailHook = () => {
  const baseUrl = "/api/auth/email";

  const checkEmail = async (email) => {
    try {
      const usableEmail = await fetchData(`${baseUrl}/${email}`);
      if (usableEmail) return usableEmail;
      else return false;
    } catch (error) {
      console.log(error);
    }
  };

  return { checkEmail };
};

export default useEmailHook;
