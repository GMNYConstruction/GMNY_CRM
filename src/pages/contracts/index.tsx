import React, { useState } from "react";
import Drawer from "../../components/Drawer";

const Contracts = () => {
  const [drawer, setDrawer] = useState({
    id: "",
    status: false,
  });

  return (
    <>
      <Drawer topText="Contract" drawer={drawer} setDrawer={(e: string) => setDrawer({ id: e, status: false })} />

      <div className="">
        <button
          type="button"
          onClick={() =>
            setDrawer({
              id: "",
              status: true,
            })
          }
        >
          clasd
        </button>
      </div>
    </>
  );
};

export default Contracts;
