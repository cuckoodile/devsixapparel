import { BASE_URL } from "../../api_connection";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export default function useCreateProfile(data, token) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: useCreateProfileData(data, token),
    mutationKey: ["profiles"],
    onSuccess: () => {
      queryClient.invalidateQueries(["profiles"]);
    },
  });
}

async function useCreateProfileData({ data, token }) {
  try {
    const response = await fetch(`${BASE_URL}/api/profiles/create/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const res = await response.json();
    
    console.log("Profile created successfully:", res);
    return res.data;
  } catch (error) {
    throw new Error("Failed to create profiles:" + error.message);
    // throw new Error(`Failed to create product: ${error.message}`);
  }
}
