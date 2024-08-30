import React from 'react';
import { Encode_Sans } from "next/font/google";

const encodeSans = Encode_Sans({
    subsets: ['latin'], 
    weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  });

const OrgCard = ({orgName, orgDescription, generalDetails }) => {
  return (
    <div className={encodeSans.className}>
        <div className="flex flex-col items-center justify-start w-36 h-36 bg-[white]/[0.08] border border-[white]/[0.12] transition-all
         hover:bg-[white]/[0.2] rounded-[28px] backdrop-blur-[150px] shadow-lg">
          <h1 className='font-medium'>Organization 1</h1>
          <p className='font-thin'>45+members</p>
        </div>
    </div>
  );
};

export default OrgCard; 
