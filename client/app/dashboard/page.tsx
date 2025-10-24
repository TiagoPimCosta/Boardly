"use client";

import { Button } from "@/components/ui/button";
import { logout } from "@/lib/auth";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();

  const handleLogOut = async () => {
    await logout();
    router.push("/");
  };

  return (
    <div>
      Dashboard
      <Button onClick={handleLogOut}>Logout</Button>
    </div>
  );
}
