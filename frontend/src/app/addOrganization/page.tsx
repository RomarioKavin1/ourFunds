'use client'

import { Encode_Sans } from "next/font/google";
import BackgroundGradient from "@/components/BackgroundGradient";
import Profile from "@/components/Profile";  
import { useState } from "react";

const encodeSans = Encode_Sans({
  subsets: ['latin'], 
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
});

const addOrganization = ({}) => {
  const [userId, setUserId] = useState("a45321dsd5c1csc4d");
  
  return (
    <div className={encodeSans.className}>
      <div className="flex flex-col h-screen z-10 p-8">
        <BackgroundGradient />
        <Profile user={userId}/>
        <div className="ml-24 z-10">
          <h1 className="text-6xl text-third font-extrabold mb-8">Create New Organization</h1>
        </div>
      
        
      </div>
    </div>
  );
}

export default addOrganization;
