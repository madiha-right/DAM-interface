import React from "react";
import HeaderStatus from "../HeaderStatus";

interface IProps {
  children: React.ReactNode;
}

const Layout: React.FC<IProps> = ({ children }) => {
  return (
    <>
      <HeaderStatus />
      {children}
    </>
  );
};

export default Layout;
