import { Avatar, AvatarFallback } from "@/components/ui/Avatar";
import { Profile } from "@/types/types";

const ProfileItem = ({profile}: {profile: Profile}) => {

  return (
    <button className="flex flex-row items-center space-x-2 rounded-lg p-1 transition-all duration-300 hover:bg-gray-400">
      <Avatar className="h-10 w-10">
        <AvatarFallback className="pointer-events-none bg-gradient-to-br from-purple-500 to-secondary-100 text-xl capitalize">
          { 
            profile.likeBadge && <span>🤍</span> ||
            !profile.likeBadge && <span>{profile.username.charAt(0)}</span>
          }
        </AvatarFallback>
      </Avatar>
      <h1>{profile.username}</h1>
    </button>
  );
};

export default ProfileItem;