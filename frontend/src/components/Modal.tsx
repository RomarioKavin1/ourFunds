import React from "react";
import Green from "../app/assets/circlegreen.svg";
import Orange from "../app/assets/circleorange.svg";

const Modal = ({ onClose,isCorporate,isSanctionsSafe }) => {

  
  const handleClickOutside = (e: React.MouseEvent) => {
    
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      onClick={handleClickOutside}
      className="fixed inset-0 z-50 flex items-center justify-center bg-[black]/[0.92]"
    >
      <div className="bg-[white]/[0.04] border border-[white]/[0.06] p-8 rounded-2xl shadow-lg max-w-lg w-full">
       <div className="flex justify-center items-center gap-x-5 mb-6">
         <h2 className="text-[white] text-xl">Corporate</h2>
         {(isCorporate) ? (<img src={Green.src} alt="KYC" style={{ width: "15px", height: "15px" }} />) :
         (<img src={Orange.src} alt="KYC" style={{ width: "15px", height: "15px" }} />)}
         <h2 className="text-[white] text-xl">Individual</h2>
         {(!isCorporate) ? (<img src={Green.src} alt="KYC" style={{ width: "15px", height: "15px" }}/>) :
         (<img src={Orange.src} alt="KYC" style={{ width: "15px", height: "15px" }} />)}
       </div>
       <div className="flex justify-center items-center gap-x-5">
       <h2 className="text-[white] text-xl">Safe Sanctions</h2>
         {(isSanctionsSafe) ? (<img src={Green.src} alt="KYC" style={{ width: "15px", height: "15px" }} />) :
         (<img src={Orange.src} alt="KYC" style={{ width: "15px", height: "15px" }} />)}
       </div>
        
        {/* <button
          onClick={onClose}
          className="mt-4 py-2 px-4 bg-[white]/[0.01] border border-[white]/[0.06] rounded-full text-[white]/[0.75] hover:bg-[white]/[0.04]"
        >
          Close
        </button> */}
      </div>
    </div>
  );
};

export default Modal;
