import { useQuery, useQueryClient } from "@tanstack/react-query";
import { BASE_URL } from "../../api_connection";

<<<<<<< HEAD
export default function useGetProductDataID(id) {
  const queryClient = useQueryClient();

  return useQuery({
    queryKey: ["product", id],
    queryFn: () => fetchProductIDData(id),
    refetchOnWindowFocus: true,
    refetchOnReconnect: true,
    retry: false,
    staleTime: 1000 * 60 * 5,
    onSuccess: () => {
      queryClient.invalidateQueries(["productID"]);
    },
  });
  async function fetchProductIDData(id) {
    console.log("Fetching product id: ", id);

    try {
      const response = await fetch(`${BASE_URL}/api/products/details/${id}/`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
=======
export default function useGetProductId(id) {
    const queryClient = useQueryClient();
    return useQuery({
        queryKey: ["productID"],
        queryFn: () => fetchProductId(id),
        refetchOnWindowFocus: true,
        refetchOnReconnect: true,
        retry: false,
        staleTime: 1000 * 60 * 5,
        onSuccess: () => {
            queryClient.invalidateQueries(["productID"]);
        },
    });
    async function fetchProductId(id) {
        console.log("Fetching product id: ", id)
        try {
            const response = await fetch(`${BASE_URL}/api/products/${id}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });
>>>>>>> b55d27f (doing productlist)

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const res = await response.json();

      console.log("Product ID data fetched successfully:", res[0]);
      return res[0];
    } catch (error) {
      throw new Error(`Failed to fetch product ID: ${error.message}`);
    }
  }
}
