import React from 'react';
import { useRouter } from 'next/navigation';

const OrgCard: React.FC<OrgCardProps> = ({ id, orgName, orgDescription, generalDetails }) => {
  const router = useRouter();

  const handleClick = () => {
    router.push(`/organization/${id}`);
  };

  return (
    <div
      onClick={handleClick}
      className="cursor-pointer flex flex-col w-96 h-auto bg-[white]/[0.04] border border-[white]/[0.06] transition
        hover:bg-[white]/[0.2] rounded-[28px] backdrop-blur-[150px] shadow-lg p-14 drop-shadow-2xl"
    >
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
}
