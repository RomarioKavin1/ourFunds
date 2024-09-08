import React, { useState } from "react";
import KintoW from "../app/assets/kintoW.svg";
import Green from "../app/assets/circlegreen.svg";
import Orange from "../app/assets/circleorange.svg";
import Modal from "./Modal";

const Profile = ({ user }: { user: `0x${string}` | undefined }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [isKYC, setIsKYC] = useState(true);
  const [isCorporate, setIsCorporate] = useState(false);
  const [isSanctionsSafe, setIsSanctionsSafe] = useState(true);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };
  function shortenAddress(address: string, chars = 4): string {
    return `${address.slice(0, chars + 2)}...${address.slice(-chars)}`;
  }
  return (
    <div className="flex items-center gap-x-10 w-auto justify-end mb-12">
      <div
        className="flex gap-x-6 items-center w-auto text-[white]/[0.75] bg-[white]/[0.04] border border-[white]/[0.06] transition hover:bg-[white]/[0.2] py-3 px-6 rounded-full cursor-pointer"
        onClick={handleOpenModal}
      >
        {isKYC ? (
          <img
            src={Green.src}
            alt="KYC"
            style={{ width: "15px", height: "15px" }}
          />
        ) : (
          <img
            src={Orange.src}
            alt="KYC"
            style={{ width: "15px", height: "15px" }}
          />
        )}
        <p>KYC</p>
      </div>
      <div className="flex gap-x-6 items-center w-auto text-[white]/[0.75] bg-[white]/[0.04] border border-[white]/[0.06] transition hover:bg-[white]/[0.2] py-3 px-6 rounded-full">
        <img
          src={KintoW.src}
          alt="User"
          style={{ width: "22px", height: "22px" }}
        />
        <p>{shortenAddress(user || "Login")}</p>
      </div>

      {isModalOpen && (
        <Modal
          onClose={handleCloseModal}
          isCorporate={undefined}
          isSanctionsSafe={undefined}
        />
      )}
    </div>
  );
};

export default Profile;
