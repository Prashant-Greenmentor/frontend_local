import React from "react";

import { ReactComponent as Mailincoming } from "../../app/assets/Mail-incoming.svg";
import { ReactComponent as LeftArrow } from "../../app/assets/←.svg";
import { Link, useNavigate } from "react-router-dom";

function CheckInboxPage() {
    const navigate=useNavigate()
    setTimeout(() => {
        navigate("/resetpassword")
    }, 2000);
  return (
    <div className=" h-screen w-full flex justify-center items-center text-center flex-col space-x-4 gap-4">
      <Mailincoming />
      <h1 className="text-center mt-5 text-3xl">Check Inbox</h1>
      <p className="lead text-muted text-center font-weight-normal">
        For detailed instructions to reset password
      </p>

      <Link to={"/login"} className=" flex items-center justify-center gap-3">
        <LeftArrow /> Back to Login
      </Link>
    </div>
  );
}

export default CheckInboxPage;
