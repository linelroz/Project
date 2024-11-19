import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import Home from "../components/Home";

const Layout = ({
  children,
  isLogin,
  setIsLogin,
  usersState,
  setUsersState,
  showUserName,
  setShowUserName,
}) => {
  return (
    <>
      <Header
        setIsLogin={setIsLogin}
        isLogin={isLogin}
        usersState={usersState}
        setUsersState={setUsersState}
        showUserName={showUserName}
        setShowUserName={setShowUserName}
      />
      {children}
      <Footer />
    </>
  );
};

export default Layout;
