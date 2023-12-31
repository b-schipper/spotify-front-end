"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { registerUser } from "@/services/auth-service";
import { useAuth } from "./AuthProvider";
import { Separator } from "@radix-ui/react-separator";

const registerSchema = z.object({
  username: z.string({ required_error: "Username is required" }).min(1),
  email: z.string({ required_error: "Email is required" }).email(),
  password: z
    .string()
    .min(8, { message: "Password should be at least 8 characters" }),
});

type registerValidation = z.infer<typeof registerSchema>;

const RegisterUserForm = () => {
  const router = useRouter();
  const { accessToken, setToken } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<registerValidation>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: registerValidation) => {
    try {
      handleRegisterUser(data.username, data.email, data.password);
    } catch (error) {
      throw new Error("Something went wrong");
    }
  };

  const handleRegisterUser = async (
    username: string,
    email: string,
    password: string,
  ) => {
    try {
      const response = await registerUser(username, email, password);

      router.push("/login");
    } catch (error) {
      throw new Error("Something went wrong");
    }
  };

  return(
    <form className="flex flex-col"
          onSubmit={handleSubmit(onSubmit)}>
      <h1>Register</h1>
      <Separator className="my-2 bg-transparent" />
      <label>Username</label>
      <input 
        type="text" 
        {...register("username")}
      />
      <label>Email</label>
      <input 
        type="text" 
        {...register("email")}
      />
      <label>Password</label>
      <input 
        type="password" 
        {...register("password")}
      />
      <button type="submit">
        Register
      </button>
      <Separator className="my-4 bg-transparent" />
      <div>
        <span>Already have an account?</span>
        <Link href={"/login"}>Log in</Link>
      </div>
    </form>
  );
}

export default RegisterUserForm;