import { BASE_URL } from "../../api_connection";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export default function useCreateCart(data, token) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: useCreateCartData(data, token),
    mutationKey: ["carts"],
    onSuccess: () => {
      queryClient.invalidateQueries(["carts"]);
    },
  });
}

async function useCreateCartData({ data, token }) {
  try {
    const response = await fetch(`${BASE_URL}/api/carts/create/`, {
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
    
    console.log("Cart created successfully:", res);
    return res.data;
  } catch (error) {
    throw new Error("Failed to create cart:" + error.message);
    // throw new Error(`Failed to create product: ${error.message}`);
  }
}
