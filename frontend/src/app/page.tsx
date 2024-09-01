'use client'

import Sponsor from "@/components/Sponser";
import React from "react";
import { useRouter } from 'next/navigation'
import Kinto from "./assets/kinto.png";
import KintoW from "./assets/kintoW.svg";
import XMTP from "./assets/xmtp.png";
import W3Auth from "./assets/web3auth.png";
import W3AuthBW from "./assets/web3authbw.png";
import BackgroundGradient from "@/components/BackgroundGradient";

//TODO: Import other sponser images and add the objects to the sponsorImages array

const page = () => {
  const router = useRouter();

  const sponsorImages = [Kinto, XMTP, W3Auth];

  return (
    <div className="flex flex-col h-screen">
      
      <BackgroundGradient /> 
      {/* Navbar */}
      {/* <nav className=" bg-[white]/[0.12] h-12 rounded-lg mt-10 w-4/5 mx-auto text-white p-4">
        <h1 className="text-lg font-bold"></h1>
      </nav> */}
  
        {/* Hero Section */}
      <div className="flex-grow mt-48 flex flex-col items-center z-10 justify-center">
        <h1 className="text-8xl font-extrabold text-third">OurFunds</h1>
        <p className="font-light m-10">A common fund DAO (Decentralized autonomous organization) management tool </p>
          
  
        {/* Onboarding button goes here */}
        <button className=" bg-[white]/[0.12] py-2 px-4 rounded-lg flex items-center mt-10 
          gap-4 border-[white]/[0.2] border transition-all hover:bg-[white]/[0.2]" 
          type="button" onClick={() => router.push('/home')}>
          <img src={KintoW.src} alt="Login using Web3Auth" className="w-8 h-8"/>
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
  )}

  export default page;