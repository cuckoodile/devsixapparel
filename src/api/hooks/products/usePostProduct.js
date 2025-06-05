// api/hooks/products/usePostProduct.js
import { BASE_URL } from "../../api_connection";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export default function usePostProduct(token) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (formData) => createProduct(formData, token),
    mutationKey: ["products"],
    onSuccess: () => {
      queryClient.invalidateQueries(["products"]);
    },
  });
}

async function createProduct(formData, token) {
  console.log("Creating product token: ", token);
  console.log("FormData entries:");
  for (const [key, value] of formData.entries()) {
    console.log(key, value);
  }

  try {
    const response = await fetch(`${BASE_URL}/api/products/create/`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const res = await response.json();

    console.log("Product created successfully:", res);
    return res.data;
  } catch (error) {
    throw new Error("Failed to create product: " + error.message);
  }
}
