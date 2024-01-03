import { useEffect, useState } from "react";
import ProfileItem from "@/components/ProfileItem";
import { getUserProfile } from "@/services/user-service";
import { axiosInstance } from "@/services/axios-service";
import { Profile } from "@/types/types";
import { Separator } from "@radix-ui/react-separator";

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
      <Separator className="my-10 bg-transparent" />
    </div>
  );
}

export default ProfileOverview;