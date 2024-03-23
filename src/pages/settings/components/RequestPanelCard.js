import React from 'react'

function RequestPanelCard({ user,request, onReject,onGrant }) {
  return (
    <div className='flex rounded-3xl  w-full justify-between items-center p-2 px-4 border-2 bg-white'>
    <p><span>{user}</span> has requested acsses to <span className='text-green-600'>{request}</span></p>
    <div className=' space-x-4'>
        <button onClick={onGrant} className='px-8 p-1 rounded-2xl text-white bg-green-500'>Grant Access</button>
        <button onClick={onReject} className='px-8 p-1 rounded-2xl text-white bg-red-500'>Reject Access</button>
    </div>
      
    </div>
  )
}

export default RequestPanelCard
