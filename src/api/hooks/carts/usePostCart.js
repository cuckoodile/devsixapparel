import { BASE_URL } from "../../api_connection";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export default function useCreateCart() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ data, token }) => PostCartData(data, token),
    mutationKey: ["carts"],
    onSuccess: () => {
      queryClient.invalidateQueries(["carts"]);
    },
  });
}

async function PostCartData(productId, token) {
  const cartData = {
    product: parseInt(productId),
    quantity: 1,
  };

  console.log("Cart Data:", cartData, "Token:", token);

  try {
    const response = await fetch(`${BASE_URL}/api/carts/create/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
      body: JSON.stringify(cartData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      const errorMessage = errorData.detail || `Error ${response.status}`;
      throw new Error(errorMessage);
    }

    return await response.json();
  } catch (error) {
    throw new Error("Failed to create cart: " + error.message);
  }
}