import { useQuery, useQueryClient } from "@tanstack/react-query";
import { BASE_URL } from "../../api_connection";
export default function useGetAdminUsers(ID) {
  const queryClient = useQueryClient();
  return useQuery({
    queryKey: ["adminUsers"],
    queryFn: useGetAdminUsersData,
    refetchOnWindowFocus: true,
    refetchOnReconnect: true,
    retry: false,
    staleTime: 1000 * 60 * 5,
    onSuccess: () => {
      queryClient.invalidateQueries(["adminUsers"]);
    },
  });
  async function useGetAdminUsersData() {
    try {
      const response = await fetch(`${BASE_URL}/api/admin/profiles/${ID}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const res = await response.json();

      console.log("Admin users data fetched successfully:", res);
      return res.data;
    } catch (error) {
      throw new Error(`Failed to fetch admin users: ${error.message}`);
    }
  }
}
