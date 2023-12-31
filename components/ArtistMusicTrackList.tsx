"use client";
import { z } from "zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { MusicTrack } from "@/types/types";
import { axiosInstance } from "@/services/axios-service";
import { deleteExistingMusicTrack, getAllArtistMusicTracks } from "@/services/artist-service";
import ArtistMusicListItem from "@/components/ArtistMusicListItem";
import NewMusicTrackForm from "@/components/NewMusicTrackForm";
import { useEffect, useState } from "react";
import { Separator } from "@radix-ui/react-separator";

const musicTrackSchema = z.object({
  musicId: z.string()//.min(1, { message: "Duration is required" }),
});

type musicTrackValidation = z.infer<typeof musicTrackSchema>;

const ArtistMusicTrackList = ({role}: {role: string}) => {
  const [artistMusic, setArtistMusic] = useState<MusicTrack[]>([]);

  const instance = axiosInstance();

  useEffect(() => {
    fetchData();
  }, [0]);

  const fetchData = async () => {
    try {
      const data = await getAllArtistMusicTracks(instance);
      setArtistMusic(data as MusicTrack[]);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<musicTrackValidation>({
    resolver: zodResolver(musicTrackSchema),
  });

  const onSubmit = async (data: any) => {
    try {
      handleCreation(data.musicId);
    } catch (error) {}
  };

  const handleCreation = async (
    musicId: number,
  ) => {
    try {
      const response = await deleteExistingMusicTrack(instance, musicId);

    } catch (error) {
      throw new Error("Something went wrong");
    }
  };

  return (
    <div className="flex flex-wrap flex-col items-center mx-10">
      <NewMusicTrackForm />

      <Separator className="my-4 bg-transparent" />
      <div className="flex flex-wrap flex-col items-center mx-10">
        <h1>Your music</h1>
        <Separator className="my-2 bg-transparent" />
        { artistMusic.length >= 1 &&
          artistMusic.map(track => (
            <ArtistMusicListItem track={track}/>))
        }
      </div>
      <Separator className="my-4 bg-transparent" />

      <form className="flex flex-col mx-10"
            onSubmit={handleSubmit(onSubmit)}>
        <h1>Delete a music track</h1>
        <Separator className="my-2 bg-transparent" />
        <input 
          id="musicId"
          type="number"
          {...register("musicId")}
        />
        <Separator className="my-1 bg-transparent" />
        <button type="submit">Delete</button>
      </form>
    </div>
  );
}

export default ArtistMusicTrackList;