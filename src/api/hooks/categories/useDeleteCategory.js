import { BASE_URL } from "../../api_connection";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export default function useCreateCategory(data, token, id) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: useCreateCategoryData(data, token, id),
    mutationKey: ["categories"],
    onSuccess: () => {
      queryClient.invalidateQueries(["categories"]);
    },
  });
}

async function useCreateCategoryData({ data, token, id }) {
  try {
    const response = await fetch(`${BASE_URL}/api/categories/${id}`, {
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
    
    console.log("Category deleted successfully:", res);
    return res.data;
  } catch (error) {
    throw new Error("Failed to delete Category:" + error.message);
    // throw new Error(`Failed to create product: ${error.message}`);
  }
}
