const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const getAllProducts = async () => {
  const response = await fetch(`${API_URL}/products`);
  return response.json();
};

export const deleteProduct = async (id) => {
  const response = await fetch(`${API_URL}/products/${id}`, {
    method: "DELETE",
  });
  if (!response.ok) throw new Error("Failed to delete article");
};

export const deleteMultipleProducts = async (ids) => {
  const response = await fetch(`${API_URL}/products`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(ids),
  });
  if (!response.ok) throw new Error("Failed to delete products");
};
