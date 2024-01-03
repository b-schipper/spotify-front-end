import { AxiosInstance } from "axios";

export const getUserProfile = async (
  axios: AxiosInstance,
) => {
  try {
    const response = await axios.get(`/user/profile`)
    return response.data;
  } catch (error: any) {
    console.error(error);
    return error.response.data;
  }
}