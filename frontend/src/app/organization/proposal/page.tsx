'use client';
import { useParams } from "next/navigation";
import BackgroundGradient from "@/components/BackgroundGradient";
import Profile from "@/components/Profile";
import { useState, useEffect } from "react";
import Proposal from "@/components/Proposal";
import { CiCirclePlus } from "react-icons/ci";
import { useRouter } from "next/navigation";
import Loader from "@/components/Loader";

const ProposalDetail = () => {
    const router = useRouter();
    const [userId, setUserId] = useState("a45321dsd5c1csc4d"); //For top right avatar
    const [proposalId, setProposalId] = useState(exampleProposal.id);
    const [proposalTitle, setProposalTitle] = useState(exampleProposal.title);
    const [proposalDescription, setProposalDescription] = useState(exampleProposal.description);
    const [proposalCreatorAddress, setProposalCreatorAddress] = useState(exampleProposal.creatorAddress);
    const [proposalDateCreated, setProposalDateCreated] = useState(exampleProposal.dateCreated);
    const [proposalStatus, setProposalStatus] = useState(exampleProposal.status);
    const [proposalNoOfStackHolders, setProposalNoOfStackHolders] = useState(exampleProposal.noOfStackHolders);


  const [isLoading, setIsLoading] = useState(false);   //Loading state
  
  const { id } = useParams();

  return (
      <div>
        <BackgroundGradient />
        <div className="flex flex-col h-screen p-8 overflow-y-scroll scroll-smooth" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
          <Profile user={userId} />
          {isLoading ? <Loader/> : (<div className="flex flex-col justify-center items-center gap-y-10">
            <h1 className="text-6xl text-third font-extrabold mb-8 z-10">{proposalTitle}</h1>
            <div className="border flex flex-col h-auto p-16 w-3/5 gap-y-8 rounded-[20px] z-10 bg-[white]/[0.04] border-[white]/[0.08]">
              <h1>{proposalDescription}</h1>
              <div className="flex gap-x-10">
                <div className="flex flex-col w-auto">
                  <h1>Proposal ID:</h1>
                  <h1>Date Created: </h1>
                  <h1>Creator Address: </h1>
                  <h1>No. of Stackholders: </h1>
                </div>
                <div className="flex flex-col w-auto">
                  <h1>{proposalId}</h1>
                  <h1>{proposalDateCreated}</h1>
                  <h1>{proposalCreatorAddress}</h1>
                  <h1>{proposalNoOfStackHolders}</h1>
                </div>
              </div>
            </div>
            <div className="flex flex-row  items-baseline mt-24 w-3/5 justify-center">
              <h1 className="text-6xl text-fourth font-extrabold mb-8 z-10 text-center w-full">
                Vote
              </h1>
            </div>
            
            <div className="border flex flex-col h-auto p-16 w-3/5 gap-y-8 rounded-[20px] z-10 bg-[white]/[0.04] border-[white]/[0.08]">
            </div>
      
            
          </div> )}
        </div>
      </div>
  );
};

export default ProposalDetail;

const exampleProposal = {
    id: "1",
    title: "Proposal 1",
    description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea ratione laboriosam, aliquid ipsam dolorem omnis minus velit reiciendis quisquam asperiores modi totam aliquam? Ducimus in voluptas doloremque esse quisquam natus quia eaque! Necessitatibus similique dolorum quidem consectetur nobis ab? Aspernatur dolor adipisci quis fuga expedita maxime ratione laborum iste animi perferendis iusto consequatur esse debitis accusamus impedit deserunt, qui vero veritatis aperiam officiis! Itaque repellendus qui quas magni voluptatum nostrum praesentium porro error cupiditate asperiores, vitae doloribus excepturi quis voluptatem ratione, pariatur officiis natus? Eveniet illo neque, necessitatibus assumenda error sint ut recusandae, consequuntur ex deleniti veritatis ipsum consequatur. Sunt.",
    creatorAddress: "0x1234567890",
    dateCreated: "2022-01-01",
    status: "Vote Pending",
    noOfStackHolders: "15",
    };
