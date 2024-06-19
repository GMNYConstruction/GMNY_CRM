import { UsersType } from "@/types";
import React, { FC, use, useState } from "react";
import { Button } from "./Button";
import { useDispatch } from "react-redux";
import { editUser } from "@/store/Users/editUser";
import { AppDispatch } from "@/store/store";
import { Input } from "./Input";
import { Select } from "./Select";
import { getApiResponse } from "@/utils/getApiResponse";

interface IProps {
  user: UsersType;
}

const AdminCard: FC<IProps> = ({ user }) => {
  const dispatch = useDispatch<AppDispatch>();
  const [changedUser, setChangedUser] = useState<UsersType>(user);
  const [readOnly, setReadOnly] = useState(true);
  const [response, setResponse] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>) => {
    setChangedUser((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleEdit = () => {
    setReadOnly(!readOnly);
    !readOnly && setChangedUser(user);
  };

  const handleStatus = async () => {
    const response = await getApiResponse({
      apiRoute: "/api/updateUserStatus",
      body: { id: user.id, status: !user.status },
    });

    setResponse(response.message);

    if (response.message === "User Updated Successfuly!") {
      dispatch(
        editUser({
          ...user,
          status: !user.status,
        })
      );
      setChangedUser((prev) => ({
        ...prev,
        status: !user.status,
      }));
    }

    setTimeout(() => {
      setResponse("");
    }, 5000);
  };

  const handleChangeSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const response = await getApiResponse({ apiRoute: "/api/updateSelectedUser", body: changedUser });

    setResponse(response.message);

    if (response.message === "User Updated Successfuly!") {
      dispatch(
        editUser({
          ...user,
          ...changedUser,
        })
      );
      setReadOnly(!readOnly);
    }

    setTimeout(() => {
      setResponse("");
    }, 5000);
  };

  return (
    <form onSubmit={handleChangeSubmit} key={user.id} className="flex flex-col gap-4 border-b pb-4">
      <h1 className={` ${response === "User Updated Successfuly!" ? "text-green-600" : "text-primaryred"}`}>
        {response}
      </h1>
      <div className="grid grid-cols-2 w-full gap-2">
        <div className="flex flex-col gap-2">
          <div className="grid grid-cols-[1fr,4fr] items-center gap-2">
            <h1>Name:</h1>
            <Input
              placeholder="Name"
              id="name"
              type="text"
              value={changedUser.name}
              inputHandler={handleChange}
              properties={`${readOnly && "border-transparent pointer-events-none"}`}
              readonly={readOnly}
            />
          </div>
          <div className="grid grid-cols-[1fr,4fr] items-center gap-2">
            <h1>Email:</h1>
            <Input
              placeholder="email"
              id="email"
              type="text"
              value={changedUser.email}
              inputHandler={handleChange}
              properties={`${readOnly && "border-transparent pointer-events-none"}`}
              readonly={readOnly}
            />
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <div className="grid grid-cols-[1fr,4fr] items-center gap-2">
            <h1>Access Lvl:</h1>
            <Select
              id="accessLvl"
              options={["admin", "moderator"]}
              value={changedUser.accessLvl}
              placeholder="Access Level"
              properties={`${readOnly && "border-transparent pointer-events-none"}`}
              inputHandler={handleChange}
              readonly={readOnly}
            />
          </div>
          <div className="grid grid-cols-[1fr,4fr] items-center gap-2">
            <h1>Status:</h1>
            <h1 className="p-1 px-4">{user.status ? "Active" : "Disabled"}</h1>
          </div>
        </div>
      </div>
      <div className="flex gap-6">
        {readOnly ? (
          <Button
            onClick={handleStatus}
            text={`${user.status ? "Disable Account" : "Activate Account"} `}
            btype="button"
            properties={`w-[200px] text-white ${user.status ? " bg-primaryred" : "bg-green-500"}`}
          />
        ) : (
          <Button text="Save changes" btype="submit" properties={`w-[200px] text-white bg-green-500`} />
        )}

        <Button
          text={`${readOnly ? "Edit" : "Cancel"} `}
          btype="button"
          onClick={handleEdit}
          properties={`w-[200px] bg-primaryred text-white`}
        />
      </div>
    </form>
  );
};

export default AdminCard;
