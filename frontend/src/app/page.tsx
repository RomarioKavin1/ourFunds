'use client'

import Sponsor from "@/components/Sponser";
import React from "react";
import { useRouter } from 'next/navigation'
import Kinto from "./assets/kinto.png";
import XMTP from "./assets/xmtp.png";
import W3Auth from "./assets/web3auth.png";
import W3AuthBW from "./assets/web3authbw.png";
import { Encode_Sans } from '@next/font/google';


const encodeSans = Encode_Sans({
  subsets: ['latin'], 
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
});
//TODO: Import other sponser images and add the objects to the sponsorImages array

export default function page({ Component, pageProps }) {
  const router = useRouter();

  const sponsorImages = [Kinto, XMTP, W3Auth];

  return (
  <div className={encodeSans.className}>
    <div className="flex flex-col h-screen">
      
      {/* Top left glow effect */}
      <div className="circlePosition w-[480px] h-[400px]
       bg-first rounded-[100%] absolute z-1 top-[-40%] translate-x-[30px] translate-y-[40%] blur-[70px]">
      </div>
  
      {/* Navbar */}
      {/* <nav className=" bg-[white]/[0.12] h-12 rounded-lg mt-10 w-4/5 mx-auto text-white p-4">
        <h1 className="text-lg font-bold"></h1>
      </nav> */}
  
        {/* Hero Section */}
      <div className="flex-grow mt-48 flex flex-col items-center justify-center">
        <h1 className="text-8xl font-extrabold text-third">OurFunds</h1>
        <p className="font-light m-10">A common fund DAO (Decentralized autonomous organization) management tool </p>
          
  
        {/* Onboarding button goes here */}
        <button className=" bg-[white]/[0.12] py-2 px-4 rounded-lg flex items-center mt-10 
          gap-4 border-[white]/[0.2] border transition-all hover:bg-[white]/[0.2]" 
          type="button" onClick={() => router.push('/home')}>
          <img src={W3AuthBW.src} alt="Login using Web3Auth" className="w-8 h-8"/>
          <p className="font-sans font-thin">Login with Web3Auth</p>
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
  
      {/* Bottom center glow effect */}
      <div className="absolute bottom-56 left-1/2 transform -z-10 -translate-x-1/2 
        translate-y-[40%] w-[700px] h-[420px] bg-first rounded-[100%] blur-[70px]">
      </div>
   
    </div>
  </div>
  )}

