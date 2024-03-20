import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import SuccessPopUp from './Components/SuccessPopUp';

function UserAssignPage() {
  const navigate=useNavigate()
    const [email, setEmail] = useState('');
    const [selectedRole, setSelectedRole] = useState('');
    const [isOpenPopUp, setisOpenPopUp] = useState(false);
    // Define your array of roles with objects having id and role keys
    const roles = [
        { id: 1, role: "Admin" },
        { id: 2, role: "Manager" },
        { id: 3, role: "Data Entrent" },
        { id: 4, role: "User" }
    ];

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    }

    const handleRoleChange = (e) => {
        setSelectedRole(e.target.value);
    }
function handleInvite(){
  setisOpenPopUp(true)
  setTimeout(() => {
    
    setisOpenPopUp(false)
  }, 1000);
}
function handleFinish(){

  setTimeout(() => {
    navigate("/dashboard")
    
  }, 1000);
}
    return (
      <>

        <div className='h-screen flex flex-col justify-center items-center text-center space-y-5'>
            <h1 className='text-4xl mb-6'>You are admin by default</h1>
            <div className='flex space-y-5 space-x-1  w-fit p-2 items-end justify-center '>
                <div className='flex w-full items-end '>
                    <div className='flex flex-col'>
                        <label htmlFor="Adduser" className=" text-left">Add an user</label>
                        <div className='flex border px-6 rounded'>
                            <input 
                                className='px-2 outline-none' 
                                type="text" 
                                placeholder='Enter the email address' 
                                value={email} 
                                onChange={handleEmailChange} 
                            />
                            <select 
                                name="user" 
                                className='outline-none p-3' 
                                value={selectedRole} 
                                onChange={handleRoleChange}
                            >
                                <option value="" disabled>Select User</option>
                                {roles.map(role => (
                                    <option key={role.id} value={role.role}>{role.role}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                </div>
                <button onClick={handleInvite} className='h-fit p-3 px-5 text-white font-bold bg-green-600 rounded-md'>Invite</button>
            </div>
            <div className=' space-x-4 flex justify-center text-center items-center'>
                <Link className='text-gray-500 underline' to={"/dashboard"}>skip for now</Link>
                <button  onClick={handleFinish} className='p-3 px-5 text-white font-bold bg-green-600 rounded'>Finish</button>
            </div>
        </div>
            {isOpenPopUp && <SuccessPopUp text={"Role Assigned"} textColor={"Black"} bgColor={"#FFFFF"} />}
      </>
    );
}

export default UserAssignPage;
