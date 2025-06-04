import { BASE_URL } from "../../api_connection";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export default function useCreateProfile(data, token, id) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: useCreateProfileData(data, token, id),
    mutationKey: ["profiles"],
    onSuccess: () => {
      queryClient.invalidateQueries(["profiles"]);
    },
  });
}

async function useCreateProfileData({ data, token, id }) {
  try {
    const response = await fetch(`${BASE_URL}/api/profiles/${id}`, {
      method: "DELETE",
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
    
    console.log("This User deleted successfully:", res);
    return res.data;
  } catch (error) {
    throw new Error("Failed to delete this user:" + error.message);
    // throw new Error(`Failed to create product: ${error.message}`);
  }
}
