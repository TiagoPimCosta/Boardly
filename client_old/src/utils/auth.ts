import authStore from "@/stores/authStore";
import { redirect } from "@tanstack/react-router";
import dayjs from "dayjs";
import { getLoginData } from "./user";

export function checkIfAuthenticated() {
  const clearLoginData = authStore.getState().clearLoginData;
  const loginData = getLoginData();
  if (!loginData) {
    throw redirect({ to: "/login" });
  }

  if (dayjs().isAfter(dayjs(loginData.exp))) {
    clearLoginData();
    throw redirect({ to: "/login" });
  }

  return loginData;
}
