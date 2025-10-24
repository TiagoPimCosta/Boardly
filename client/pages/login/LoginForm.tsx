"use client";

import { useForm } from "react-hook-form";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useLogin } from "@/services/auth/mutations";
import { useState } from "react";
import { Alert, AlertTitle } from "@/components/ui/alert";
import { ShieldX } from "lucide-react";
import { useRouter } from "next/navigation";
import { setAccessToken, setRefreshToken } from "@/lib/cookies";

const loginSchema = z.object({
  username: z.string().min(2).max(50),
  password: z.string().min(5).max(18),
});

type LoginSchema = z.infer<typeof loginSchema>;

export const LoginForm = () => {
  const [credentialError, setCredentialError] = useState<string | undefined>(undefined);

  const router = useRouter();
  const loginUser = useLogin();

  const form = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  async function onSubmit(data: LoginSchema) {
    const { username, password } = data;

    try {
      setCredentialError(undefined);

      const response = await loginUser.mutateAsync({ username, password });

      if (response?.accessToken) {
        await setAccessToken(response.accessToken);
        await setRefreshToken(response.refreshToken);

        router.push("/");
      } else {
        throw new Error("Invalid response from server");
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "An unexpected error occurred";
      setCredentialError(errorMessage);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        {credentialError && (
          <Alert variant="destructive">
            <ShieldX />
            <AlertTitle>{credentialError}</AlertTitle>
          </Alert>
        )}
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input className="text-base" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input type="password" className="text-base" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button className="mt-4 w-full" type="submit" disabled={loginUser.isPending}>
          Log in
        </Button>
      </form>
    </Form>
  );
};
