import React, { useEffect, useRef, useCallback } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";

const MainLayout = () => {
  const navigate = useNavigate();
  const timerRef = useRef(null);


  const logout = useCallback(() => {
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
    navigate("/login");
  }, [navigate]);

  
  const resetTimer = useCallback(() => {
    if (timerRef.current) clearTimeout(timerRef.current);
   
    timerRef.current = setTimeout(logout, 30 * 60 * 1000);
  }, [logout]);

  useEffect(() => {
    const events = ["mousemove", "keydown", "click", "scroll"];
    events.forEach((event) => window.addEventListener(event, resetTimer));

    resetTimer(); 

    return () => {
      events.forEach((event) => window.removeEventListener(event, resetTimer));
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [resetTimer]);

  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1 bg-gray-100 p-6 overflow-y-auto">
        <Outlet />
      </div>
    </div>
  );
};

export default MainLayout;
