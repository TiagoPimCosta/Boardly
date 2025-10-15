import { useMutation } from "@tanstack/react-query";

const API_ENDPOINT_URL = import.meta.env.VITE_API_ENDPOINT_URL;

interface LoginBody {
  username: string;
  password: string;
}

interface LoginResponse {
  accessToken: string;
  refreshToken: string;
}

export async function login(body: LoginBody) {
  return fetch(API_ENDPOINT_URL + "/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
}

export function useLogin() {
  return useMutation<LoginResponse, Error, LoginBody>({
    mutationFn: async (body) => {
      const response = await login(body);

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message);
      }

      const data = await response.json();
      return data as LoginResponse;
    },
  });
}
