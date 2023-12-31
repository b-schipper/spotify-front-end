"use client";
import ArtistMusicTrackList from "@/components/ArtistMusicTrackList";
import MusicListContainer from "@/components/MusicListContainer";
import { useEffect, useState } from "react";

const MainOverview = () => {
  const [role, setRole] = useState("ROLE_USER");

  useEffect(() => {
    const role = localStorage.getItem("role");
    if (role != null) {
      setRole(role);
    }
  });

  return (
    <div className="flex flex-row items-center mx-10">
      <div className="flex flex-row items-center">
        <MusicListContainer role={role} />
      </div>
      <div className="flex flex-col items-center">
      { role === "ROLE_ARTIST" && <ArtistMusicTrackList role={role}/> }
      </div>
    </div>
  );
}

export default MainOverview;