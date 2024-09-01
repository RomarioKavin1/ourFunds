import React from 'react';
import Pending from '@/app/assets/Clock.svg';
import Approved from '@/app/assets/Check Mark.svg';
import Rejected from '@/app/assets/Cancel.svg';

const Proposal = ({ id, title, creatorAddress, status }) => {    
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
        <div className="border flex h-auto py-6 px-16 items-center w-auto max-w-3/5 rounded-[14px] z-10 
        bg-[white]/[0.04] border-[white]/[0.08] hover:bg-[white]/[0.08]">
            <p className="w-24 ">{id}</p> 
            <p className="w-80 px-20">{title}</p> 
            <p className="w-64 px-20">{creatorAddress}</p> 
            <div className="flex items-center justify-end gap-x-10 w-64"> 
                <p className="mr-2">{status}</p>
                <img src={getStatusIcon().src} alt={status} style={{ width: '24px', height: '24px' }} />
            </div>
        </div>
    );
};

export default Proposal;
