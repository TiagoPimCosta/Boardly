import { useMutation } from "@tanstack/react-query";

interface LoginBody {
  username: string;
  password: string;
}

export interface LoginResponse {
  accessToken: string;
  refreshToken: string;
}

export interface TokenObj {
  id: number;
  username: string;
  iat: number;
  exp: number;
}

export async function login(body: LoginBody) {
  return fetch("http://localhost:8080/auth/login", {
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
