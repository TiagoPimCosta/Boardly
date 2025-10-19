import { Button } from "@/components/ui/button";
import { useNavigate } from "@tanstack/react-router";
import dayjs from "dayjs";
import useAuthStore from "@/stores/authStore";

export default function DashboardPage() {
  const navigate = useNavigate();
  const clearUser = useAuthStore((state) => state.clearLoginData);

  const getGreeting = () => {
    const hour = dayjs().hour();
    if (hour < 12) return "Good Morning";
    if (hour < 18) return "Good Afternoon";
    return "Good Evening";
  };

  const greeting = getGreeting();
  const message = `${greeting}, Tiago Costa`;

  const logout = async () => {
    try {
      clearUser();
      navigate({ to: "/" });
    } catch (_error) {}
  };

  return (
    <div className="main-container overflow-auto">
      <div className="flex flex-col flex-nowrap gap-2">
        <div className="text-2xl font-bold">{message}</div>
        <div className="text-gray-500/70 capitalize">{`${dayjs().format("dddd, DD MMMM")}`}</div>
        <Button onClick={logout}>Logout</Button>
      </div>
    </div>
  );
}
