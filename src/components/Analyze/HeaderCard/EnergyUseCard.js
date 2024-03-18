import React from 'react'

function EnergyUseCard({ title, info, percentage}) {



  return (
    <div className="max-w-48 max-h-[135px] shadow-md p-2 border border-gray-300 rounded-lg bg-green-600 text-white flex flex-shrink-0 flex-col gap-0">
      <p className='text-xl font-semibold p-0'>{title || '-'}</p>
      <span className='text-xs text-gray-200 block font-thin'>till last quarter</span>
      <div className='flex w-full justify-between px-3 items-center' role="presentation">
        <p className='text-3xl font-bold'>{info}</p>

        {<p className={`text-center w-1/2 text-[10px] flex justify-center items-center `}>{percentage}</p>}
      </div>
    </div>
  )
}

export default EnergyUseCard