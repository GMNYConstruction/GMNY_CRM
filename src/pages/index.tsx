"use client";
import Link from "next/link";
import React from "react";

export default function Home() {
  return (
    <div className="w-full h-full relative pr-px items-center bg-white flex flex-col justify-center">
      <h1> New Pages Are Comming Soon!!</h1>
      <Link href="/caselist" className="text-white bg-red-500 px-3 py-2 rounded-md mt-4">
        Case List
      </Link>
    </div>
  );
}
