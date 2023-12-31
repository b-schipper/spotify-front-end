"use client";
import { MusicTrack } from "@/types/types";
import { Separator } from "@radix-ui/react-separator";
import Image from "next/image";

const ArtistMusicListItem = ({track}: {track: MusicTrack}) => {

  return (
    <div className="flex flex-col h-30 w-40 mx-10">
      <h1><i>{track.id} - {track.title}</i></h1>
      <Separator className="my-1 bg-transparent" />
    </div>
  )
}

export default ArtistMusicListItem;