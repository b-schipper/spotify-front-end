"use client";
import { MusicTrack } from "@/types/types";
import { axiosInstance } from "@/services/axios-service";
import { likeMusicTrack } from "@/services/musictrack-service";
import Image from "next/image";
import { useEffect, useState } from "react";

const MusicListItem = ({track}: {track: MusicTrack}) => {
  // true/false like status
  const [likeStatus, setLikeStatus] = useState(track.likeStatus);
  const [buttonText, setButtonText] = useState("Like");

  useEffect(() => {
    if (likeStatus) {
      setButtonText("Unlike");
    } else {
      setButtonText("Like");
    }
  }, [likeStatus]);

  const instance = axiosInstance();

  const handleLikeMusicTrack = async (
    id: number,
  ) => {
    try {
      const responseTrack = await likeMusicTrack(instance, id);
      setLikeStatus(responseTrack.likeStatus);
    } catch (error) {
      console.error("Error liking MusicTracks:", error);
    }
  }

  return (
    <div className="flex flex-col items-center h-60 w-50 mx-10">
      <button key={track.id}>
        <Image 
          src="/see-you-again.jpeg"
          alt="Album Cover"
          width={160}
          height={160}
        />
      </button>
      <h1><i>{track.title}</i></h1>
      <span>Artist: <b>{track.artistName}</b></span>
      <button onClick={e => handleLikeMusicTrack(track.id)}>{buttonText}</button>
    </div>
  )
}

export default MusicListItem;