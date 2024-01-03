"use client";
import { useState } from "react";
import HomeButton from "@/components/HomeButton";
import ProfileOverview from "@/components/ProfileOverview";
import GlobalChat from "./GlobalChat";

const NavigationSidebar = () => {
  const [selectedOption, setSelectedOption] = useState("direct-messages");

  return (
    <div className="flex h-screen flex-col bg-primary-1000 p-6 w-96">
      <ProfileOverview /> 
      <GlobalChat />
    </div>
  );
};

export default NavigationSidebar;
