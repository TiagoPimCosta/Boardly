import type { TokenObj } from "@/services/auth/mutations";
import authStore from "@/stores/authStore";
import dayjs from "dayjs";

export function encryptJWT(payload: Record<string, unknown>) {
  return btoa(JSON.stringify(payload));
}

export function decryptJWT(token: string) {
  const clearLoginData = authStore.getState().clearLoginData;

  try {
    const result = JSON.parse(atob(token)) as Record<string, unknown>;

    if (result?.expired_at && dayjs().isAfter(dayjs(result.expired_at as string))) {
      clearLoginData();
      window.location.href = "/";
    }

    return result;
  } catch (_error) {
    clearLoginData();
    window.location.href = "/";
  }
}

export function getLoginData() {
  const loginData = authStore.getState().loginData;
  if (!loginData) return undefined;

  return decryptJWT(loginData) as unknown as TokenObj;
}
