import Link from "next/link";
import Image from "next/image";
import { LoginForm } from "@/pages/login/LoginForm";

export default function LoginPage() {
  return (
    <div className="bg-white flex justify-center items-center h-screen">
      <div className="w-1/2 h-screen hidden lg:block bg-black" />
      <div className="lg:p-36 md:p-52 sm:20 p-8 w-full lg:w-1/2 ">
        <div className="flex mb-8 justify-center">
          <Link href="/" className="flex items-center gap-2 cursor-pointer">
            <Image
              src="/logo.png"
              alt="Boardly logo"
              width={40}
              height={40}
              className="w-10 h-10"
            />
            <span className="text-xl font-bold">Boardly</span>
          </Link>
        </div>
        <LoginForm />
      </div>
    </div>
  );
}
