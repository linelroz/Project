import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import Banner from "../assets/images/banner2.jpg";

const Home = ({ isLogin }) => {
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const CalculationsClickHandler = () => {
    if (isLogin) {
      navigate("/calculatePuOrAlpha");
    } else {
      setError("لطفا ابتدا وارد حساب کاربری خود شوید.");
      setTimeout(() => {
        navigate("/login");
      }, 1500);
    }
  };

  return (
    <div className="relative min-h-[75vh] my-4 py-8 flex justify-between items-center backdrop-blur-lg px-12 border rounded-lg border-[rgba(255,255,255,.2)]">
      <div className="min-w-[50%]">
        <h1 className="text-[#F2613F] font-bold text-[4rem] select-none stroke-yellow-950">
          محاسبات دقیق، طراحی مهندسی، ساخت سازه‌های پایدار
        </h1>
        <div className="flex justify-start items-center gap-10 mt-[4.8rem]">
          <button
            onClick={CalculationsClickHandler}
            className="border p-6 rounded-xl text-[#F2613F] font-bold cursor-pointer transition-all hover:bg-[#F2613F] hover:border-[#F2613F] border-[#F2613F] hover:text-white"
          >
            محاسبات
          </button>

          <Link to="/contact">
            <button className="border p-6 rounded-xl text-[#F2613F] font-bold cursor-pointer transition-all hover:bg-[#F2613F] hover:border-[#F2613F] border-[#F2613F] hover:text-white">
              ارتباط ما
            </button>
          </Link>
        </div>
      </div>
      <div className="min-w-[50%] relative rounded-2xl overflow-hidden">
        <img src={Banner} className="rounded-2xl object-fit-cover opacity-50" />
        <div className="absolute top-0 left-0 w-[100%] h-[100%] flex items-center justify-center bg-gradient-to-r from-[#F2613F] opacity-60">
          <h2 className="text-3xl font-bold text-gray-950 select-none">
            ساختن آینده‌ای پایدار، استوار بر علم و مهارت مهندسی عمران
          </h2>
        </div>
      </div>
      {error && (
        <div className="absolute top-0 left-[38%] mt-6 bg-red-500 text-white p-4 mb-4 rounded-md">
          {error}
        </div>
      )}
    </div>
  );
};

export default Home;
