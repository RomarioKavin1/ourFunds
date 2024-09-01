'use client';
import { useParams } from "next/navigation";
import BackgroundGradient from "@/components/BackgroundGradient";
import Profile from "@/components/Profile";
import { useState, useEffect } from "react";
import Proposal from "@/components/Proposal";

const OrganizationDetail = () => {
  const [userId, setUserId] = useState("a45321dsd5c1csc4d");    //For top right avatar
  const [orgId, setOrgId] = useState(exampleOrgList[0].id);
  const [orgName, setOrgName] = useState(exampleOrgList[0].orgName);
  const [orgDescription, setOrgDescription] = useState(exampleOrgList[0].orgDescription);
  const [proposals, setProposals] = useState(exampleOrgList[0].proposals);
  //Organization Details Bound to change
  const [generalDetails, setGeneralDetails] = useState(exampleOrgList[0].generalDetails);
  const [creatorAddress, setCreatorAddress] = useState(exampleOrgList[0].creatorAddress);
  const [dateCreated, setDateCreated] = useState(exampleOrgList[0].dateCreated);
  
  

  const { id } = useParams();

  return (
    <div>
      <BackgroundGradient />
      <div className="flex flex-col h-screen p-8 overflow-y-scroll scroll-smooth" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
        <Profile user={userId} />
        <div className="flex flex-col justify-center items-center gap-y-10">
          <h1 className="text-6xl text-third font-extrabold mb-8 z-10">{orgName}</h1>
          <div className="border flex flex-col h-auto p-16 w-3/5 gap-y-8 rounded-[20px] z-10 bg-[white]/[0.04] border-[white]/[0.08]">
            <h1>{generalDetails}</h1>
            <div className="flex gap-x-10">
                <div className="flex flex-col w-auto">
                    <h1>Organization ID:</h1>
                    <h1>Date Created: </h1>
                    <h1>Creator Address: </h1>
                </div>
                <div className="flex flex-col w-auto">
                    <h1>{orgId}</h1>
                    <h1>{dateCreated}</h1>
                    <h1>{creatorAddress}</h1>
                </div>
            </div>
          </div>
          <h1 className="text-6xl text-fourth font-extrabold mb-8 z-10 mt-32">Proposals</h1>
          <div className="flex flex-col gap-y-3 mb-10">
              {proposals.map((proposal) => (
                  <Proposal
                      key={proposal.id}
                      id={proposal.id}
                      title={proposal.title}
                      creatorAddress={proposal.creatorAddress}
                      status={proposal.status}
                  />
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrganizationDetail;


const exampleOrgList = [
    {
      id: "322356",
      orgName: "Crypto Club",
      orgDescription: "#322356",
      generalDetails: "Crypto Club is a community of crypto enthusiasts who share their knowledge and insights about the crypto world.",
      creatorAddress: "0x1234567890",
      dateCreated: "2022-01-01",

      //Add more general details as needed
        
      proposals: [
        { id: "#1234", title: "Proposal 1", creatorAddress: "08xasd155645dw", status: "Vote Pending" },
        { id: "#2845", title: "Proposal 2", creatorAddress: "09xsdadsdasdsd", status: "Approved" },
        { id: "#3484", title: "Proposal 3", creatorAddress: "05xg54541z5451", status: "Rejected" },
        { id: "#4551", title: "Proposal 4", creatorAddress: "08xasd155645dw", status: "Vote Pending" },
        { id: "#9855", title: "Proposal 5", creatorAddress: "09xsdadsdasdsd", status: "Approved" },
        { id: "#9526", title: "Proposal 6", creatorAddress: "05xg54541z5451", status: "Rejected" },     
      ]
    },
];