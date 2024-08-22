import React, { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Drawer from "../../components/Drawer";
import { Button } from "../../components/Button";
import CalendarDrawer from "../../components/Calendar";
import { Input } from "@/components/Input";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useDebouncedValue } from "@/types/use-debounce";
import { ContractSelect, getContractsPage } from "@/hooks/fetch/get-contracts";
import Paggination from "@/components/Paggination";
import { Table } from "@/components/TableComponent";
import { ContractsType } from "@/types";
import {
  useCreateContractMutation,
  useDeleteContractMutation,
  useUpdateContractMutation,
} from "@/hooks/mutation/contract-mutation";

import cross from "../../img/x.svg";
import notFound from "../../img/noloads.svg";
import loadingIcon from "../../img/loading.svg";
import ModalWindow from "@/components/ModalWindow";

const Contracts = () => {
  const [page, setPage] = useState(1);
  const queryClient = useQueryClient();
  const [modal, setModal] = useState(false);
  const [pagesArr, setPagesArr] = useState<number[]>([1]);
  const [response, setResponse] = useState({ message: "", error: false });
  const [drawer, setDrawer] = useState({
    id: "",
    status: false,
  });
  const [filters, setFilters] = useState({
    from: "",
    to: "",
    search: "",
  });
  const [document, setDocument] = useState({
    fromCompany: "",
    toCompany: "",
    from: "",
    to: "",
    link: "",
    location: "",
    id: "",
  });
  const [errors, setErrors] = useState({
    fromCompany: "",
    toCompany: "",
    location: "",
    from: "",
    to: "",
    link: "",
  });

  const { data: contractsPage, isLoading } = useQuery({
    queryKey: [
      "contractsPage",
      page,
      useDebouncedValue(filters.search, 400),
      useDebouncedValue(filters.from, 400),
      useDebouncedValue(filters.to, 400),
    ],
    queryFn: () => getContractsPage(page, 12, filters.search, filters.from.toString(), filters.to.toString()),
    retry: 1,
  });

  const normalizeData = (data: ContractsType[]) => {
    return data?.map((item: ContractsType) => ({
      id: item?.id,
      tableData: [item?.from_company, item?.to_company, item?.from_date, item?.to_date, item?.location, item?.link],
    }));
  };

  useEffect(() => {
    if (contractsPage) {
      setPagesArr(Array.from({ length: contractsPage.pages }, (_, i) => i + 1));
    }
  }, [contractsPage?.pages]);

  useEffect(() => {
    if (!drawer?.status) {
      setDocument({
        from: "",
        to: "",
        fromCompany: "",
        toCompany: "",
        link: "",
        location: "",
        id: "",
      });
    }
    if (filters.to || filters.from) {
      setPage(1);
    }
  }, [drawer?.status, filters?.to, filters?.from]);

  const contractCreate = useCreateContractMutation({
    onSuccess: (data) => {
      queryClient.setQueryData(
        ["contractsPage", page, filters.search, filters.from, filters.to],
        (old: ContractSelect) => {
          old?.contracts?.unshift(data?.contract);
          if (old?.contracts.length === 12) old?.contracts?.pop();
          return old;
        }
      );

      setDrawer({
        id: "",
        status: false,
      });
      setDocument({
        from: "",
        to: "",
        fromCompany: "",
        toCompany: "",
        link: "",
        location: "",
        id: "",
      });
    },
    onError: (data) => {
      console.log(data);
      setResponse({
        error: true,
        message: data?.response?.data?.message,
      });
      setTimeout(() => {
        setResponse({
          error: true,
          message: "",
        });
      }, 5000);
    },
  });

  const contractDelete = useDeleteContractMutation({
    onSuccess: (data) => {
      console.log(data?.id);
      queryClient.setQueryData(
        ["contractsPage", page, filters.search, filters.from, filters.to],
        (old: ContractSelect) => {
          return {
            pages: old?.pages,
            contracts: old?.contracts.filter((item: ContractsType) => item?.id?.toString() !== data?.id?.toString()),
          };
        }
      );

      setModal(false);
      setResponse({
        message: "Deleted successfully",
        error: false,
      });
      setDocument({
        from: "",
        to: "",
        fromCompany: "",
        toCompany: "",
        link: "",
        location: "",
        id: "",
      });
      setTimeout(() => {
        setResponse({
          error: true,
          message: "",
        });
      }, 5000);
    },
    onError: (data) => {
      console.log(data);
      setResponse({
        error: true,
        message: data?.response?.data?.message,
      });
      setTimeout(() => {
        setResponse({
          error: true,
          message: "",
        });
      }, 5000);
    },
  });

  const contractUpdate = useUpdateContractMutation({
    onSuccess: (data) => {
      queryClient.setQueryData(
        ["contractsPage", page, filters.search, filters.from, filters.to],
        (old: ContractSelect) => {
          const updated = old
            ? {
                ...old,
                contracts: old?.contracts.map((item: ContractsType) =>
                  item.id.toString() === data?.contract?.id.toString() ? { ...item, ...data?.contract } : item
                ),
              }
            : old;
          return updated;
        }
      );

      setDrawer({
        id: "",
        status: false,
      });
      setDocument({
        from: "",
        to: "",
        fromCompany: "",
        toCompany: "",
        link: "",
        location: "",
        id: "",
      });
    },
    onError: (data) => {
      console.log(data);
      setResponse({
        error: true,
        message: data?.response?.data?.message,
      });
      setTimeout(() => {
        setResponse({
          error: true,
          message: "",
        });
      }, 5000);
    },
  });

  const handleInputs = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDocument((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleEdit = (id: string | number) => {
    const contract = contractsPage?.contracts.find((item: any) => item.id.toString() === id.toString());
    setDocument({
      id: contract?.id.toString() as string,
      from: contract?.from_date as string,
      to: contract?.to_date as string,
      fromCompany: contract?.from_company as string,
      toCompany: contract?.to_company as string,
      location: contract?.location as string,
      link: contract?.link as string,
    });
    setDrawer({
      status: true,
      id: contract?.id as string,
    });
  };

  const handleDelete = (id: string | number) => {
    const contract = contractsPage?.contracts.find((item: any) => item.id.toString() === id.toString());
    setDocument({
      id: contract?.id.toString() as string,
      from: contract?.from_date as string,
      to: contract?.to_date as string,
      fromCompany: contract?.from_company as string,
      toCompany: contract?.to_company as string,
      location: contract?.location as string,
      link: contract?.link as string,
    });
    setModal(true);
  };

  const formHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let err = 0;
    if (!document.fromCompany) {
      setErrors((prev) => ({ ...prev, fromCompany: "Enter company name" }));
      err++;
    }
    if (!document.toCompany) {
      setErrors((prev) => ({ ...prev, toCompany: "Enter company name" }));
      err++;
    }
    if (!document.to) {
      setErrors((prev) => ({ ...prev, to: "Select date" }));
      err++;
    }
    if (!document.from) {
      setErrors((prev) => ({ ...prev, from: "Select date" }));
      err++;
    }
    if (!document.link) {
      setErrors((prev) => ({ ...prev, link: "Enter the link" }));
      err++;
    }

    if (err > 0) return;

    contractCreate.mutate({
      from_company: document.fromCompany,
      to_company: document.toCompany,
      link: document.link,
      location: document.location,
      from_date: document.from,
      to_date: document.to,
    });
  };

  const formUpdate = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const contract = contractsPage?.contracts.find((item: any) => item.id.toString() === drawer.id.toString());
    const mutationObj = {} as any;
    let err = 0;

    if (!document.fromCompany) {
      setErrors((prev) => ({ ...prev, fromCompany: "Enter company name" }));
      err++;
    }
    if (!document.toCompany) {
      setErrors((prev) => ({ ...prev, toCompany: "Enter company name" }));
      err++;
    }
    if (!document.to) {
      setErrors((prev) => ({ ...prev, to: "Select date" }));
      err++;
    }
    if (!document.from) {
      setErrors((prev) => ({ ...prev, from: "Select date" }));
      err++;
    }
    if (!document.link) {
      setErrors((prev) => ({ ...prev, link: "Enter the link" }));
      err++;
    }

    if (document.from !== contract?.from_date) mutationObj["from_date"] = document.from;
    if (document.to !== contract?.to_date) mutationObj["to_date"] = document.to;
    if (document.link !== contract?.link) mutationObj["link"] = document.link;
    if (document.fromCompany !== contract?.from_company) mutationObj["from_company"] = document.fromCompany;
    if (document.toCompany !== contract?.to_company) mutationObj["to_company"] = document.toCompany;
    if (document.location !== contract?.location) mutationObj["location"] = document.location;

    if (Object.keys(mutationObj).length === 0) {
      setResponse({
        error: true,
        message: "No changes were made",
      });
      setTimeout(() => {
        setResponse({
          error: false,
          message: "",
        });
      }, 5000);
      err++;
    }
    if (err > 0) return;
    mutationObj["id"] = drawer.id;

    contractUpdate.mutate(mutationObj);
  };

  const DisplayFunction = useMemo(() => {
    if (isLoading)
      return (
        <div className="flex flex-col">
          <Image src={loadingIcon} className="self-center animate-spin" alt="loading" />
          <h1 className="text-center text-2xl font-medium">Loading...</h1>
        </div>
      );

    if (contractsPage?.contracts && contractsPage?.contracts?.length !== 0)
      return (
        <>
          <Paggination
            pagesArr={pagesArr}
            currentPage={page}
            onPageClick={(value) => {
              setPage(value);
            }}
          />
          <Table
            headers={["From Company", "To Company", "From date", "To date", "Location", "Link", "Edit", "Delete"]}
            values={normalizeData(contractsPage?.contracts) as any}
            button_one={{
              text: "Edit",
              action: handleEdit,
            }}
            button_two={{
              text: "Delete",
              action: handleDelete,
            }}
          />
        </>
      );

    return (
      <div className="flex flex-col">
        <Image src={notFound} className="self-center" alt="loading" />
        <h1 className="text-center text-2xl font-medium">No records</h1>
      </div>
    );
  }, [contractsPage?.contracts, contractCreate.isSuccess, contractsPage, pagesArr, page]);

  return (
    <>
      <Drawer drawer={drawer} setDrawer={() => setDrawer({ id: "", status: false })} topText="Contracts">
        <ModalWindow modal={modal} setModal={setModal}>
          <div className="h-full w-full overflow-hidden">
            <p className="text-black font-medium text-2xl text-center mt-9">Are you sure you want to delete?</p>
            <div className="flex gap-8 items-center justify-center mb-4 mt-auto h-full">
              <Button onClick={() => setModal(false)} btype="button" properties="!text-xl font-medium ">
                Cancel
              </Button>
              <Button
                btype="button"
                onClick={() => contractDelete.mutate({ id: document?.id })}
                properties="!text-xl font-medium bg-red-500 text-white"
              >
                Delete
              </Button>
            </div>
          </div>
        </ModalWindow>
        <form className="flex flex-col gap-4" onSubmit={drawer.id ? formUpdate : formHandler}>
          {response?.message && response?.error && (
            <p className="text-red-500 font-medium text-base">{response?.message}</p>
          )}
          <div className="flex flex-col gap-1">
            <p className="text-black font-medium text-base">From Company</p>
            <Input
              placeholder="From company"
              properties="h-[42px]"
              value={document.fromCompany}
              inputHandler={handleInputs}
              id="fromCompany"
            />
            {errors?.fromCompany && <p className="text-red-500 font-medium text-base">{errors?.fromCompany}</p>}
          </div>

          <div className="flex flex-col gap-1">
            <p className="text-black font-medium text-base">To Company</p>
            <Input
              placeholder="To company"
              properties="h-[42px]"
              value={document.toCompany}
              inputHandler={handleInputs}
              id="toCompany"
            />
            {errors?.toCompany && <p className="text-red-500 font-medium text-base">{errors?.toCompany}</p>}
          </div>

          <div className="flex flex-col gap-1">
            <p className="text-black font-medium text-base">Location</p>
            <Input
              placeholder="Location"
              properties="h-[42px]"
              value={document.location}
              inputHandler={handleInputs}
              id="location"
            />
            {errors?.location && <p className="text-red-500 font-medium text-base">{errors?.location}</p>}
          </div>

          <div className="flex flex-col gap-1">
            <p className="text-black font-medium text-base">From date</p>
            <CalendarDrawer
              placeholder="From"
              properties="h-[42px]"
              value={document.from}
              setData={setDocument}
              data={document}
              id="from"
            />
            {errors?.from && <p className="text-red-500 font-medium text-base">{errors?.from}</p>}
          </div>

          <div className="flex flex-col gap-1">
            <p className="text-black font-medium text-base">To date</p>
            <CalendarDrawer
              placeholder="To"
              properties="h-[42px]"
              value={document.to}
              setData={setDocument}
              data={document}
              id="to"
            />
            {errors?.to && <p className="text-red-500 font-medium text-base">{errors?.to}</p>}
          </div>

          <div className="flex flex-col gap-1">
            <p className="text-black font-medium text-base">Document Link</p>
            <Input
              placeholder="Document Link"
              properties="h-[42px]"
              value={document.link}
              inputHandler={handleInputs}
              id="link"
            />
            {errors?.link && <p className="text-red-500 font-medium text-base">{errors?.link}</p>}
          </div>

          <Button btype="submit" properties="bg-red-500 text-white">
            {drawer.id ? "Update" : "Submit"}
          </Button>
        </form>
      </Drawer>

      <div className="w-full flex flex-col justify-center">
        <div className="w-full relative py-4 px-2 flex flex-col gap-4">
          <div className="w-full flex justify-between">
            <div className="flex gap-2">
              <Button
                btype="button"
                onClick={() => setDrawer({ id: "", status: true })}
                properties={`bg-primaryred text-white`}
              >
                Add contract
              </Button>
            </div>
            <div className="flex gap-4 items-center">
              <div className="relative">
                <CalendarDrawer
                  id="from"
                  placeholder="From"
                  value={filters?.from}
                  data={filters}
                  setData={setFilters}
                  divProperties="!h-[42px] !w-[200px]"
                  properties="h-[42px]  border-2"
                />
                <button
                  type="button"
                  onClick={() => setFilters((prev) => ({ ...prev, from: "" }))}
                  className="absolute top-0 bottom-0 my-auto right-3"
                >
                  <Image src={cross} alt="delete" />
                </button>
              </div>

              <div className="relative">
                <CalendarDrawer
                  id="to"
                  placeholder="to"
                  value={filters?.to}
                  data={filters}
                  setData={setFilters}
                  divProperties="!h-[42px] !w-[200px]"
                  properties="h-[42px]  border-2"
                />
                <button
                  type="button"
                  onClick={() => setFilters((prev) => ({ ...prev, to: "" }))}
                  className="absolute top-0 bottom-0 my-auto right-3"
                >
                  <Image src={cross} alt="delete" />
                </button>
              </div>
              <div className="relative">
                <Input
                  id="search"
                  type="text"
                  placeholder="search"
                  properties="h-[42px] w-[200px]"
                  value={filters.search}
                  inputHandler={(e) => setFilters((prev) => ({ ...prev, search: e.target.value }))}
                />
                <button
                  type="button"
                  onClick={() => setFilters((prev) => ({ ...prev, search: "" }))}
                  className="absolute top-0 bottom-0 my-auto right-3"
                >
                  <Image src={cross} alt="delete" />
                </button>
              </div>
            </div>
          </div>
          {response?.message && !response?.error && (
            <p className="text-green-500 font-medium text-base">{response?.message}</p>
          )}
          {DisplayFunction}
        </div>
      </div>
    </>
  );
};

export default Contracts;
