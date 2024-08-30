import React from 'react';

const Sponsor = ({ image }: { image: any }) => {
  return (
    <div className="flex items-center justify-center w-36 h-36 bg-[white]/[0.12] transition-all
     hover:bg-[white]/[0.2] rounded-[28px] backdrop-blur-[150px] shadow-lg">
      <img src={image} alt="Sponsor" className="object-contain w-[64px] h-[64px] rounded-full"/>
    </div>
  );
};

export default Sponsor; 
