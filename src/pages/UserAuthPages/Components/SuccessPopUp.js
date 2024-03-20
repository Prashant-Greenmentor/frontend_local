import React from 'react'
import { ReactComponent as RightCheckIcon } from '../../../app/assets/RightCheckIcon.svg'
function SuccessPopUp({text,bgColor,textColor}) {
  return (
    <div className="flex w-full h-screen overflow-hidden justify-center items-center z-[100] fixed bg-black bg-opacity-50 top-0 left-0 bottom-0">
        <div className="flex flex-col justify-center items-center  w-9/12 text-xs bg-white absolute z-[1000]  border-transparent rounded-t-md">
          <div className={`flex justify-center flex-col items-center text-center w-full bg-[${bgColor}] py-10 px-4`}>
          <span className={`text-[${textColor}] text-xl`}>{text}</span>
           <RightCheckIcon className='w-40 h-40'/>
          </div>
          </div>
          </div>
  )
}

export default SuccessPopUp
