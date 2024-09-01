import React from 'react';
import { useRouter } from 'next/navigation';
import Random1 from '../app/assets/Random1.svg';
import Random2 from '../app/assets/Random2.svg';
import Random3 from '../app/assets/Random3.svg';
import Random4 from '../app/assets/Random4.svg';
import Random5 from '../app/assets/Random5.svg';
import Random6 from '../app/assets/Random6.svg';
import Random7 from '../app/assets/Random7.svg';
import Random8 from '../app/assets/Random8.svg';

const images = [Random1.src, Random2.src, Random3.src, Random4.src, Random5.src, Random6.src, Random7.src, Random8.src];

const OrgCard: React.FC<OrgCardProps> = ({ id, orgName, orgDescription, generalDetails, imageIndex }) => {
  const router = useRouter();

  const handleClick = () => {
    router.push(`/organization/${id}`);
  };

  return (
    <div
      onClick={handleClick}
      className="relative cursor-pointer flex flex-col w-96 h-auto bg-[white]/[0.04] border border-[white]/[0.06] transition
        hover:bg-[white]/[0.2] rounded-[28px] backdrop-blur-[150px] shadow-lg p-14 drop-shadow-2xl"
    >
      {/* Sequential Image */}
      <img
        src={images[imageIndex % images.length]}
        alt="Random"
        className="absolute -top-5 -right-5 w-16 h-16 object-contain"
      />
      
      <h1 className='font-semibold text-3xl'>{orgName}</h1>
      <p className='font-normal mt-4'>{orgDescription}</p>
      <p className='font-thin mt-6'>{generalDetails}</p>
    </div>
  );
};

export default OrgCard;

interface OrgCardProps {
  id: string;
  orgName: string;
  orgDescription: string;
  generalDetails: string;
  imageIndex: number; 
}
