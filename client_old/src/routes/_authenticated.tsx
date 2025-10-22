import { createFileRoute, Outlet } from "@tanstack/react-router";
import { checkIfAuthenticated } from "@/utils/auth";

export const Route = createFileRoute("/_authenticated")({
  beforeLoad: async () => {
    checkIfAuthenticated();
  },
  component: () => <Outlet />,
});
