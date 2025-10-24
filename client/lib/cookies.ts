"use server";

import { cookies } from "next/headers";

export const setAccessToken = async (token: string): Promise<void> => {
  const cookieStore = await cookies();
  cookieStore.set({
    name: "accessToken",
    value: token,
    httpOnly: true,
    sameSite: "strict",
    //secure: true, TODO: Make this available to production time
  });
};

export const setRefreshToken = async (token: string): Promise<void> => {
  const cookieStore = await cookies();
  cookieStore.set({
    name: "refreshToken",
    value: token,
    httpOnly: true,
    sameSite: "strict",
    //secure: true, TODO: Make this available to production time
  });
};

export const getAccessToken = async (): Promise<string | undefined> => {
  const cookieStore = await cookies();
  return cookieStore.get("accessToken")?.value;
};

export const getRefreshToken = async (): Promise<string | undefined> => {
  const cookieStore = await cookies();
  return cookieStore.get("refreshToken")?.value;
};

export const removeAccessToken = async (): Promise<void> => {
  const cookieStore = await cookies();
  cookieStore.delete("accessToken");
};

export const removeRefreshToken = async (): Promise<void> => {
  const cookieStore = await cookies();
  cookieStore.delete("refreshToken");
};

export const removeBothToken = async (): Promise<void> => {
  const cookieStore = await cookies();
  cookieStore.delete("accessToken");
  cookieStore.delete("refreshToken");
};
