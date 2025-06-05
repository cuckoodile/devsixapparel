import { BASE_URL } from "../../api_connection";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export default function useDeleteCart() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({token, id}) => useDeleteCartData({token, id}),
    mutationKey: ["carts"],
    onSuccess: () => {
      console.log("Cart deleted successfully");
      queryClient.invalidateQueries(["carts"]);
    },
    onSettled: () => {
      console.log("Cart deletion settled");
      queryClient.invalidateQueries(["carts"]);
    },
  });
}

async function useDeleteCartData({token, id}) {
  try {
    const response = await fetch(`${BASE_URL}/api/carts/${id}/`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const res = await response.json();
    
    console.log("Transaction deleted successfully:", res);
    return res.data;
  } catch (error) {
    throw new Error("Failed to delete transaction:" + error.message);
  }
}
