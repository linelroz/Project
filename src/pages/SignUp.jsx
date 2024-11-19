import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import generateId from "../helpers/randomId.js";
import validateInputs from "../helpers/validateInputs.js";
import { IoIosWarning } from "react-icons/io";

import Banner from "../assets/images/banner2.jpg";

const SignUp = ({
  usersState,
  setUsersState,
  setIsLogin,
  setShowUserName,
  saveId,
  setSaveId,
}) => {
  const [newUser, setNewUser] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [newPasswordRepeat, setNewPasswordRepeat] = useState("");
  const [error, setError] = useState("");
  const [welcomeMessage, setWelcomeMessage] = useState("");
  const newUserId = generateId();
  const navigate = useNavigate();

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => setError(""), 1500);
      return () => clearTimeout(timer);
    }
  }, [error]);

  const signUpHandler = () => {
    const errorMessage = validateInputs(
      newUser,
      newPassword,
      newPasswordRepeat
    );
    if (errorMessage) {
      setError(errorMessage);
      return;
    }

    const existingUser = usersState.find((user) => user.userName === newUser);

    if (existingUser) {
      if (existingUser.password === newPassword) {
        setError(
          "این نام کاربری و رمز عبور قبلاً ثبت شده است. لطفاً وارد شوید."
        );
        navigate("/login");
        return;
      }
    }

    const updatedUsers = [
      ...usersState,
      { id: newUserId, userName: newUser, password: newPassword },
    ];
    setUsersState(updatedUsers);

    localStorage.setItem("users", JSON.stringify(updatedUsers));
    localStorage.setItem("showUserName", newUser);

    setShowUserName(newUser);
    setSaveId(newUserId);
    setIsLogin(true);

    setWelcomeMessage(
      `${newUser} عزیز، ثبت‌نام شما با موفقیت انجام شد! در حال انتقال شما به صفحه اصلی هستیم`
    );
    setTimeout(() => {
      navigate("/home");
    }, 1500);
  };

  return (
    <div className="h-[70vh] flex justify-start items-center my-8 backdrop-blur-lg px-12 border rounded-lg border-[rgba(255,255,255,.2)] relative">
      <div className="w-[50%]">
        <h3 className="text-6xl font-bold py-12 text-[#F2613F] select-none">
          ثبت نام
        </h3>
        <div className="flex flex-col mb-4">
          <label
            htmlFor="username"
            className="mb-4 text-3xl text-[#F2613F] font-bold"
          >
            نام کاربری مورد نظر خود را وارد کنید
          </label>
          <input
            dir="ltr"
            type="text"
            id="username"
            value={newUser}
            onChange={(event) => setNewUser(event.target.value)}
            className="mb-4 p-2 text-[#F2613F] border border-[#F2613F] outline-none rounded-md bg-transparent"
          />
          <label
            htmlFor="password"
            className="mb-4 text-3xl text-[#F2613F] font-bold"
          >
            رمز عبور مورد نظر خود را وارد کنید
          </label>
          <input
            dir="ltr"
            type="password"
            id="password"
            value={newPassword}
            onChange={(event) => setNewPassword(event.target.value)}
            className="mb-4 p-2 text-[#F2613F] border border-[#F2613F] outline-none rounded-md bg-transparent"
          />
          <label
            htmlFor="passwordRepeat"
            className="mb-4 text-3xl text-[#F2613F] font-bold"
          >
            رمز عبور خود را مجدد وارد کنید
          </label>
          <input
            dir="ltr"
            type="password"
            id="passwordRepeat"
            value={newPasswordRepeat}
            onChange={(event) => setNewPasswordRepeat(event.target.value)}
            className="mb-4 p-2 text-[#F2613F] border border-[#F2613F] outline-none rounded-md bg-transparent"
          />
        </div>
        <button
          onClick={signUpHandler}
          className="border border-[#F2613F] py-4 px-[8.4rem] rounded-md mb-4 text-white font-bold text-3xl bg-[#F2613F] hover:border-white transition-all w-[100%]"
        >
          ثبت نام
        </button>
      </div>
      <div
        dir="ltr"
        className="w-[50%] m-5 mt-12 overflow-hidden rounded-2xl relative"
      >
        <img src={Banner} className="w-[95%] rounded-2xl" />
        <div className="absolute top-0 left-0 w-[70%] h-[100%] flex items-center justify-center bg-gradient-to-r from-[#F2613F] opacity-60"></div>
      </div>
      {error && (
        <div className="flex justify-center items-center absolute top-0 py-2 px-3 rounded-xl left-[44%] mt-10 bg-[#F2613F]">
          <IoIosWarning className="text-white text-3xl ml-2" />
          <p className="text-white text-2xl">{error}</p>
        </div>
      )}
      {welcomeMessage && (
        <div className="flex justify-center items-center absolute top-0 py-2 p-4 rounded-xl left-[30%] mt-10 bg-green-500">
          <p className="text-white text-2xl">{welcomeMessage}</p>
        </div>
      )}
    </div>
  );
};

export default SignUp;
