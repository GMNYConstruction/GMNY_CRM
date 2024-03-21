"use client";
import React, { useState } from "react";
import Image from "next/image";
import img from "../img/bkLogin.webp";
import logo from "../img/logo.png";
import { Input } from "../components/Input";
import { Button } from "@/components/Button";
import { signIn } from "next-auth/react";
import { useRouter } from "next/router";
import { log } from "console";

interface User {
  email: string;
  password: string;
}

export default function Home() {
  const year = new Date().getFullYear();
  const router = useRouter();
  const [user, setUser] = useState<User>({
    email: "",
    password: "",
  });

  const [errors, setError] = useState({
    notFound: "",
    email: "",
    password: "",
  });

  const inputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUser((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const errorHandler = (id: string, text: string) => {
    setError((prev) => ({ ...prev, [id]: text }));
  };

  const formHandler = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    let err = 0;
    setError({
      notFound: "",
      email: "",
      password: "",
    });

    if (!user.email && user.email.length < 1) {
      err++;
      errorHandler("email", "Enter valid email");
    }

    if (!user.password && user.password.length < 8) {
      err++;
      errorHandler("password", "Password is too short");
    }

    if (err !== 0) return;

    const res = await signIn("credentials", {
      redirect: false,
      email: user.email,
      password: user.password,
      callbackUrl: "/",
    });

    res?.ok ? router.push("/caselist") : errorHandler("notFound", "Wrong email or password!");
  };

  return (
    <div className="w-[100vw] h-[100vh] relative pr-px bg-white  items-start flex flex-column">
      Please Login To Continue
    </div>
  );
}
