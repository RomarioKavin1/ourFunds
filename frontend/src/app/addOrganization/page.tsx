'use client'

import { Encode_Sans } from "next/font/google";
import BackgroundGradient from "@/components/BackgroundGradient";
import { useState } from "react";
import Profile from "@/components/Profile";

const encodeSans = Encode_Sans({
  subsets: ['latin'], 
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
});

const addOrganization = ({}) => { 
  const [userId, setUserId] = useState("a45321dsd5c1csc4d");   //For top right avatar
  
  const [orgName,setOrgName] = useState("");    
  const [orgDescription,setOrgDescription] = useState("");
  const [generalDetails,setGeneralDetails] = useState("");    
  // Add more state variables for additional form fields

  const [organizationDetails, setOrganizationDetails] = useState({});  //All collected form data in a single object

  //Handler Functions for value change in form fields
  const handleOrgNameChange = (e) => {
    setOrgName(e.target.value);
    console.log(orgName);
  };

  const handleOrgDescriptionChange = (e) => {
    setOrgDescription(e.target.value);
    console.log(orgDescription);
  };

  const handleGeneralDetailsChange = (e) => {
    setGeneralDetails(e.target.value);
    console.log(generalDetails);
  };

  //Handling form submission
  const handleSubmit = async(e) => {
    e.preventDefault();
    const organizationFormDetails = {
      orgName: orgName,
      orgDescription: orgDescription,
      generalDetails: generalDetails,
    };
    
    console.log(organizationFormDetails);
    await setOrganizationDetails(organizationFormDetails);
    await console.log(organizationDetails);
  };

  return (
    <div className={encodeSans.className}>
      <div className="flex flex-col h-screen p-8">
        <BackgroundGradient />
        <Profile user={userId}/>
        <div className="ml-24 z-10">
          <h1 className="text-6xl text-third font-extrabold mb-16">Create New Organization</h1>
          <div className="border h-auto p-16 m-20 rounded-[20px] z-10 bg-[white]/[0.08] border-[white]/[0.12]">
            <form onSubmit={handleSubmit}>
              <div className="mb-8">
                <label className="block text-white text-2xl font-medium mb-6" > Organization Name</label>
                <input
                  className="w-full p-3  rounded-md bg-[white]/[0.05] border border-[white]/[0.2] text-white  hover:bg-[white]/[0.08]"
                  type="text"
                  id="orgName"
                  onChange={handleOrgNameChange}
                  placeholder="Enter organization name"
                />
              </div>
              <div className="mb-8">
                <label className="block text-white text-2xl font-medium mb-6" >Organization Description</label>
                <textarea
                    className="w-full p-3 rounded-md bg-[white]/[0.05] border border-[white]/[0.2] text-white hover:bg-[white]/[0.08]"
                    id="orgDescription"
                    onChange={handleOrgDescriptionChange}
                    placeholder="Enter organization description"
                    rows={2}
                />
              </div>
              <div className="mb-8">
                <label className="block text-white text-2xl font-medium mb-6">General Details</label>
                <textarea
                  className="w-full p-3 rounded-md bg-[white]/[0.05] border border-[white]/[0.2] text-white hover:bg-[white]/[0.08]"
                  id="generalDetails"
                  onChange={handleGeneralDetailsChange}
                  placeholder="Enter general details"
                  rows={4}
                />
              </div>
              <div className="flex justify-center">
                <button
                  className=" bg-[white]/[0.12] py-2 px-4 rounded-lg flex items-center mt-10 
                  gap-4 border-[white]/[0.2] border transition-all hover:bg-[white]/[0.2]"
                  type="submit"
                >
                Create Organization
                </button>
              </div>
            </form>
          </div>
        </div>        
      </div>
    </div>
  );
}

export default addOrganization;
