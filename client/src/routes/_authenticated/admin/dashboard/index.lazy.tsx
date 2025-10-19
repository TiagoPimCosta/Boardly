import DashboardPage from "@/pages/Admin/Dashboard";
import { createLazyFileRoute } from "@tanstack/react-router";
import { memo } from "react";

export const Route = createLazyFileRoute("/_authenticated/admin/dashboard/")({
  component: memo(DashboardPage),
});