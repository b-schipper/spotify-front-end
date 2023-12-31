import axios from "axios";

const API_BASE_URL = 'http://localhost:8090/api/v1';

export const login = async (
  username: string, 
  password: string
) => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/auth/login`,
      {
        username,
        password,
      },
      { withCredentials: true },
    );

    console.log(response);

    response.data.roles.map((r: string) => {
      if (r === "ROLE_ARTIST") {localStorage.setItem("role", "ROLE_ARTIST");}
    });

    const accessToken = response.data.token;

    return accessToken;
  } catch (error: any) {
    console.error("Login failed:", error);
    throw error;
  }
};

export const registerUser = async (
  username: string,
  email: string,
  password: string,
) => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/auth/register`,
      {
        username,
        email,
        password,
      },
      { withCredentials: true },
    );

    //return response.data.token;
  } catch (error: any) {
    console.error("Register failed:", error);
    throw error;
  }
};

export const registerArtist = async (
  username: string,
  email: string,
  password: string,
) => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/auth/register/artist`,
      {
        username,
        email,
        password,
      },
      { withCredentials: true },
    );

    //return response.data.token;
  } catch (error: any) {
    console.error("Register failed:", error);
    throw error;
  }
};

export const logout = async () => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/auth/logout`,
      {},
      { withCredentials: true },
    );

    return response;
  } catch (error: any) {
    console.error("Logout failed:", error);
    throw error;
  }
};
