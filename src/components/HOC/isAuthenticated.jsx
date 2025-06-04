import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import verifyToken from "../../api/hooks/auth/verifytoken";

export default function isAuthenticated(WrappedComponent) {
  return () => {
    const navigate = useNavigate();
    const { state: prevLocation } = useLocation();
    const user = sessionStorage.getItem("user");

    useEffect(() => {
      if (!user) {
        console.log("No existing user!");
        navigate("/login");
        return; // Ensure no cleanup function is returned
      }
      if (!prevLocation?.isLoggedIn) {
        // console.log("Verifying token: ", user);
        verifyToken(user).then((res) => {
          console.log("Authenticated? ", res);
          if (!res) {
            sessionStorage.clear();
            navigate("/login");
          }
        });
      }
    }, []); 

    return <WrappedComponent />;
  };
}