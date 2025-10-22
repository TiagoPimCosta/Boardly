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
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Terminal } from "lucide-react";
import useAuthStore from "@/stores/authStore";
import { encryptJWT } from "@/utils/user";
import { getRouteApi } from "@tanstack/react-router";

const loginSchema = z.object({
  username: z.string().min(2).max(50),
  password: z.string().min(5).max(18),
});

type LoginSchema = z.infer<typeof loginSchema>;

const route = getRouteApi("/login");

export const LoginForm = () => {
  const navigate = route.useNavigate();

  const [credentialError, setCredentialError] = useState(false);
  const setUser = useAuthStore((state) => state.setLoginData);

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
      const response = await loginUser.mutateAsync({ username, password });

      console.log("Submit Data ", data);
      console.log("Response ", response);

      if (response) {
        setCredentialError(false);
        const encryptedUser = encryptJWT({
          ...(response as unknown as Record<string, unknown>),
        });

        setUser(encryptedUser);
        navigate({ to: "/" });
      }
    } catch (_error) {
      setCredentialError(true);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        {credentialError && (
          <Alert variant="destructive">
            <Terminal />
            <AlertTitle>Heads up!</AlertTitle>
            <AlertDescription>
              You can add components and dependencies to your app using the cli.
            </AlertDescription>
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
        <Button className="mt-4 w-full" type="submit">
          Log in
        </Button>
      </form>
    </Form>
  );
};
