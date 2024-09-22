import { useEffect } from "react";
import { useFakeAuth } from "../contexts/FakeAuthContext";
import { useNavigate } from "react-router-dom";

export default function ProtectRoutes({ children }) {
  const { isAuth } = useFakeAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuth) {
      navigate("/login");
    }
  }, [isAuth, navigate]);

  return children;
}
