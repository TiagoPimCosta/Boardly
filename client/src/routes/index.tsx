import { createFileRoute } from "@tanstack/react-router";
import { RootPage } from "@/pages/root";

export const Route = createFileRoute("/")({
  component: RootPage,
});
