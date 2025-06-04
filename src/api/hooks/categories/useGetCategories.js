import { useQuery, useQueryClient } from "@tanstack/react-query";
import { BASE_URL } from "../../api_connection";

export default function useGetCategories() {

  const queryClient = useQueryClient();
  return useQuery({
    queryKey: ["categories"],
    queryFn: useGeCategoriesData,
    refetchOnWindowFocus: true,
    refetchOnReconnect: true,
    retry: false,
    staleTime: 1000 * 60 * 5,
    onSuccess: () => {
      queryClient.invalidateQueries(["categories"]);
    },
  });
}

async function useGeCategoriesData() {
  console.log("Fetching categories data...");

  try {
    const response = await fetch(`${BASE_URL}/api/categories/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const res = await response.json();

    console.log("Categories data fetched successfully:", res);
    return res.data;
  } catch (error) {
    throw new Error(`Failed to fetch categories: ${error.message}`);
  }
}
