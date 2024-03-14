import React from "react";
import Link from "next/link";

const page = () => {
  return (
    <div className="flex w-screen h-screen justify-center ">
      <div className="w-[80%] relative py-4 px-2 flex flex-col gap-4">
        <div className="w-full flex justify-between">
          <h1>Test UI sample</h1>
          <input type="text" placeholder="search" className="py-2 px-1 border border-black rounded-md" />
        </div>
        <div className="flex flex-col gap-3">
          <div className="relative w-full h-[200  px] border border-red-500 rounded-md p-2 flex">
            <div className="w-[10%]">
              <h1>id:</h1>
              <h2>3222</h2>
            </div>
            <div className="flex  w-[35%] flex-col gap-1 overflow-hidden ">
              <h2>Name: Jamshid Jamshidov</h2>
              <h2>Assigned to: GMNY</h2>
              <h2>Company we worked for: CORE</h2>
              <h2>Date of accident: 1/31/2022</h2>
              <h2>Documents folder</h2>
            </div>
            <div className="w-[50%] h-full flex flex-col gap-3">
              <h1 className="h-[10%]">Description: </h1>
              <textarea disabled className="w-full h-[85%] resize-none">
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nisi, dignissimos repellat quos facilis
                dolorem omnis, architecto beatae atque voluptate nulla fugit porro autem totam sint voluptatum molestias
                quaerat sed! Officia. Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nisi, dignissimos
                repellat quos facilis dolorem omnis, architecto beatae atque voluptate nulla fugit porro autem totam
                sint voluptatum molestias quaerat sed! Officia.
              </textarea>
            </div>
            <div className="flex flex-col justify-center items-center w-[5%]">
              <Link href={"extended"}>...</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
