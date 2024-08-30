import React from 'react';
import { Encode_Sans } from "next/font/google";

const encodeSans = Encode_Sans({
    subsets: ['latin'], 
    weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  });

const OrgCard = ({orgName, orgDescription, generalDetails }) => {
  return (
    <div className={encodeSans.className}>
        <div className="flex flex-col w-96 h-72 bg-[white]/[0.08] border border-[white]/[0.12] transition-all
         hover:bg-[white]/[0.2] rounded-[28px] backdrop-blur-[150px] shadow-lg p-10">
          <h1 className='font-semibold text-3xl'>{orgName}</h1>
          <p className='font-normal mt-6'>{orgDescription}</p>
          <p className='font-thin mt-7'>{generalDetails}</p>
        </div>
    </div>
  );
};

export default OrgCard; 
