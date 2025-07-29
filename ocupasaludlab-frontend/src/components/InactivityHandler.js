import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function InactivityHandler({ children }) {
  const navigate = useNavigate();

  useEffect(() => {
    let timer;

    const resetTimer = () => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        localStorage.removeItem("access");
        localStorage.removeItem("refresh");
        navigate("/login");
      }, 20 * 60 * 1000); // 20 minutos
    };

    window.addEventListener("mousemove", resetTimer);
    window.addEventListener("keypress", resetTimer);
    window.addEventListener("click", resetTimer);

    resetTimer();

    return () => {
      window.removeEventListener("mousemove", resetTimer);
      window.removeEventListener("keypress", resetTimer);
      window.removeEventListener("click", resetTimer);
      clearTimeout(timer);
    };
  }, [navigate]);

  return children;
}
