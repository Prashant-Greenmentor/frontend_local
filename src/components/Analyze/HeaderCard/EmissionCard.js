import React from 'react'
import { ReactComponent as IIcon } from "../../../app/assets/iCircleIcon.svg";
function EmissionCard({title,info,time,status,per,theme}) {
 
 let style={

  border: `1px solid ${theme}`,
  borderLeft:`10px solid ${theme}`,
  
 }
  return (
       <div className="min-w-48 min-h-[135px] shadow p-4 border rounded-lg flex flex-shrink-0 flex-col justify-between">
        <div className="flex items-center gap-2">
          <h3 className='font-semibold text-xl'> {title}</h3>
         <IIcon/>
        </div>
        <span className='font-thin text-xs text-gray-400'>{time||""}</span>
        <div style={style} className={`flex flex-shrink-0 w-full justify-between items-center p-2 mt-4 rounded-xl bg-${theme}-200 gap-1`}>
          <p className='flex flex-shrink-0 '>{info}</p>
          {<p className={`text-center w-1/2 text-[10px] flex justify-center items-center ${status!=="positive"?"text-green-700":"text-red-700"}`}>{per}</p>}
        </div>
      </div>
   
  )
}

export default EmissionCard
