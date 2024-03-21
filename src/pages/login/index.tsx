"use client";
import React, { useState } from "react";
import Image from "next/image";
import img from "../../img/bkLogin.webp";
import logo from "../../img/logo.png";
import { Input } from "@/components/Input";
import { Button } from "@/components/Button";
import { signIn } from "next-auth/react";
import { useRouter } from "next/router";

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
      <div className="w-[60vw] h-[100vh] overflow-hidden relative flex-col justify-start items-start flex">
        <Image src={img} alt="" className="w-full" />
      </div>

      <div className="w-[40vw] h-[100vh] relative flex flex-col justify-between items-center">
        <div className="w-full px-8 py-6 justify-between items-center inline-flex">
          <div className="bg-white rounded-2xl shadow border border-neutral-200 justify-center items-center flex">
            <Image className="w-[48px] h-[48px] rounded-2xl" src={logo} alt="logo" />
          </div>
        </div>

        <form
          onSubmit={(e) => formHandler(e)}
          className="w-[420px] min-h-[355px] max-h-[411px] relative flex-col justify-start items-start gap-4 inline-flex"
        >
          <div className="w-full relative FLEX-COL gap-4 mb-10">
            <h1 className="text-neutral-900 text-2xl font-semibold  leading-loose">Sign in</h1>
            <span className="w-[425px] text-neutral-500 text-sm font-normal leading-tight">
              Please, fill the form below to sign in the system.
            </span>
          </div>

          <h1 className="text-primaryred font-bold">{errors.notFound}</h1>

          <div className="w-full flex-col  relative h-[411px]">
            <div className="flex flex-col w-full gap-y-2">
              <label htmlFor="Email" className=" text-neutral-900 text-sm font-normal leading-tight">
                Email:
              </label>
              <Input
                id="email"
                type="email"
                placeholder="Enter Your Email"
                value={user.email}
                inputHandler={inputHandler}
                properties={`${errors.password && "border-red-500"}`}
              />
              <p className="flex items-center gap-2 text-red-500 text-sm font-normal leading-tight ">{errors.email}</p>
            </div>

            <div className="flex flex-col w-full gap-y-2 mt-4 ">
              <label htmlFor="Email" className=" text-neutral-900 text-sm font-normal leading-tight">
                Password:
              </label>
              <Input
                id="password"
                type="password"
                placeholder="Enter Your Password"
                value={user.password}
                inputHandler={inputHandler}
                properties={`${errors.password && "border-red-500"}`}
              />
              <p className="flex items-center gap-2 text-red-500 text-sm font-normal leading-tight ">
                {errors.password}
              </p>
            </div>

            <Button btype="submit" text="Sign Up" properties="bg-primaryred text-white mt-8" />
          </div>
        </form>

        {/* Copyright Div */}
        <div className="text-center text-neutral-500 text-sm font-normal leading-tight mb-8">Copyright {year} GMNY</div>
      </div>
    </div>
  );
}
