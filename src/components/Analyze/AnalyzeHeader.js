import React from 'react'
import EmissionCard from './HeaderCard/EmissionCard'
import EnergyUseCard from './HeaderCard/EnergyUseCard'

function AnalyzeHeader({emissionData,energyData}) {
 
  return (
    <div className='flex justify-start items-center overflow-auto gap-4'>
      {emissionData.map((item,index)=><EmissionCard key={index} {...item} />)}
      {energyData.map((item,index)=><EnergyUseCard key={index} {...item}/>)}
     
    </div>
  )
}

export default AnalyzeHeader
