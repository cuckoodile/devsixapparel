import { useQuery, useQueryClient } from "@tanstack/react-query";
import { BASE_URL } from "../../api_connection";
export default function useGetTransactions(ID) {
   
    const queryClient = useQueryClient();
    return useQuery({
        queryKey: ["transactions"],
        queryFn: useGetTransactionData,
        refetchOnWindowFocus: true,
        refetchOnReconnect: true,
        retry: false,
        staleTime: 1000 * 60 * 5,
        onSuccess: () => {
            queryClient.invalidateQueries(["transactions"]);
        },  
    });
    async function useGetTransactionData() {
        try {
            const response = await fetch(`${BASE_URL}/api/transactions/${ID}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });

            if (!response.ok) {
                throw new Error("Network response was not ok");
            }

            const res = await response.json();

            console.log("Transaction data fetched successfully:", res);
            return res.data;
        } catch (error) {
            throw new Error(`Failed to fetch transactions: ${error.message}`);
        }
    }
}