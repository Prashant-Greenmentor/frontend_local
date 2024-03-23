import React from 'react'
import { AvatarGroup } from './AvatarGroup';
import { ReactComponent as Threedots } from '../../../app/assets/ThreeDots.svg';

function DashboardCard({avatars,text ,handleclick}) {
   
  return (
    <div className='w-44  border-2 shadow p-2 rounded-md flex flex-shrink-0 flex-col bg-white' >
    <div className="flex flex-row justify-between p-1 items-start" ><span >{text}</span> <div onClick={()=>handleclick(text)} className='cursor-pointer p-1 py-2 rounded-md shadow-lg border'><Threedots  /></div></div>
      {text!='Number of Active Users'?<AvatarGroup size="sm" max={2} avatars={avatars} />:<span className='block px-4 text-xl font-semibold'>{avatars.length}</span>}
    </div>
  )
}

export default DashboardCard
