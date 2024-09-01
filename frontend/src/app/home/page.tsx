'use client'

import React from "react";
import { PiShieldPlusLight } from "react-icons/pi";
import { useState } from "react";
import { useRouter } from 'next/navigation'
import OrgCard from "@/components/Orgcard";
import BackgroundGradient from "@/components/BackgroundGradient";
import Profile from "@/components/Profile";
//TODO: Add random image/color generator for org cards 


const exampleOrgList = [{
  id: "322344",
  orgName: "NFT Hub Organization",
  orgDescription: "#322344",
  generalDetails: "NFT Hub is a platform for NFT enthusiasts to share their collections and connect with other collectors."
},
{ 
  id: "322356",
  orgName: "Crypto Club",
  orgDescription: "#322356",
  generalDetails: "Crypto Club is a community of crypto enthusiasts who share their knowledge and insights about the crypto world."
},
{ 
  id: "322357",
  orgName: "Organization 3",
  orgDescription: "#322357",
  generalDetails: "Details about the organization"
},
{ 
  id: "322358",
  orgName: "Organization 4",
  orgDescription: "#322358",
  generalDetails: "Details about the organization"
},
{ 
  id: "322359",
  orgName: "Organization 5",
  orgDescription: "#322359",
  generalDetails: "Details about the organization"
},
{ 
  id: "322360",
  orgName: "Organization 6",
  orgDescription: "#322360",
  generalDetails: "Details about the organization"
},
{ 
  id: "322361",
  orgName: "Organization 7",
  orgDescription: "#322361",
  generalDetails: "Details about the organization"
},
{ 
  id: "322362",
  orgName: "Organization 8",
  orgDescription: "#322362",
  generalDetails: "Details about the organization"
},
{ 
  id: "322363",
  orgName: "Organization 9",
  orgDescription: "#322363",
  generalDetails: "Details about the organization"
},
{ 
  id: "322364",
  orgName: "Organization 10",
  orgDescription: "#322364",
  generalDetails: "Details about the organization"
}]

function page() {
  const router = useRouter();

  const [userId, setUserId] = useState("a45321dsd5c1csc4d");
  const [orgList, setOrgList] = useState(exampleOrgList);
  
  return(
      <div className="flex h-screen">
        <BackgroundGradient />
        {/* Sidebar */}
        <aside className="w-3/5 max-w-md bg-inherit text-white rounded-2xl border border-white/10 m-4 p-4 sticky top-0 h-[calc(100vh-32px)] overflow-hidden">
          <ul className="flex flex-col items-center font-light gap-y-8">
            <li className="mb-2 mt-16 w-11/12 py-5 text-center font-medium rounded-2xl">
              <button className="w-full py-5 rounded-2xl bg-[white]/[0.08] flex justify-center hover:bg-[white]/[0.2] 
              items-center gap-x-6" type="button" onClick={() => router.push('/addOrganization')}>
                <PiShieldPlusLight size={25} />
                <p>ADD ORGANIZATION</p>
              </button>
            </li>
            <li className="mb-2">VIEW STATS</li>
            <li className="mb-2">DELETE ORGANIZATION</li>
            <li className="mb-2">VIEW GRAPHS</li>
            <li className="mb-2">VIEW DATA</li>
          </ul>
        </aside>

        {/* Scrollable Content Section -right side*/}
        <main className="flex-grow z-10 h-full overflow-y-scroll scroll-smooth p-8 bg-inherit " style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>         
          <div className="flex flex-col">
            <Profile user={userId}/>
            <div className="flex flex-col justify-center items-center">
              <h1 className="text-6xl text-third font-extrabold mb-8">Your Organizations</h1>
              <div className="flex flex-wrap ml-8 gap-x-10 gap-y-14 mt-10">
              {orgList.map((org, index) => (
                  <OrgCard
                    key={index}
                    id={org.id}
                    orgName={org.orgName}
                    orgDescription={org.orgDescription}
                    generalDetails={org.generalDetails}
                  />
                ))}
              </div>
            </div>
          </div>
        </main>
      </div>
  );
}

export default page;
