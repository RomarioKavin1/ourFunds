'use client'
import BackgroundGradient from "@/components/BackgroundGradient";
import { useState } from "react";
import Profile from "@/components/Profile";

const AddProposal= () => { 
  const [userId] = useState("a45321dsd5c1csc4d");   //For top right avatar

  
  const [proposalName, setProposalName] = useState("");
  const [proposalDescription, setProposalDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [beneficiary, setBeneficiary] = useState(""); //Add more state variables for additional form fields

  const inputFields = [
    { title: "Proposal Title", stateValue: proposalName, setter: setProposalName, textArea: false },
    { title: "Proposal Description", stateValue: proposalDescription, setter: setProposalDescription, textArea: true },
    { title: "Amount", stateValue: amount, setter: setAmount, textArea: false, eth: true },
    { title: "Beneficiary", stateValue: beneficiary, setter: setBeneficiary, textArea: false },
    // Add more fields as needed 
  ];

  
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ proposalName, proposalDescription, amount,beneficiary });
  };

  return (
    <div className="flex flex-col h-screen p-8 overflow-y-scroll scroll-smooth" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
      <BackgroundGradient />
      <Profile user={userId}/>
      
      <div className="flex flex-col justify-center items-center">
        <h1 className="text-6xl text-third z-10 font-extrabold mb-16">Create New Proposal</h1>
        <div className="border h-auto p-16 w-3/5 m-10 rounded-[20px] z-10 bg-[white]/[0.08] border-[white]/[0.12]">
            <form onSubmit={handleSubmit}>

                {inputFields.map(({ title, stateValue, setter, textArea }, index) => (
                <div key={index} className="mb-8">
                    <label className="block text-white text-2xl font-medium mb-6">{title}</label>
                    {textArea ? (
                    <textarea
                        className="w-full p-3 rounded-md bg-[white]/[0.05] border border-[white]/[0.2] text-white hover:bg-[white]/[0.08]"
                        onChange={(e) => setter(e.target.value)}
                        placeholder={`Enter ${title.toLowerCase()}`}
                        rows={4}
                        value={stateValue} // Bind stateValue directly to individual state
                    />
                    ) : (
                    <input
                        className="w-full p-3 rounded-md bg-[white]/[0.05] border border-[white]/[0.2] text-white hover:bg-[white]/[0.08]"
                        type="text"
                        onChange={(e) => setter(e.target.value)}
                        placeholder={`Enter ${title.toLowerCase()}`}
                        value={stateValue} // Bind stateValue directly to individual state
                    />
                    )}
                </div>
                ))}

                <div className="flex justify-center">
                    <button
                        className="bg-[white]/[0.12] py-2 px-4 rounded-lg flex items-center mt-10 
                        gap-4 border-[white]/[0.2] border transition-all hover:bg-[white]/[0.2]"
                        type="submit">
                        Create Proposal
                    </button>
                </div>
            </form>
        </div>
      </div>     
    </div>
  );
}

export default AddProposal;
