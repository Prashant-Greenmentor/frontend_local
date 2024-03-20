import CommonLeftBlock from "../../components/auth/CommonLeftBlock";
import LoginForm from "../../components/auth/LoginForm";

const LoginPage = () => {
  return (
    <div className="flex flex-col lg:flex-row w-full">
      <div className="lg:w-1/2">
        <CommonLeftBlock />
      </div>

      <LoginForm/>
    </div>
  );
};

export default LoginPage;
