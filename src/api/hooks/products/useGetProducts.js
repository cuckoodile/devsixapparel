import { useQuery, useQueryClient } from "@tanstack/react-query";
import { BASE_URL } from "../../api_connection";

export default function useGetProduct() {
  const queryClient = useQueryClient();

  return useQuery({
    queryKey: ["products"],
    queryFn: useGetProductData,
    refetchOnWindowFocus: true,
    refetchOnReconnect: true,
    retry: false,
    staleTime: 1000 * 60 * 5,
    onSuccess: () => {
      queryClient.invalidateQueries(["products"]);
    },
  });
}
async function useGetProductData() {
<<<<<<< HEAD
  console.log("Fetching products data...");
    try {
        const response = await fetch(`${BASE_URL}/api/products/`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
            },
        });

        if (!response.ok) {
            throw new Error("Network response was not ok");
        }

        const res = await response.json();

        console.log("Product data fetched successfully:", res);
        // return res.data ?? [];
        const products = Array.isArray(res) ? res : res.data;
        return products;
    } catch (error) {
        console.error("Failed to fetch products:", error);
        throw new Error(`Failed to fetch products: ${error.message}`);
=======
  try {
    const response = await fetch(`${BASE_URL}/api/products/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
>>>>>>> b55d27f (doing productlist)
    }

    const res = await response.json();

    console.log("Product data fetched successfully:", res);
    return res.data ?? res ?? null;
  } catch (error) {
    console.error(`Failed to fetch product: ${error.message}`);
    return null;
  }
}
