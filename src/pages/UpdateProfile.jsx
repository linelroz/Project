import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import Banner from "../assets/images/banner2.jpg";

const UpdateProfile = ({
  showUserName,
  setShowUserName,
  usersState,
  setUsersState,
  saveId,
}) => {
  const [updateUserName, setUpdateUserName] = useState("");
  const [error, setError] = useState("");
  const [welcomeMessage, setWelcomeMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    setUpdateUserName(showUserName || "");
  }, [showUserName]);

  const updateProfileHandler = () => {
    const user = usersState.find((user) => user.id === saveId);

    if (updateUserName.length < 3) {
      setError("نام کاربری باید حداقل ۳ کاراکتر باشد.");
      setTimeout(() => {
        setError("");
      }, 1500);
      return;
    }

    const updatedUsers = usersState.map((item) =>
      item.id === saveId ? { ...item, userName: updateUserName } : item
    );

    localStorage.setItem("users", JSON.stringify(updatedUsers));
    localStorage.setItem("showUserName", updateUserName);

    setUsersState(updatedUsers);
    setShowUserName(updateUserName);

    setWelcomeMessage("نام کاربری با موفقیت بروزرسانی شد!");
    setTimeout(() => {
      navigate("/home");
    }, 1500);
  };

  return (
    <div className="relative min-h-[75vh] my-4 py-8 flex justify-between items-center backdrop-blur-lg px-12 border rounded-lg border-[rgba(255,255,255,.2)]">
      <div className="w-[50%]">
        <h3 className="text-6xl font-bold py-12 text-[#F2613F] select-none">
          آپدیت پروفایل
        </h3>
        <div className="flex flex-col mb-4">
          <label
            htmlFor="username"
            className="mb-4 text-3xl text-[#F2613F] font-bold"
          >
            نام کاربری جدید خود را وارد کنید
          </label>
          <input
            dir="ltr"
            id="username"
            type="text"
            className="mb-4 text-[#F2613F] p-2 border border-[#F2613F] outline-none rounded-md bg-transparent"
            value={updateUserName}
            onChange={(event) => setUpdateUserName(event.target.value)}
          />
        </div>
        <button
          onClick={updateProfileHandler}
          className="w-[100%] border border-[#F2613F] py-4 px-[8.4rem] rounded-md mb-4 text-white font-bold text-3xl bg-[#F2613F] hover:border-white transition-all"
        >
          بروزرسانی
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
        <div className="absolute top-0 left-[40%] mt-6 bg-red-500 text-white p-4 mb-4 rounded-md">
          {error}
        </div>
      )}

      {welcomeMessage && (
        <div className="absolute top-0 left-[40%] mt-6 bg-green-500 text-white p-4 mb-4 rounded-md">
          {welcomeMessage}
        </div>
      )}
    </div>
  );
};

export default UpdateProfile;
