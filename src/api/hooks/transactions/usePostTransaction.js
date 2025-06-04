import { BASE_URL } from "../../api_connection";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export default function useCreateTransaction(data, token) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: useCreateTransactionData(data, token),
    mutationKey: ["transactions"],
    onSuccess: () => {
      queryClient.invalidateQueries(["transactions"]);
    },
  });
}

async function useCreateTransactionData({ data, token }) {
  try {
    const response = await fetch(`${BASE_URL}/api/transactions/create/`, {
      method: "POST",
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
    
    console.log("Transaction created successfully:", res);
    return res.data;
  } catch (error) {
    throw new Error("Failed to create Transaction:" + error.message);
    // throw new Error(`Failed to create product: ${error.message}`);
  }
}
