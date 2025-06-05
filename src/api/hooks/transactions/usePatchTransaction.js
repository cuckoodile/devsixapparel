import { BASE_URL } from "../../api_connection";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export default function usePatchTransaction() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({data, token, id}) => usePatchTransactionData({data, token, id}),
    mutationKey: ["transactions"],
    onSuccess: () => {
      queryClient.invalidateQueries(["transactions"]);
    },
  });
}

async function usePatchTransactionData({ data, token, id }) {
  console.log("usePatchTransactionData called with data:", data, "token:", token, "id:", id);

  try {
    const response = await fetch(`${BASE_URL}/api/transactions/${id}/`, {
      method: "PATCH",
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
    
    console.log("Transaction updated successfully:", res);
    return res.data;
  } catch (error) {
    throw new Error("Failed to update transaction:" + error.message);
    // throw new Error(`Failed to create product: ${error.message}`);
  }
}
