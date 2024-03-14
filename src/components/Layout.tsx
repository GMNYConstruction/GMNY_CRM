import React from "react";

type PropsType = {
  children: React.ReactElement;
};

const Layout = ({ children }: PropsType) => {
  return (
    <div className="parent">
      <main>{children}</main>
    </div>
  );
};

export default Layout;
