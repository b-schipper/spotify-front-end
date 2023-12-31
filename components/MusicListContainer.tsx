"use client";
import { MusicTrack } from "@/types/types";
import React, { useEffect, useState } from "react";
import MusicListItem from "@/components/MusicListItem";
import { getAllExistingMusicTracks, getMusicTracksLikedByUser } from "@/services/musictrack-service";
import { axiosInstance } from "@/services/axios-service";

const MusicListContainer = ({role}: {role: string}) => {
  const [musicList, setMusicList] = useState<MusicTrack[]>([]);

  const instance = axiosInstance();

  useEffect(() => {
    fetchMusicTracks();
  }, [0])
  
  const fetchMusicTracks = async () => {
    try {
      const data = await getAllExistingMusicTracks(instance);
      setMusicList(data as MusicTrack[]);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  return (
    <div className="flex flex-wrap flex-row items-center mx-10">
      <button onClick={fetchMusicTracks}>Reload music</button>
      {   musicList.length >= 1 &&
          musicList.map(track => (
            <MusicListItem track={track}/>
          ))
      }
    </div>
  );
};

export default MusicListContainer;
