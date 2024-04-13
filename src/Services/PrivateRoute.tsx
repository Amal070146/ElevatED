import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../utils/supabase";

interface PrivateRoutesProps {
  children: React.ReactNode;
}

const PrivateRoutes: React.FC<PrivateRoutesProps> = ({ children }) => {
  const navigate = useNavigate();

  useEffect(() => {
    const user = supabase.auth.getSession();

    if (!user) {
      navigate("/landing");
    }
    // console.log(accessToken);
  }, []);

  return <div>{children}</div>;
};

export default PrivateRoutes;
