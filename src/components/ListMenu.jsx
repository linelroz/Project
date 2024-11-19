import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const ListMenu = ({ isLogin }) => {
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const CalculationsClickHandler = () => {
    if (isLogin) {
      navigate("/calculatePuOrAlpha");
    } else {
      setError("لطفا ابتدا وارد حساب کاربری خود شوید.");
      setTimeout(() => {
        setError("");
        navigate("/login");
      }, 1500);
    }
  };

  return (
    <div>
      <ul className="flex font-bold justify-center items-center gap-[25px] text-white">
        <li className="cursor-pointer hover:text-[#9B3922] transition-all">
          <Link to="/home">خانه</Link>
        </li>
        <li
          className="cursor-pointer hover:text-[#9B3922] transition-all"
          onClick={CalculationsClickHandler}
        >
          محاسبات
        </li>
        <li className="cursor-pointer hover:text-[#9B3922] transition-all">
          <Link to="/contact">ارتباط با ما</Link>
        </li>
      </ul>
      {error && (
        <div className="absolute top-[15%] z-10 left-[40%] mt-6 bg-red-500 text-white p-4 mb-4 rounded-md">
          {error}
        </div>
      )}
    </div>
  );
};

export default ListMenu;
