'use client'

import { Encode_Sans } from "next/font/google";
import React from "react";
import { PiShieldPlusLight } from "react-icons/pi";
import { PiUserCircleThin } from "react-icons/pi";
import { useState } from "react";
import { useRouter } from 'next/navigation'
import OrgCard from "@/components/Orgcard";

const encodeSans = Encode_Sans({
  subsets: ['latin'], 
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
});

const exampleOrgList = [{
  orgName: "Organization 1",
  orgDescription: "This is the first organization",
  generalDetails: "Details about the organization"
},
{
  orgName: "Organization 2",
  orgDescription: "This is the second organization",
  generalDetails: "Details about the organization"
},
{
  orgName: "Organization 3",
  orgDescription: "This is the third organization",
  generalDetails: "Details about the organization"
},
{
  orgName: "Organization 4",
  orgDescription: "This is the fourth organization",
  generalDetails: "Details about the organization"
},
{
  orgName: "Organization 5",
  orgDescription: "This is the fifth organization",
  generalDetails: "Details about the organization"
},
{
  orgName: "Organization 6",
  orgDescription: "This is the sixth organization",
  generalDetails: "Details about the organization"
},
{
  orgName: "Organization 7",
  orgDescription: "This is the seventh organization",
  generalDetails: "Details about the organization"
},
{
  orgName: "Organization 8",
  orgDescription: "This is the eighth organization",
  generalDetails: "Details about the organization"
},
{
  orgName: "Organization 9",
  orgDescription: "This is the ninth organization",
  generalDetails: "Details about the organization"
},
{
  orgName: "Organization 10",
  orgDescription: "This is the tenth organization",
  generalDetails: "Details about the organization"
}]

function page() {
  const router = useRouter();

  const [userId, setUserId] = useState("a45321dsd5c1csc4d");
  const [orgList, setOrgList] = useState(exampleOrgList);
  
  return(
    <div className={encodeSans.className}>
      {/* Top left glow effect */}
      <div className="circlePosition w-[480px] h-[400px]
      bg-first rounded-[100%] absolute z-1 top-[-40%] translate-x-[30px] translate-y-[40%] blur-[70px]">
      </div>

      <div className="flex h-screen">
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

        {/* Scrollable Content Section -left side*/}
        <main className="flex-grow z-10 h-full overflow-y-scroll scroll-smooth p-8 bg-inherit " style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>         
          <div className="flex flex-col">
            <div className="flex items-center justify-end gap-x-12">           
              <p>{userId}</p>
              <PiUserCircleThin size={48}/>
            </div>
            <h1 className="text-6xl text-third font-extrabold mb-8">Your Organizations</h1>
            <div className="flex flex-wrap ml-8 gap-x-10 gap-y-8 mt-10">
            {orgList.map((org, index) => (
                <OrgCard
                  key={index}
                  orgName={org.orgName}
                  orgDescription={org.orgDescription}
                  generalDetails={org.generalDetails}
                />
              ))}
            </div>
          </div>
        </main>
      </div>

      {/* Bottom center glow effect */}
      <div className="absolute bottom-56 left-1/2 transform -z-10 -translate-x-1/2 
        translate-y-[40%] w-[700px] h-[420px] bg-first rounded-[100%] blur-[70px]">
      </div>


    </div>
  );
}

export default page;
