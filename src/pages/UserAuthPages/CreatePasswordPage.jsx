import React from 'react'
import CreatePasswordForm from '../../components/auth/CreatePasswordForm'
import CommonLeftBlock from '../../components/auth/CommonLeftBlock'

function CreatePasswordPage() {
  return (
    <div className="flex flex-col lg:flex-row w-full">
      <div className="lg:w-1/2">
        <CommonLeftBlock />
      </div>

      <CreatePasswordForm/>
    </div>
  )
}

export default CreatePasswordPage
