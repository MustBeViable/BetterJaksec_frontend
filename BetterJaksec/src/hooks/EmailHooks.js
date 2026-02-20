import { fetchData } from "../utils/fetchData";

const useEmailHook = () => {
  const baseUrl = import.meta.env.VITE_API_BASE_URL + "/auth/email";

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
