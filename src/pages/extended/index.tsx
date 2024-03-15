import React from "react";
import { useGetAccidentById } from "@/hooks/useGetAccidentById";

const Extended = () => {
  const accidentSelected = useGetAccidentById();
  console.log(accidentSelected);
  return (
    <div className="flex w-full h-full justify-center ">
      <div className="w-[90%] relative">
        <div className="relative w-full h-full flex flex-col">
          <div className="w-full h-[25%] py-4 px-2 rounded-md flex gap-2 ">
            <div className=" border border-black w-[33%]">
              <h1>id: 1232132</h1>
              <h1>Name: Jamsh Jamsh</h1>
              <h1>Assigned to: GMNY</h1>
              <h1>Company name: Core</h1>
              <h1>Date of accident: 11/11/2011</h1>
              <h1>Accident location: 1550 Jesup Ave, Bronx, NY 11111</h1>
            </div>
            <div className=" border border-black w-[33%]">
              <h1>First check: 11/11/2011</h1>
              <h1>Last check: 11/11/2011</h1>
              <h1>Last day worked: 11/11/2011</h1>
              <h1>Report: yes</h1>
              <h1>eFroi: yes</h1>
              <h1>Back to work: no</h1>
              <h1>Document folder (click)</h1>
            </div>
            <div className="relative border border-black w-[33%]">
              <h1 className="h-[13%]">Accident description: </h1>
              <textarea id="1" className="w-full max-h-[85%]" cols={30} rows={10}>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi a accusamus temporibus fugiat repudiandae
                odio, iste tempora ea dignissimos hic eveniet, repellendus dicta dolor officia eligendi atque rerum,
                aliquid vitae. Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas repudiandae consequatur
                minus accusantium eaque, facere laboriosam labore qui, ex tempore sunt, debitis perferendis. Placeat,
                pariatur atque eveniet quos rem sunt.
              </textarea>
            </div>
          </div>
          <div className="w-full min-h-[30%] max-h-[45%] py-4 px-2 flex gap-1">
            <div className="w-[33%]">
              <h1>Witness:</h1>
              <textarea id="1" className="w-full h-[85%] resize-none" cols={30} rows={10}>
                Jamshid: 123-123-1233&#013;Jamshid: 123-123-1233&#013;Jamshid: 123-123-1233
              </textarea>
            </div>
            <div className="w-[33%] ">
              <h1>Correspondence with NYSIF, Insurance, Lawyers:</h1>
              <textarea id="1" className="w-full h-[85%] resize-none" cols={30} rows={10}>
                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nulla quas corrupti minus quia placeat,
                adipisci similique voluptatem magnam tempora enim at reiciendis dolorum ducimus dolores consequatur eos
                quod voluptates quisquam.
              </textarea>
            </div>
            <div className="w-[33%]">
              <h1>Notice: </h1>
              <textarea id="1" className="w-full h-[85%] resize-none" cols={30} rows={10}>
                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nulla quas corrupti minus quia placeat,
                adipisci similique voluptatem magnam tempora enim at reiciendis dolorum ducimus dolores consequatur eos
                quod voluptates quisquam.
              </textarea>
            </div>
          </div>
          <div className="flex flex-col gap-2 overflow-auto">
            <h1>Comments: </h1>
            <div className="border border-black/50 rounded-md py-2 px-1 flex flex-col gap-1">
              <h1>
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Hic numquam fuga aut, iure ut itaque voluptas
                exercitationem rerum, placeat enim amet eveniet dicta nulla libero velit recusandae, culpa ea laborum!
              </h1>
              <span>11/11/2011 Vensan</span>
            </div>
            <div className="border border-black/50 rounded-md py-2 px-1 flex flex-col gap-1">
              <h1>
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Hic numquam fuga aut, iure ut itaque voluptas
                exercitationem rerum, placeat enim amet eveniet dicta nulla libero velit recusandae, culpa ea laborum!
              </h1>
              <span>11/11/2011 Vensan</span>
            </div>
            <div className="border border-black/50 rounded-md py-2 px-1 flex flex-col gap-1">
              <h1>
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Hic numquam fuga aut, iure ut itaque voluptas
                exercitationem rerum, placeat enim amet eveniet dicta nulla libero velit recusandae, culpa ea laborum!
              </h1>
              <span>11/11/2011 Vensan</span>
            </div>
            <div className="border border-black/50 rounded-md py-2 px-1 flex flex-col gap-1">
              <h1>
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Hic numquam fuga aut, iure ut itaque voluptas
                exercitationem rerum, placeat enim amet eveniet dicta nulla libero velit recusandae, culpa ea laborum!
              </h1>
              <span>11/11/2011 Vensan</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Extended;
