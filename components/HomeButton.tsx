import React from "react";
import { Separator } from "./ui/seperator";

const HomeButton = () => {

  
  <Separator className="my-4 bg-black" />
  return (
    <div>
      <Separator className="my-4 bg-transparent" />
        <button className={`flex bg-black items-center rounded-md p-2 text-white transition-all duration-300 hover:bg-primary-100 `}>
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            x="0px" 
            y="0px" 
            width="30" 
            height="30" 
            viewBox="0,0,256,256"
          >
            <g fill="#ffffff" fill-rule="nonzero" stroke="none" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="10" stroke-dasharray="" stroke-dashoffset="0" font-family="none" font-weight="none" font-size="none" text-anchor="none" ><g transform="scale(10.66667,10.66667)">
              <path d="M12,2.09961l-11,9.90039h3v9h7v-6h2v6h7v-9h3zM12,4.79102l6,5.40039v0.80859v8h-3v-6h-6v6h-3v-8.80859z"></path>
            </g></g>
          </svg>
          Home
      </button>
      <Separator className="my-4 bg-transparent" />
    </div>
  );
};

export default HomeButton;
