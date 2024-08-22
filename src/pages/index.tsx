"use client";
import { useRouter } from "next/router";
import React, { useState } from "react";

export default function Home() {
  const navigate = useRouter();

  navigate.push("/caselist");
  return (
    <div className="w-full h-full relative pr-px items-center bg-white flex flex-col justify-center">
      <h1> New Pages Are Comming Soon!!</h1>
    </div>
  );
}
