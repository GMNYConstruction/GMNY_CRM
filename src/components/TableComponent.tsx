import Link from "next/link";
import pencil from "../img/pencil.svg";
import docs from "../img/payments.svg";
import Image from "next/image";
import { memo } from "react";
import trash from "../img/rubbish-bin-svgrepo-com.svg";

type Value = {
  id?: number | string;
  tableData: (string | number)[];
};

type TableProps = {
  headers: string[];
  values: Value[];
  button_one?: {
    action: (id: number | string) => void;
    text: string;
  };
  button_two?: {
    action: (id: number | string) => void;
    text: string;
  };
};

export const Table: React.FC<TableProps> = memo(({ headers, values, button_one, button_two }) => {
  return (
    <table className="text-primarygrey w-full text-sm">
      <thead>
        <tr className="bg-neutral-50  h-[52px] border">
          {headers.map((header, index) => (
            <th key={header + index}>
              <div className="px-6 font-normal text-left">{header}</div>
            </th>
          ))}
          <th></th>
        </tr>
      </thead>
      <tbody>
        {values?.map((value) => (
          <tr key={value?.id + Math.random()?.toString()} className="border-2 h-[52px]">
            {value?.tableData?.map((data, index) => {
              return (
                <>
                  {data?.toString().includes("https") ? (
                    <td className="pl-6" key={`${data} ${value?.id} ${Math.random().toString()}`}>
                      <a href={data.toString()} target="_blank" className="max-w-[145px]">
                        <span className="flex gap-4 text-black font-medium w">
                          <Image src={docs} className="w-5 h-5" alt="pencil" />
                          Documents
                        </span>
                      </a>
                    </td>
                  ) : (
                    <td className="pl-6" key={data + Math.random().toString()}>
                      <span className="text-black font-medium">{data}</span>
                    </td>
                  )}
                </>
              );
            })}

            <td className="w-[170px]">
              {button_one ? (
                <button type="button" onClick={() => button_one?.action(value?.id || "")}>
                  <span className="flex gap-4 ml-6 text-black font-medium">
                    <Image src={pencil} className="w-5 h-5" alt="pencil" />
                    {button_one?.text}
                  </span>
                </button>
              ) : (
                <Link href={`/extended?id=${value?.id}`} className="max-w-[145px]">
                  <span className="flex gap-4 ml-6 text-black font-medium">
                    <Image src={pencil} className="w-5 h-5" alt="pencil" />
                    Edit
                  </span>
                </Link>
              )}
            </td>
            {button_two && (
              <td className="w-[170px]">
                <button type="button" onClick={() => button_two?.action(value?.id || "")}>
                  <span className="flex gap-4 ml-6 text-black font-medium">
                    <Image src={trash} className="w-5 h-5" alt="pencil" />
                    {button_two?.text}
                  </span>
                </button>
              </td>
            )}
          </tr>
        ))}
      </tbody>
    </table>
  );
});
