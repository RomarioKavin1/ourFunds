'use client';
import { useParams } from "next/navigation";
import BackgroundGradient from "@/components/BackgroundGradient";
import Profile from "@/components/Profile";
import { useState, useEffect } from "react";
import Proposal from "@/components/Proposal";
import { CiCirclePlus } from "react-icons/ci";
import { useRouter } from "next/navigation";
import Loader from "@/components/Loader";
import CastVote from '../../assets/castvote.svg';
import CheckMark from '../../assets/checkmark.svg';
import Cancel from '../../assets/cancel.svg';
import { Modal, Box, Slider, Typography, Button } from "@mui/material";
import { useSearchParams } from "next/navigation";

const ProposalDetail = () => {
    const router = useRouter();
    const [userId, setUserId] = useState("a45321dsd5c1csc4d"); // For top right avatar
    const [proposalId, setProposalId] = useState(exampleProposal.id);
    const [proposalTitle, setProposalTitle] = useState(exampleProposal.title);
    const [proposalDescription, setProposalDescription] = useState(exampleProposal.description);
    const [proposalCreatorAddress, setProposalCreatorAddress] = useState(exampleProposal.creatorAddress);
    const [proposalDateCreated, setProposalDateCreated] = useState(exampleProposal.dateCreated);
    const [proposalStatus, setProposalStatus] = useState(exampleProposal.status);
    const [proposalNoOfStackHolders, setProposalNoOfStackHolders] = useState(exampleProposal.noOfStackHolders);

    const [isModalOpen, setIsModalOpen] = useState(false); // State to handle modal visibility
    const [sliderValue, setSliderValue] = useState(50); // Default value for slider
    const [submittedValue, setSubmittedValue] = useState<number | null>(null); // Submitted value state

    const [isLoading, setIsLoading] = useState(false); 

    const searchParams = useSearchParams();
    const proposalid = searchParams.get('proposalid');
    const orgid = searchParams.get('orgid');

    const handleClick = () => {
        setIsModalOpen(true); // Open modal on click
    };

    const handleSliderChange = (event: Event, newValue: number | number[]) => {
        setSliderValue(newValue as number); // Update slider value as user changes it
    };

    const handleSubmit = () => {
        setSubmittedValue(sliderValue); // Set the state to slider value
        setIsModalOpen(false); // Close modal
        console.log("Submitted vote:", sliderValue); // Print value to console
        setTimeout(() => {
            router.push(`/organization?orgid=${orgid}`);
        }, 2000);
    };

    const renderStatusContent = () => {
        switch (proposalStatus) {
            case "Vote Pending":
                return (
                    <div className="border flex flex-col justify-center items-center h-auto p-52 w-3/5 gap-y-24 rounded-[20px] 
                    z-10 bg-[white]/[0.04] hover:bg-[white]/[0.08] border-[white]/[0.08]" onClick={handleClick}>
                        <p className="w-3/ text-lg text-center">It seems that you have not voted yet, cast your vote for the proposal which will be aggregated with votes for other stakeholders</p>
                        <img src={CastVote.src} style={{ width: '100px', height: '100px' }} alt="Cast Vote" />
                    </div>
                );
            case "Approved":
                return (
                    <div className="border flex flex-col justify-center items-center h-auto p-52 w-3/5 gap-y-24 rounded-[20px] 
                    z-10 bg-[white]/[0.04] hover:bg-[white]/[0.08] border-[white]/[0.08]" onClick={handleClick}>
                        <p className="w-3/ text-lg text-center">The proposal has been approved. Thank you for your vote!</p>
                        <img src={CheckMark.src} style={{ width: '100px', height: '100px' }} alt="Approved" />
                    </div>
                );
            case "Rejected":
                return (
                    <div className="border flex flex-col justify-center items-center h-auto p-52 w-3/5 gap-y-24 rounded-[20px] 
                    z-10 bg-[white]/[0.04] hover:bg-[white]/[0.08] border-[white]/[0.08]" onClick={handleClick}>
                        <p className="w-3/ text-lg text-center">The proposal has been rejected. Thank you for your vote!</p>
                        <img src={Cancel.src} style={{ width: '100px', height: '100px' }} alt="Rejected" />
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <div>
            <BackgroundGradient />
            <div className="flex flex-col h-screen p-8 overflow-y-scroll scroll-smooth" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
                <Profile user={userId} />
                {isLoading ? <Loader /> : (
                    <div className="flex flex-col justify-center items-center gap-y-10">
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
                        <div className="flex flex-row items-baseline mt-24 w-3/5 justify-center">
                            <h1 className="text-6xl text-fourth font-extrabold mb-8 z-10 text-center w-full">
                                Vote
                            </h1>
                        </div>
                        {renderStatusContent()}
                        <Modal
                            open={isModalOpen}
                            onClose={() => setIsModalOpen(false)} // Close modal when clicked outside
                            aria-labelledby="vote-modal-title"
                            aria-describedby="vote-modal-description"
                        >
                            <Box
                                className="flex flex-col justify-center items-center gap-6 gap-y-12 p-10 rounded-lg"
                                sx={{
                                    bgcolor: 'rgba(255, 255, 255, 0.04)', // Semi-transparent white for a subtle background
                                    border: '1px solid rgba(255, 255, 255, 0.08)', // Light border matching previous sections
                                    boxShadow: 24,
                                    maxWidth: 400,
                                    margin: 'auto',
                                    mt: 8,
                                    p: 4,
                                    borderRadius: "20px", // Rounded corners for consistency
                                    backdropFilter: "blur(10px)", // Blurred background for a glassmorphism effect
                                    textAlign: "center",
                                    color: "rgba(255, 255, 255, 0.9)", // Light text for consistency
                                }}
                            >
                                <Typography
                                    id="vote-modal-title"
                                    variant="h6"
                                    component="h2"
                                >
                                    Cast Your Vote
                                </Typography>
                                <Slider
                                    value={sliderValue}
                                    onChange={handleSliderChange}
                                    aria-labelledby="continuous-slider"
                                    step={1}
                                    marks
                                    min={0}
                                    max={100}
                                    valueLabelDisplay="auto"
                                    valueLabelFormat={(value) => `${value}%`} // Display values as percentages
                                    sx={{
                                        width: "100%", // Full width for the slider
                                        color: "#34D399", // Accent color for the slider
                                        "& .MuiSlider-thumb": {
                                            backgroundColor: "#fff", // White thumb for contrast
                                        },
                                        "& .MuiSlider-rail": {
                                            opacity: 0.28,
                                        },
                                    }}
                                />
                                <div className="flex justify-between w-full text-lg">
                                    <Typography sx={{ color: "#EF4444" }}>Reject</Typography>
                                    <Typography sx={{ color: "#10B981" }}>Approve</Typography>
                                </div>
                                <Button
                                    variant="contained"
                                    onClick={handleSubmit}
                                    className="mt-6 px-6 py-3 bg-green-500 text-white rounded-lg"
                                    sx={{ "&:hover": { backgroundColor: "#059669" } }}
                                >
                                    Submit
                                </Button>
                            </Box>
                        </Modal>
                    </div>
                )}
            </div>
        </div>
    );
};

const exampleProposal = {
  id: "1",
  title: "Proposal 1",
  description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea ratione laboriosam, aliquid ipsam dolorem omnis minus velit reiciendis quisquam asperiores modi totam aliquam? Ducimus in voluptas doloremque esse quisquam natus quia eaque! Necessitatibus similique dolorum quidem consectetur nobis ab? Aspernatur dolor adipisci quis fuga expedita maxime ratione laborum iste animi perferendis iusto consequatur esse debitis accusamus impedit deserunt, qui vero veritatis aperiam officiis! Itaque repellendus qui quas magni voluptatum nostrum praesentium porro error cupiditate asperiores, vitae doloribus excepturi quis voluptatem ratione, pariatur officiis natus? Eveniet illo neque, necessitatibus assumenda error sint ut recusandae, consequuntur ex deleniti veritatis ipsum consequatur. Sunt.",
  creatorAddress: "0x1234567890",
  dateCreated: "2022-01-01",
  status: "Vote Pending", // Change this to "Approved" or "Rejected" to see different status content
  noOfStackHolders: "15",
  };

export default ProposalDetail;
