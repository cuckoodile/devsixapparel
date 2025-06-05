import { useQuery, useQueryClient } from "@tanstack/react-query";
import { BASE_URL } from "../../api_connection";

export default function useGetProfiles(ID) {
  const queryclient = useQueryClient();
  const token = sessionStorage.getItem("user"); // Get token from sessionStorage

  return useQuery({
    queryKey: ["profiles", ID],
    queryFn: () => useGetProfileData({ ID, token }),
    refetchOnWindowFocus: true,
    refetchOnReconnect: true,
    retry: false,
    staleTime: 1000 * 60 * 5,
    onSuccess: () => {
      queryclient.invalidateQueries(["profiles"]);
    },
  });
}

async function useGetProfileData({ ID, token } = {}) {
  if (!ID) throw new Error("User ID is required");
  if (!token) throw new Error("Authentication token is required");

  try {
    const response = await fetch(`${BASE_URL}/api/profiles/${ID}/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const res = await response.json();
    console.log("Profile data fetched successfully:", res);
    return res;
  } catch (error) {
    throw new Error(`Failed to fetch profile: ${error.message}`);
  }
}
