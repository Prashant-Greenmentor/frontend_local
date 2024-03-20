import React from 'react'
import CommonLeftBlock from '../../components/auth/CommonLeftBlock'
import CompanyDetailsInputForm from '../../components/auth/CompanyDetailsInputForm'

function CompanyDetailsInputPage() {
  return (
    <div className="flex flex-col lg:flex-row w-full">
      <div className="lg:w-1/2">
        <CommonLeftBlock />
      </div>

      <CompanyDetailsInputForm/>
    </div>
  )
}

export default CompanyDetailsInputPage
