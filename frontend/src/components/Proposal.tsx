import React from 'react';
import Pending from '@/app/assets/Clock.svg';
import Approved from '@/app/assets/checkmark.svg';
import Rejected from '../app/assets/cancel.svg';
import { useRouter } from 'next/navigation';

const Proposal = ({ orgid, id, title, creatorAddress, status }) => {    
    const router = useRouter();

    const getStatusIcon = () => {
        switch (status) {
            case 'Vote Pending':
                return Pending;
            case 'Approved':
                return Approved;
            case 'Rejected':
                return Rejected;
            default:
                return Pending;
        }
    };

    return (
        <button onClick={() => router.push(`/organization/proposal?orgid=${orgid}&proposalid=${id}`)}>
            <div className=" flex h-auto py-6 px-16 items-center w-auto max-w-3/5 rounded-[14px] z-10 
            bg-[white]/[0.04] border border-[white]/[0.06] transition
        hover:bg-[white]/[0.2]  shadow-lg  drop-shadow-2xl">
                <p className="w-24 ">{id}</p> 
                <p className="w-80 px-20">{title}</p> 
                <p className="w-64 pl-20">{creatorAddress}</p> 
                <div className="flex items-center justify-end gap-x-10 w-64"> 
                    <p className="mr-2">{status}</p>
                    <img src={getStatusIcon().src} alt={status} style={{ width: '24px', height: '24px' }} />
                </div>
            </div>
        </button>
    );
};

export default Proposal;
