import { useQuery, useQueryClient } from "@tanstack/react-query";
import { BASE_URL } from "../../api_connection";

export default function useGetTransactions(token) {
  const queryClient = useQueryClient();
  return useQuery({
    queryKey: ["transactions"],
    queryFn: () => useGetTransactionData(token),
    // refetchOnWindowFocus: true,
    refetchOnReconnect: true,
    retry: false,
    staleTime: 1000 * 60 * 5,
    onSuccess: () => {
      queryClient.invalidateQueries(["transactions"]);
    },
  });
}
async function useGetTransactionData(token) {
  try {
    const response = await fetch(`${BASE_URL}/api/transactions/`, {
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

    console.log("All transaction data fetched successfully:", res);
    return res.data ?? res ?? null;
  } catch (error) {
    throw new Error(`Failed to fetch all transactions: ${error.message}`);
  }
}
