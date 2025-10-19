import { createFileRoute, redirect } from "@tanstack/react-router";
import { RootPage } from "@/pages/root";
import { getLoginData } from "@/utils/user";

export const Route = createFileRoute("/")({
  beforeLoad: async () => {
    const loginData = getLoginData();
    if (loginData) {
      throw redirect({ to: "/admin/dashboard" });
    }
  },
  component: RootPage,
});
