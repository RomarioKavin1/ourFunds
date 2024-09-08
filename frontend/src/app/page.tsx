"use client";

import Sponsor from "@/components/Sponser";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Kinto from "./assets/kinto.png";
import KintoW from "./assets/kintoW.svg";
import signprotocol from "./assets/signprotocol.png";
import BackgroundGradient from "@/components/BackgroundGradient";
import { fetchKYCViewerInfo } from "@/utils/kinto";
import { createKintoSDK, KintoAccountInfo } from "kinto-web-sdk";
import { KYCViewerInfo } from "./home/page";

//TODO: Import other sponser images and add the objects to the sponsorImages array

const Page = () => {
  const router = useRouter();
  const appAddress = "0x2F10715B3439a8606eF3f7a2e6927ea2da735C67";
  if (!appAddress) {
    throw new Error("NEXT_PUBLIC_KINTO_APP_ADDRESS is not defined");
  }
  const [kycInfo, setKYCInfo] = useState<KYCViewerInfo | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const kintoSDK = createKintoSDK(appAddress);
  const [kintoAccount, setKintoAccount] = useState<KintoAccountInfo>();
  const [orgs, setOrgs] = useState<any[]>([]);
  const sponsorImages = [Kinto, signprotocol];
  const handleClick = async () => {
    console.log("Button clicked");
    try {
      const accountInfo = await kintoSDK.createNewWallet();
      console.log("Connected account info:", accountInfo);
      if (accountInfo != null) {
        router.push("/home");
      }
    } catch (error) {
      console.error("Failed to connect:", error);
    }
  };
  return (
    <div className="flex flex-col h-screen">
      <BackgroundGradient />
      <div className="flex-grow mt-48 flex flex-col items-center z-10 justify-center">
        <img src="/crowdfund.png" className="w-1/4" />
        <h1 className="text-8xl font-extrabold text-third">OurFunds</h1>
        <p className="mt-10 font-medium text-xl">
          A common fund DAO (Decentralized autonomous organization) management
        </p>
        <p className="mb-10 font-medium text-xl">
          and Accountability Tool tool and Accountability Tool tool{" "}
        </p>

        {/* Onboarding button goes here */}
        <button
          className=" bg-[white]/[0.12] py-2 px-4 rounded-lg flex items-center mt-10 
          gap-4 border-[white]/[0.2] border transition-all hover:bg-[white]/[0.2]"
          type="button"
          onClick={() => {
            handleClick();
          }}
        >
          <img
            src={KintoW.src}
            alt="Login using Web3Auth"
            className="w-8 h-8"
          />
          <p className="font-sans font-thin">Login with Kinto</p>
        </button>
      </div>

      {/* Footer containing sponsors*/}
      <footer className="flex flex-col items-center justify-end mb-10 text-white p-4">
        <p className="font-encode-regular m-8">Powered by</p>
        <div className="flex flex-row items-center justify-center gap-4">
          {sponsorImages.map((image, index) => (
            <Sponsor key={index} image={image.src} />
          ))}
        </div>
      </footer>
    </div>
  );
};

export default Page;
