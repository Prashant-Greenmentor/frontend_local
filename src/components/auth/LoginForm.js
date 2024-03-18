// /components/auth/LoginForm.js
import React from "react";
import { useDispatch } from "react-redux";
import { loginUser } from "../../features/auth/authThunks";

const LoginForm = () => {
  const dispatch = useDispatch();

  const handleLogin = async (credentials) => {
    try {
      // Dispatch the login thunk
      await dispatch(loginUser(credentials));

      // After successful login, you should have tokens in the Redux store
    } catch (error) {
      // Handle login failure
      console.error("Login failed:", error);
    }
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleLogin({
          /* your login form data */
        });
      }}
    >
      {/* Your login form fields */}
      <button type="submit">Login</button>
    </form>
  );
};

export default LoginForm;
