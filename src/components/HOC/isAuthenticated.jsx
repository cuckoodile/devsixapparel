import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import useVerifyToken from "../../api/hooks/auth/verifytoken";

export default function isAuthenTicated(WrappedComponent) {
  const verifyMutation = useVerifyToken();

  return () => {
    const navigate = useNavigate();
    const { state: prevLocation } = useLocation();
    const user = sessionStorage.getItem("user");

    useEffect(() => {
      if (!user) {
        sessionStorage.clear();

        return navigate("/login");
      }
      if (!prevLocation?.isLoggedIn) {
        verifyMutation.mutate(user, {
          onSuccess: () => {
            console.log("Verification response: ", res);

            if (!res) {
              sessionStorage.clear();
              navigate("/login");
            }
          },
        });
      }
    }, []);

    return <WrappedComponent />;
  };
}
