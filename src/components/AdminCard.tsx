import { UsersType } from "@/types";
import React, { FC, useState } from "react";
import { Button } from "./Button";
import { useDispatch } from "react-redux";
import { editUser } from "@/store/Users/editUser";
import { AppDispatch } from "@/store/store";
import { Input } from "./Input";
import { read } from "fs";

interface IProps {
  user: UsersType;
}

const AdminCard: FC<IProps> = ({ user }) => {
  const dispatch = useDispatch<AppDispatch>();
  const [changedUser, setChangedUser] = useState<UsersType>(user);
  const [readOnly, setReadOnly] = useState(true);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>) => {
    setChangedUser((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleEdit = () => {
    setReadOnly(!readOnly);
    !readOnly && setChangedUser(user);
  };

  const handleStatus = () => {
    dispatch(
      editUser({
        ...user,
        status: !user.status,
      })
    );
  };

  const handleChangeSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  return (
    <div key={user.id} className="flex flex-col gap-4">
      <form onSubmit={handleChangeSubmit} className="grid grid-cols-2 w-full gap-2">
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
            <Input
              placeholder="Access Level"
              id="accessLvl"
              type="text"
              value={changedUser.accessLvl}
              inputHandler={handleChange}
              properties={`${readOnly && "border-transparent pointer-events-none"}`}
              readonly={readOnly}
            />
          </div>
          <div className="grid grid-cols-[1fr,4fr] items-center gap-2">
            <h1>Status:</h1>
            <h1 className="p-1 px-4">{user.status ? "Active" : "Disabled"}</h1>
          </div>
        </div>
      </form>
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
    </div>
  );
};

export default AdminCard;
