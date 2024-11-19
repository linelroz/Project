import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Layout from "./layouts/Layout";
import Contact from "./pages/Contact";
import NotFound from "./pages/404";
import Home from "./components/Home";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import UpdateProfile from "./pages/UpdateProfile";
import CalculatePuOrAlpha from "./components/CalculatePuOrAlpha";

import users from "./constants/users";
import { useState, useEffect } from "react";

function App() {
  const [usersState, setUsersState] = useState(() => {
    const storedUsers = JSON.parse(localStorage.getItem("users"));
    return Array.isArray(storedUsers) ? storedUsers : users;
  });

  const [showUserName, setShowUserName] = useState(
    localStorage.getItem("showUserName") || ""
  );

  const [saveId, setSaveId] = useState(localStorage.getItem("saveId") || "");

  const [isLogin, setIsLogin] = useState(
    JSON.parse(localStorage.getItem("isLogin")) || false
  );

  useEffect(() => {
    localStorage.setItem("users", JSON.stringify(usersState));
    localStorage.setItem("isLogin", JSON.stringify(isLogin));
    localStorage.setItem("showUserName", showUserName);
    localStorage.setItem("saveId", saveId);
  }, [usersState, isLogin, showUserName, saveId]);


  return (
    <BrowserRouter>
      <Layout
        isLogin={isLogin}
        setIsLogin={setIsLogin}
        usersState={usersState}
        setUsersState={setUsersState}
        showUserName={showUserName}
        setShowUserName={setShowUserName}
      >
        <Routes>
          <Route path="/" element={<Navigate to="/home" replace />} />
          <Route path="/home" element={<Home isLogin={isLogin} />} />
          <Route path="/calculatePuOrAlpha" element={<CalculatePuOrAlpha />} />
          <Route path="/contact" element={<Contact />} />
          <Route
            path="/login"
            element={
              <Login
                usersState={usersState}
                setUsersState={setUsersState}
                setIsLogin={setIsLogin}
                showUserName={showUserName}
                setShowUserName={setShowUserName}
                saveId={saveId}
                setSaveId={setSaveId}
              />
            }
          />
          <Route
            path="/signup"
            element={
              <SignUp
                setIsLogin={setIsLogin}
                usersState={usersState}
                setUsersState={setUsersState}
                showUserName={showUserName}
                setShowUserName={setShowUserName}
                saveId={saveId}
                setSaveId={setSaveId}
              />
            }
          />
          <Route
            path="/update-profile"
            element={
              <UpdateProfile
                setShowUserName={setShowUserName}
                saveId={saveId}
                setUsersState={setUsersState}
                usersState={usersState}
              />
            }
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
