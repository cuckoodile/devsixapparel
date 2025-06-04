import { BASE_URL } from "../../api_connection";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export default function useCreateCategory(data, token) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: useCreateCategoryData(data, token),
    mutationKey: ["categories"],
    onSuccess: () => {
      queryClient.invalidateQueries(["categories"]);
    },
  });
}

async function useCreateCategoryData({ data, token }) {
  try {
    const response = await fetch(`${BASE_URL}/api/categories/create/`, {
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
    
    console.log("Category created successfully:", res);
    return res.data;
  } catch (error) {
    throw new Error("Failed to create category:" + error.message);
    // throw new Error(`Failed to create product: ${error.message}`);
  }
}
