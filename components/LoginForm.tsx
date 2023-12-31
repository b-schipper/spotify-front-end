"use client";
import Link from "next/link";
import { z } from "zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { login } from "@/services/auth-service";
import { useRouter } from "next/navigation";
import { useAuth } from "./AuthProvider";
import { useEffect } from "react";
import { Separator } from "@radix-ui/react-separator";

const loginSchema = z.object({
  username: z.string({ required_error: "Username is required" }).min(1),
  password: z.string().min(1, { message: "Password is required" }),
});

type loginValidation = z.infer<typeof loginSchema>;

const LoginForm = () => {
  const router = useRouter();
  const { accessToken, setToken } = useAuth();

  useEffect(() => {
    if (accessToken != null) {
      router.push("/music");
    }
  }, [accessToken, router]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<loginValidation>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit: SubmitHandler<loginValidation> = async (data) => {
    try {
      handleLogin(data.username, data.password);
    } catch (error) {}
  };

  const handleLogin = async (username: string, password: string) => {
    try {
      const response = await login(username, password);

      setToken(response);

      router.push("/music");
    } catch (error) {
      throw new Error("Something went wrong");
    }
  };

  return (
    <form className="flex flex-col"
          onSubmit={handleSubmit(onSubmit)}>
      <h1>Log in</h1>
      <Separator className="my-2 bg-transparent" />
      <label>Username</label>
      <input
        id="username"
        type="text"
        {...register("username")}
      />
      <label>Password</label>
      <input 
        id="password"
        type="password" 
        {...register("password")}
      />
      <button type="submit">Log in</button>
      <Separator className="my-4 bg-transparent" />
      <div>
        <span>Don't have an account yet?</span>
        <Link href={"/register"}>Register</Link>
      </div>
    </form>

  );
}

export default LoginForm;