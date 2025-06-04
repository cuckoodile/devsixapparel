import { QueryClient, useMutation, useQuery } from "@tanstack/react-query";
import { BASE_URL } from "../../api_connection";

export default function useLogin() {
  const queryClient = new QueryClient();

  return useMutation({
    mutationKey: ["user"],
    mutationFn: (postData) => loginAPI(postData),
    staletime: 1000 * 60 * 5,
  });
}

const loginAPI = async (postData) => {
  console.log("Logging in with: ", postData);

  try {
    const response = await fetch(`${BASE_URL}api/auth/login/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(postData),
    });

    if (!response.ok) {
      throw new Error("Login not ok!");
    }

    const res = await response.json();

    console.log("Login response: ", res);
    return res;
  } catch (error) {
    throw new Error("Error logging in: ", error.message);
  }
};
