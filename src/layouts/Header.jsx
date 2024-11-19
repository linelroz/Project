import { React, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

import ListMenu from "../components/ListMenu";

import { MdConstruction } from "react-icons/md";

const Header = ({ isLogin, setIsLogin, showUserName, setShowUserName }) => {
  const navigate = useNavigate();
  useEffect(() => {
    const storedUserName = localStorage.getItem("showUserName");
    if (storedUserName) {
      setShowUserName(storedUserName);
    }
  }, [setShowUserName]);

  const logOutHandler = () => {
    setIsLogin(false);
    setShowUserName("");
    localStorage.removeItem("showUserName");
    navigate("/home");
  };

  return (
    <>
      <div className="bg-[#F2613F] flex justify-between items-center rounded-2xl px-5 py-[20px]">
        <ListMenu isLogin={isLogin} />
        <Link to="/">
          <div className="flex justify-center items-center relative left-[40px] cursor-pointer">
            <MdConstruction className="text-[40px] text-white" />
          </div>
        </Link>
        {!isLogin ? (
          <div className="flex justify-center items-center gap-5">
            <Link to="/login">
              <button className="text-white font-bold border p-2 rounded-lg w-[70px] hover:bg-[#9B3922] hover:text-white hover:border-[#9B3922] transition-all">
                ورود
              </button>
            </Link>
            <Link to="/signup">
              <button className="text-white font-bold border p-2 rounded-lg w-[70px] hover:bg-[#9B3922] hover:text-white hover:border-[#9B3922] transition-all">
                ثبت نام
              </button>
            </Link>
          </div>
        ) : (
          <div className="flex justify-center items-center gap-5">
            <Link to="/update-profile">
              <button className="group text-white font-bold border p-2 rounded-lg w-[70px] hover:bg-[#9B3922] hover:text-white hover:border-[#9B3922] transition-all">
                <span className="flex justify-center group-hover:hidden">
                  {showUserName}
                </span>
                <span className="hidden group-hover:flex">بروزرسانی</span>
              </button>
            </Link>
            <button
              onClick={logOutHandler}
              className="text-white font-bold border p-2 rounded-lg w-[70px] hover:bg-[#9B3922] hover:text-white hover:border-[#9B3922] transition-all"
            >
              خروج
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default Header;
