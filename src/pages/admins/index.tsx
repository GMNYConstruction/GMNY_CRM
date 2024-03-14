import React, { useState } from "react";
import { Button } from "@/components/Button";
import { Input } from "@/components/Input";
import register from "../api/register";
import { access } from "fs";

const Admins = () => {
  const [admin, setAdmin] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    accessLvl: "",
  });
  const [response, setResponse] = useState("");
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const inputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAdmin((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const errorHandler = (id: string, value: string) => {
    setErrors((prev) => ({ ...prev, [id]: value }));
  };

  const formHandler = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    let errors = 0;
    setErrors({
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    });

    if (!admin.email || admin.email.length < 1) {
      errorHandler("email", "Please enter valid Email!");
      errors++;
    }

    if (!admin.name || admin.name.length < 1) {
      errorHandler("name", "Please enter your Name!");
      errors++;
    }

    if (!admin.password || admin.password.length < 8) {
      errorHandler("password", "Please enter the password!");
      errors++;
    }

    if (!admin.password || admin.password.length < 8) {
      errorHandler("password", "Password must be at least 8 character long!");
      errors++;
    }

    if (!admin.confirmPassword || admin.password !== admin.confirmPassword) {
      errorHandler("confirmPassword", "Passwords doesnt match!");
      errors++;
    }

    if (errors > 0) return;

    try {
      await fetch("/api/register", {
        method: "POST",
        body: JSON.stringify(admin),
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      })
        .then((res) => res.json())
        .then((json) => {
          setResponse(json.message);
          json?.error && console.log(json.err);
        });
    } catch (error) {
      console.log(error);
    }
  };

  console.log(response);

  return (
    <div className="flex w-screen h-screen justify-center ">
      <div className="w-[80%] relative py-4 px-2 flex flex-col gap-4">
        <h1>Admins List</h1>
        <form onSubmit={formHandler} className="flex flex-col gap-4 ">
          <h1>{response}</h1>
          <div className="flex flex-col w-full relative">
            <div className="w-full relative flex">
              <label className="w-[10%]" htmlFor="email">
                Email:
              </label>
              <Input id="email" type="email" value={admin.email} inputHandler={inputHandler} placeholder="Email" />
            </div>
            <p className="text-red-500">{errors.email}</p>
          </div>
          <div className="flex flex-col w-full relative">
            <div className="w-full relative flex">
              <label className="w-[10%]" htmlFor="password">
                Password:
              </label>
              <Input
                id="password"
                type="password"
                value={admin.password}
                inputHandler={inputHandler}
                placeholder="Password"
              />
            </div>
            <p className="text-red-500">{errors.password}</p>
          </div>

          <div className="flex flex-col w-full relative">
            <div className="w-full relative flex">
              <label className="w-[10%]" htmlFor="password">
                Confirm Password:
              </label>
              <Input
                id="confirmPassword"
                type="password"
                value={admin.confirmPassword}
                inputHandler={inputHandler}
                placeholder="Confirm Password"
              />
            </div>
            <p className="text-red-500">{errors.confirmPassword}</p>
          </div>
          <div className="flex flex-col w-full relative">
            <div className="w-full relative flex">
              <label className="w-[10%]" htmlFor="name">
                Name:
              </label>
              <Input id="name" type="text" value={admin.name} inputHandler={inputHandler} placeholder="Name" />
            </div>
            <p className="text-red-500">{errors.name}</p>
          </div>
          <div className="flex flex-col w-full relative">
            <div className="w-full relative flex">
              <label className="w-[10%]" htmlFor="name">
                Access Level:
              </label>
              <Input
                id="accessLvl"
                type="text"
                value={admin.accessLvl}
                inputHandler={inputHandler}
                placeholder="Access Level"
              />
            </div>
            {/* <p className="text-red-500">{errors.acce}</p> */}
          </div>
          <Button text="Submit" btype="submit" properties="bg-primaryred text-white" />
        </form>
      </div>
    </div>
  );
};

export default Admins;
