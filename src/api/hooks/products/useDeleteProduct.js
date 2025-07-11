import { BASE_URL } from "../../api_connection";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export default function useCreateProduct(data, token, id) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: useCreateProductData(data, token, id),
    mutationKey: ["products"],
    onSuccess: () => {
      queryClient.invalidateQueries(["products"]);
    },
  });
}

async function useCreateProductData({ data, token, id }) {
  try {
    const response = await fetch(`${BASE_URL}/api/products/${id}`, {
      method: "DELETE",
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
    
    console.log("Product deleted successfully:", res);
    return res.data;
  } catch (error) {
    throw new Error("Failed to delete product:" + error.message);
    // throw new Error(`Failed to create product: ${error.message}`);
  }
}
