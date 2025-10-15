import { LoginForm } from "./LoginForm";
import { Link } from "@tanstack/react-router";

export const LoginPage = () => {
  return (
    <div className="bg-white flex justify-center items-center h-screen">
      <div className="w-1/2 h-screen hidden lg:block bg-black" />
      <div className="lg:p-36 md:p-52 sm:20 p-8 w-full lg:w-1/2 ">
        <div className="flex mb-8 justify-center">
          <Link to="/" className="flex items-center gap-2 cursor-pointer">
            <img src="/logo.png" alt="Boardly logo" className="w-10 h-10" />
            <span className="text-xl font-bold">Boardly</span>
          </Link>
        </div>
        <LoginForm />
      </div>
    </div>
  );
};
