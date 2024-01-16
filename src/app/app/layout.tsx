import React from "react";
import Providers from "@/app/app/Providers";
import Naviagtion from "@/components/Naviagtion";

const Layout: React.FC = () => {
  return (
    <Providers>
      <Naviagtion />
      <h1>layout</h1>
      <h2 className="text-foreground">test</h2>
    </Providers>
  );
};

export default Layout;
