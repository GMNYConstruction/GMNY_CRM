import React, { useState } from "react";
import { Button } from "@/components/Button";
import { Input } from "@/components/Input";
import { AdminCreate, AuthUser, UsersType } from "@/types";
import AdminCard from "@/components/AdminCard";
import Select from "@/components/Select";
import { useDispatch } from "react-redux";
import { useSession } from "next-auth/react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getAdmins } from "@/hooks/fetch/get-admins";
import { useCreateAdmin, useUpdateAdmin, useUpdateAdminStatus } from "@/hooks/mutation/admin-mutation";

const Admins = () => {
  const { data } = useSession();
  const queryClient = useQueryClient();
  const user = data?.user as UsersType;
  const [search, setSearch] = useState("");
  const [response, setResponse] = useState("");
  const [errors, setErrors] = useState({} as AdminCreate);
  const [admin, setAdmin] = useState({
    accessLvl: "",
    confirmPassword: "",
    password: "",
    email: "",
    name: "",
    status: false,
  });

  const inputHandler = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>) => {
    setAdmin((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const errorHandler = (id: string, value: string) => {
    setErrors((prev) => ({ ...prev, [id]: value }));
  };

  const filterList = () => {
    return admins?.filter((e: UsersType) => {
      if (
        e.name?.toLowerCase().includes(search.toLowerCase()) ||
        e.email?.toLowerCase().includes(search.toLowerCase()) ||
        e.accessLvl?.toLowerCase().includes(search.toLowerCase())
      )
        return e;
    });
  };

  const { data: admins } = useQuery({
    queryKey: ["admins"],
    queryFn: () => getAdmins(user?.id),
    retry: 1,
    enabled: !!user?.id,
  });

  const handleStatusMutation = useUpdateAdminStatus({
    onSuccess: (data) => {
      queryClient.setQueryData(["admins"], (old: AuthUser[]) => {
        const updated = old?.map((item: AuthUser) =>
          item.id?.toString() === data?.admin?.id?.toString() ? { ...item, ...data?.admin } : item
        );
        return updated;
      });
    },
    onError: (data) => {
      console.log(data?.response?.data?.message);
    },
  });

  const handleAdminMutation = useUpdateAdmin({
    onSuccess: (data) => {
      queryClient.setQueryData(["admins"], (old: AuthUser[]) => {
        const updated = old?.map((item: AuthUser) =>
          item.id?.toString() === data?.admin?.id?.toString() ? { ...item, ...data?.admin } : item
        );
        return updated;
      });
    },
    onError: (data) => {
      console.log(data?.response?.data?.message);
    },
  });

  const handleAdminCreateMutation = useCreateAdmin({
    onSuccess: (data) => {
      queryClient.setQueryData(["admins"], (old: AuthUser[]) => {
        old?.push(data?.admin);
        return old;
      });
      setResponse(data?.message);
      setTimeout(() => {
        setResponse("");
      }, 5000);
    },
    onError: (data) => {
      console.log(data?.response?.data?.message);
      setResponse(data?.response?.data?.message);
      setTimeout(() => {
        setResponse("");
      }, 5000);
    },
  });

  const formHandler = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    let errors = 0;
    setErrors({
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      accessLvl: "",
      status: null,
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

    if (!admin.accessLvl) {
      errorHandler("accessLvl", "Please select access level");
      errors++;
    }

    if (!`${admin.status}`) {
      errorHandler("status", "Please select status");
      errors++;
    }

    if (errors > 0) return;

    handleAdminCreateMutation.mutate(admin);
  };

  return (
    <div className="flex w-full justify-center">
      <div className="w-[80%] relative py-4 px-2 flex flex-col gap-4">
        <h1>Admins List</h1>
        <form onSubmit={formHandler} className="flex flex-col gap-4 ">
          <h1 className={`font-bold ${response === "User Created!" ? "text-green-500" : "text-primaryred"} `}>
            {response}
          </h1>
          <div className="flex flex-col w-full relative">
            <p className="text-red-500">{errors.email}</p>
            <div className="w-full relative flex items-center">
              <label className="w-[10%]" htmlFor="email">
                Email:
              </label>
              <Input
                id="email"
                type="email"
                value={admin.email}
                inputHandler={inputHandler}
                placeholder="Email"
                properties={`w-[350px] ${errors.email && "border-red-500"} `}
              />
            </div>
          </div>
          <div className="flex flex-col w-full relative">
            <p className="text-red-500">{errors.password}</p>
            <div className="w-full relative flex items-center">
              <label className="w-[10%]" htmlFor="password">
                Password:
              </label>
              <Input
                id="password"
                type="password"
                value={admin.password}
                inputHandler={inputHandler}
                placeholder="Password"
                properties={`w-[350px] ${errors.password && "border-red-500"} `}
              />
            </div>
          </div>

          <div className="flex flex-col w-full relative">
            <p className="text-red-500">{errors.confirmPassword}</p>
            <div className="w-full relative flex items-center">
              <label className="w-[10%]" htmlFor="password">
                Confirm Password:
              </label>
              <Input
                id="confirmPassword"
                type="password"
                value={admin.confirmPassword}
                inputHandler={inputHandler}
                placeholder="Confirm Password"
                properties={`w-[350px] ${errors.confirmPassword && "border-red-500"} `}
              />
            </div>
          </div>
          <div className="flex flex-col w-full relative">
            <p className="text-red-500">{errors.name}</p>
            <div className="w-full relative flex items-center">
              <label className="w-[10%]" htmlFor="name">
                Name:
              </label>
              <Input
                id="name"
                type="text"
                value={admin.name}
                inputHandler={inputHandler}
                placeholder="Name"
                properties={`w-[350px] ${errors.name && "border-red-500"}`}
              />
            </div>
          </div>
          <div className="flex flex-col w-full relative">
            <p className="text-red-500">{errors.accessLvl}</p>
            <div className="w-full relative flex items-center">
              <label className="w-[10%]" htmlFor="accessLvl">
                Access Level:
              </label>
              <Select
                id="accessLvl"
                options={["admin", "moderator"]}
                properties={`ease-in-out duration-300 w-[350px] p-1 px-4 rounded-md border-2 ${
                  errors.accessLvl && "border-red-500"
                }`}
                value={admin.accessLvl}
                placeholder="Access Level"
                inputHandler={inputHandler}
              />
            </div>
          </div>
          <div className="flex flex-col w-full relative">
            <p className="text-red-500">{errors.status}</p>
            <div className="w-full relative flex items-center">
              <label className="w-[10%]" htmlFor="accessLvl">
                Status:
              </label>
              <Select
                id="status"
                options={["Active", "Disabled"]}
                properties={`ease-in-out !w-[350px] duration-300 p-1 px-4 rounded-md border-2 ${
                  errors.status && "border-red-500"
                }`}
                placeholder="Status"
                inputHandler={(e) =>
                  setAdmin((prev) => ({ ...prev, status: e.target.value.toLowerCase() === "active" ? true : false }))
                }
                value={admin.status ? "Active" : "Disabled"}
              />
            </div>
          </div>
          <Button btype="submit" properties="bg-primaryred text-white w-[300px]">
            Submit
          </Button>
        </form>
        <div className="flex flex-col mt-6 gap-4">
          <div className="flex w-full justify-end">
            <Input
              id="search"
              type="text"
              placeholder="search"
              value={search}
              inputHandler={(e) => setSearch(e.target.value)}
            />
          </div>

          {filterList()?.map((user: UsersType) => {
            return (
              <AdminCard
                handleAdminMutation={handleAdminMutation}
                handleStatusMutation={handleStatusMutation}
                key={user.id}
                user={user}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Admins;
