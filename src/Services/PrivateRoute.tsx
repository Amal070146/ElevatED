import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

interface PrivateRoutesProps {
  children: React.ReactNode;
}

const PrivateRoutes: React.FC<PrivateRoutesProps> = ({ children }) => {
  const navigate = useNavigate();

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");

    if (!accessToken) {
      navigate("/landing");
    }
    // console.log(accessToken);
  }, []);

  return <div>{children}</div>;
};

export default PrivateRoutes;
