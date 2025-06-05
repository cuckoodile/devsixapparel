import { BASE_URL } from "../../api_connection";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export default function useUpdateProfile() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ data, token, id }) => {
      try {
        const response = await fetch(`${BASE_URL}/api/profiles/${id}`, {
          method: "PATCH",
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
        console.log("Profile updated successfully:", res);
        return res.data;
      } catch (error) {
        throw new Error("Failed to update profile: " + error.message);
      }
    },
    mutationKey: ["profiles"],
    onSuccess: () => {
      queryClient.invalidateQueries(["profiles"]);
    },
  });
}
