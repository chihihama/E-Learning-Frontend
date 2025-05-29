import React from "react";
import "./common.css";

const Layout = ({ children }) => {
  return (
    <div className="dashboard-admin">
     
      <div className="content">{children}</div>
    </div>
  );
};

export default Layout;