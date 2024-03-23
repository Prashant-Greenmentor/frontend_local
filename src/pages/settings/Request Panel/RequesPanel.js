import React from 'react'
import { useSelector } from 'react-redux'
import RequestPanelCard from '../components/RequestPanelCard'

function RequesPanel() {
    const {requestPanelData}=useSelector((state)=>state.setting)
function onReject(){
    
}
function onGrant(){

}
  return (
    <div className='p-4 flex flex-col space-y-2 justify-center items-center'>
      {requestPanelData.map((request)=>{
        return(
            <RequestPanelCard onGrant={onGrant} onReject={onReject} {...request}/>
        )
      })}
    </div>
  )
}

export default RequesPanel
