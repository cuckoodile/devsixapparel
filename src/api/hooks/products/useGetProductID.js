import { useQuery, useQueryClient } from "@tanstack/react-query";
const BASE_URL = "../../api_connection.js"; 

export default function useGetProductDataID(ID) {
    const queryClient = useQueryClient();
    return useQuery({
        queryKey: ["productID"],
        queryFn: fetchProductIDData,
        refetchOnWindowFocus: true,
        refetchOnReconnect: true,
        retry: false,
        staleTime: 1000 * 60 * 5,
        onSuccess: () => {
            queryClient.invalidateQueries(["productID"]);
        },
    });
    async function fetchProductIDData() {
        try {
            const response = await fetch(`${BASE_URL}/api/products/${ID}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });

            if (!response.ok) {
                throw new Error("Network response was not ok");
            }

            const res = await response.json();

            console.log("Product ID data fetched successfully:", res);
            return res.data;
        } catch (error) {
            throw new Error(`Failed to fetch product ID: ${error.message}`);
        }
    }
}