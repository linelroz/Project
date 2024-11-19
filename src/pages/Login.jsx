import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Banner from "../assets/images/Banner2.jpg";
import { IoIosWarning } from "react-icons/io";

const Login = ({ usersState, setIsLogin, setShowUserName, setSaveId }) => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [welcomeMessage, setWelcomeMessage] = useState("");
  const navigate = useNavigate();

  const loginHandler = () => {
    const user = usersState.find(
      (item) => item.userName === userName && item.password === password
    );

    if (user) {
      setError("");
      setWelcomeMessage(`سلام ${user.userName} عزیز، خوش آمدید!`);

      setIsLogin(true);
      setShowUserName(user.userName);
      setSaveId(user.id);

      localStorage.setItem("showUserName", user.userName);

      setTimeout(() => {
        navigate("/home");
      }, 1500);
    } else {
      setError(
        "رمز یا نام کاربری وارد شده درست نمی باشد. لطفا مجددا تلاش نمایید"
      );
      setPassword("");
      setUserName("");

      setTimeout(() => {
        setError("");
      }, 1500);
    }
  };

  return (
    <div className="h-[70vh] flex justify-start items-center my-8 backdrop-blur-lg px-12 border rounded-lg border-[rgba(255,255,255,.2)] relative">
      <div className="w-[50%]">
        <h3 className="text-6xl font-bold py-12 text-[#F2613F] select-none">
          ورود
        </h3>
        <div className="flex flex-col mb-4">
          <label
            htmlFor="username"
            className="mb-4 text-3xl text-[#F2613F] font-bold"
          >
            نام کاربری
          </label>
          <input
            dir="ltr"
            type="text"
            id="username"
            className="mb-4 p-2 text-[#F2613F] border border-[#F2613F] outline-none rounded-md bg-transparent"
            onChange={(event) => setUserName(event.target.value)}
            value={userName}
          />
          <label
            htmlFor="password"
            className="mb-4 text-3xl text-[#F2613F] font-bold"
          >
            رمز عبور
          </label>
          <input
            dir="ltr"
            type="password"
            id="password"
            className="mb-4 p-2 text-[#F2613F] border border-[#F2613F] outline-none rounded-md bg-transparent"
            onChange={(event) => setPassword(event.target.value)}
            value={password}
          />
        </div>

        {error && (
          <div className="absolute top-0 left-[30%] mt-6 bg-red-500 text-white p-4 mb-4 rounded-md">
            {error}
          </div>
        )}

        {welcomeMessage && (
          <div className="absolute top-0 left-[40%] mt-6 bg-green-500 text-white p-4 mb-4 rounded-md">
            {welcomeMessage}
          </div>
        )}

        <button
          onClick={loginHandler}
          className="border border-[#F2613F] py-4 px-[8.4rem] rounded-md mb-4 text-white font-bold text-3xl bg-[#F2613F] hover:border-white transition-all"
        >
          ورود
        </button>
      </div>
      <div
        dir="ltr"
        className="w-[50%] m-5 mt-12 overflow-hidden rounded-2xl relative"
      >
        <img src={Banner} className="w-[95%] rounded-2xl" />
        <div className="absolute top-0 left-0 w-[70%] h-[100%] flex items-center justify-center bg-gradient-to-r from-[#F2613F] opacity-60"></div>
      </div>
    </div>
  );
};

export default Login;
