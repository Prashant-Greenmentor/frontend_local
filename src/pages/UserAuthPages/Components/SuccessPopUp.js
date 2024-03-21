import React from 'react'
import { ReactComponent as RightCheckIcon } from '../../../app/assets/RightCheckIcon.svg'
import { ReactComponent as RightCheckIcon2 } from '../../../app/assets/VerifiedAccount.svg'
function SuccessPopUp({text,bgColor,textColor}) {
  return (
    <div className="flex w-full h-screen overflow-hidden justify-center items-center z-[100] fixed bg-black bg-opacity-50 top-0 left-0 bottom-0">
        <div className="flex flex-col justify-center items-center h-1/3 w-1/2 transform transition-all duration-300 lg:w-1/3 text-xs  absolute z-[1000] bg-white  border-transparent rounded-3xl">
          <div className={`flex justify-center h-full flex-col items-center text-center shadow w-full bg-[#EEFFF9] py-10 px-4 rounded-3xl transform transition-all duration-300`}>
           <RightCheckIcon2 className='w-20 h-20'/>
           
          <span className={`text-[#02AB6C] text-4xl font-semibold`}>{text}</span>
          </div>
          </div>
          </div>
  )
}

export default SuccessPopUp
