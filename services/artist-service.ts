import { AxiosInstance } from "axios";

export const uploadNewMusicTrack = async (
  axios: AxiosInstance,
  title: string,
  duration: string,
) => {
  try {
    console.log("reaches uploadNewMusicTrack");
    const response = await axios.post(`/artist/music`, {
      title,
      duration,
    });
    console.log(response);
    return response.data;
  } catch (error: any) {
    console.error(error);
    return error.response.data;
  }
}

export const getAllArtistMusicTracks = async (
  axios: AxiosInstance,
) => {
  try {
    const response = await axios.get(`/artist/music`);
    return response.data;
  } catch (error: any) {
    console.error(error);
    return error.response.data;
  }
}

export const editExistingMusicTrack = async (
  axios: AxiosInstance,
  id: number,
  title: string,
  duration: number,
) => {
  try {
    const response = await axios.put(`/artist/music`, {
      id,
      title,
      duration,
    });
    return response.data;
  } catch (error: any) {
    console.error(error);
    return error.response.data;
  }
}

export const deleteExistingMusicTrack = async (
  axios: AxiosInstance,
  id: number,
) => {
  try {
    const response = await axios.delete(`/artist/music/${id}`)
    return response.data;
  } catch (error: any) {
    console.error(error);
    return error.response.data;
  }
}