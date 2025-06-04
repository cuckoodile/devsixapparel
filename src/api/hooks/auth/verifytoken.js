import { useMutation } from "@tanstack/react-query";
import { BASE_URL } from "../../api_connection";

export default function useVerifyToken(token) {
  const queryClient = new queryClient();

  return useMutation({
    mutationKey: ["user"],
    mutationFn: () => verifyToken(token),
    onSuccess: (data) => {
      console.log("Check token success: ", data);
      queryClient.invalidateQueries(["user"]);
      sessionStorage.setItem("user", data.access);
    },
    staletime: 1000 * 60 * 5,
  });
}

async function verifyToken(token) {
  try {
    const response = await fetch(`${BASE_URL}/api/token/verify/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(token),
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const res = await response.json();

    if (res.data) {
      throw new Error("Network response was not ok");
    }

    return true;
  } catch (error) {
    console.error(`Failed to verify token: ${error.message}`);
    return null;
  }
}
