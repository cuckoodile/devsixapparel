import { BASE_URL } from "../../api_connection";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export default function usePatchProduct(data, token, id) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => patchProductApi(data, token, id),
    mutationKey: ["products"],
    onSuccess: () => {
      queryClient.invalidateQueries(["products"]);
    },
  });
}

async function patchProductApi({ data, token, id }) {
  try {
    const response = await fetch(`${BASE_URL}/api/products/${id}`, {
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
    
    console.log("Product updated successfully:", res);
    return res.data;
  } catch (error) {
    throw new Error("Failed to update product:" + error.message);
    // throw new Error(`Failed to create product: ${error.message}`);
  }
}
