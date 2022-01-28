import React, { ReactNode } from "react";
import Clouds from "./elements/Clouds";
import Header from "./Header";

type Props = {
  children: ReactNode;
};

const Layout: React.FC<Props> = (props) => (
  <div>
    <Clouds />
    <Header />
    <div className="layout">{props.children}</div>
  </div>
);

export default Layout;
