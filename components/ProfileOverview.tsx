import { useEffect, useState } from "react";
import ProfileItem from "@/components/ProfileItem";
import { getUserProfile } from "@/services/profile-service";
import { axiosInstance } from "@/services/axios-service";
import { Profile } from "@/types/types";

const ProfileOverview = () => {
  const [profile, setProfile] = useState<Profile>();

  const instance = axiosInstance();

  useEffect(() => {
    fetchProfile();
  }, [0]);

  const fetchProfile = async () => {
    try {
      const data = await getUserProfile(instance);
      setProfile(data as Profile);
    } catch (error) {
      console.error("Error fetching Profile:", error);
    }
  }

  return (
    <div>
      <h1 className="mt-8 text-sm text-black">Your Profile</h1>
      { profile != undefined && <ProfileItem profile={profile}/> }
    </div>
  );
}

export default ProfileOverview;