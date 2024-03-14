import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../store/store";
import { decrement, increment } from "../../store/slice";
import { signOut } from "next-auth/react";
import { useSession } from "next-auth/react";

const TestPage = () => {
  const count = useSelector((state: RootState) => state.counter.value);
  const accidents = useSelector((state: RootState) => state.accidets);
  const dispatch = useDispatch();
  const session = async () => {
    const data = useSession();
    console.log(data.status);
  };

  session();

  return (
    <div>
      <div>
        <button onClick={() => signOut()}>logout</button>
        <button aria-label="Increment value" onClick={() => dispatch(increment())}>
          Increment
        </button>
        <span>{count}</span>
        <button aria-label="Decrement value" onClick={() => dispatch(decrement())}>
          Decrement
        </button>
      </div>
    </div>
  );
};

export default TestPage;
