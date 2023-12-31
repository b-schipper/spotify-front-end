"use client";
import { useState } from "react";
import HomeButton from "@/components/HomeButton";
import ProfileOverview from "@/components/ProfileOverview";

const NavigationSidebar = () => {
  const [selectedOption, setSelectedOption] = useState("direct-messages");

  return (
    <div className="flex h-screen flex-col bg-primary-1000 p-8">
      <HomeButton />
      <ProfileOverview />
    </div>
  );
};

export default NavigationSidebar;
