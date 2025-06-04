import { useQuery, useQueryClient } from "@tanstack/react-query";
import { BASE_URL } from "../../api_connection";

export default function useGetCarts(token) {
  const queryClient = useQueryClient();
  return useQuery({
    queryKey: ["carts"],
    queryFn: useGetCartsData(token),
    refetchOnWindowFocus: true,
    refetchOnReconnect: true,
    staletime: 1000 * 60 * 5,
    retry: false,
    onSuccess: () => {
      queryClient.invalidateQueries(["carts"]);
    },
  });
}
async function useGetCartsData(token) {
  console.log("Fetching carts data...", token);
  try {
    const response = await fetch(`${BASE_URL}/api/carts/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const res = await response.json();

    console.log("Carts data fetched successfully:", res);
    return res.data;
  } catch (error) {
    throw new Error(`Failed to fetch cart: ${error.message}`);
  }
}
