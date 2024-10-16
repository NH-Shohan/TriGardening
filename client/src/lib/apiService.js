const API_URL = process.env.NEXT_PUBLIC_API_URL;

// Products

export const getAllProducts = async () => {
  const response = await fetch(`${API_URL}/products`);
  return response.json();
};

export const getProductById = async (id) => {
  try {
    const response = await fetch(`${API_URL}/products/${id}`);
    if (!response.ok) throw new Error("Failed to fetch product");
    return await response.json();
  } catch (error) {
    throw new Error(error.message);
  }
};

export const updateProduct = async (id, formData) => {
  try {
    const response = await fetch(`${API_URL}/products/${id}`, {
      method: "PATCH",
      body: formData,
      credentials: "include",
    });
    if (!response.ok) throw new Error("Failed to update product");
    return await response.json();
  } catch (error) {
    throw new Error(error.message);
  }
};

export const postProduct = async (formData) => {
  const response = await fetch(`${API_URL}/products`, {
    method: "POST",
    body: formData,
    credentials: "include",
  });
  if (!response.ok) throw new Error("Failed to create article");
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
    credentials: "include",
  });
  if (!response.ok) throw new Error("Failed to delete articles");
};

export const updateArticleStatus = async (id, status) => {
  try {
    const response = await fetch(`${API_URL}/products/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ status }),
      credentials: "include",
    });

    if (!response.ok) {
      throw new Error(
        `Failed to update status: ${response.status} ${response.statusText}`
      );
    }

    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
};

// Category

export const postCategories = async (categoryName) => {
  const response = await fetch(`${API_URL}/category`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name: categoryName }),
    credentials: "include",
  });

  if (!response.ok) {
    const errorData = await response.json();

    if (errorData.message.includes("duplicate")) {
      throw new Error("Category already exists");
    }
    throw new Error(errorData.message || "Failed to add category");
  }

  const data = await response.json();
  return { ok: true, data };
};

export const getCategories = async () => {
  const response = await fetch(`${API_URL}/category`);
  return response.json();
};

export const deleteCategory = async (id) => {
  const response = await fetch(`${API_URL}/category/${id}`, {
    method: "DELETE",
  });
  if (!response.ok) throw new Error("Failed to delete category");
};

export const editCategory = async (id, categoryName) => {
  const response = await fetch(`${API_URL}/category/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name: categoryName }),
    credentials: "include",
  });
  if (!response.ok) throw new Error("Failed to edit category");
};

// Videos

export const getAllVideos = async () => {
  const response = await fetch(`${API_URL}/video`);
  if (!response.ok) throw new Error("Failed to fetch videos");
  return response.json();
};

export const getVideoById = async (id) => {
  try {
    const response = await fetch(`${API_URL}/video/${id}`);
    if (!response.ok) throw new Error("Failed to fetch video");
    return await response.json();
  } catch (error) {
    throw new Error(error.message);
  }
};

export const postVideo = async (video) => {
  try {
    const response = await fetch(`${API_URL}/video`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(video),
      credentials: "include",
    });

    if (!response.ok) throw new Error("Failed to post video");
    return await response.json();
  } catch (error) {
    throw new Error(error.message);
  }
};

export const updateVideo = async (id, data) => {
  try {
    const response = await fetch(`${API_URL}/video/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
      credentials: "include",
    });

    if (!response.ok) throw new Error("Failed to update video");
    return await response.json();
  } catch (error) {
    throw new Error(error.message);
  }
};

export const deleteVideo = async (id) => {
  try {
    const response = await fetch(`${API_URL}/video/${id}`, {
      method: "DELETE",
    });

    if (!response.ok) throw new Error("Failed to delete video");
  } catch (error) {
    throw new Error(error.message);
  }
};

// Review

export const getAllReviews = async () => {
  const response = await fetch(`${API_URL}/review`);
  if (!response.ok) throw new Error("Failed to fetch reviews");
  return response.json();
};

export const postReview = async (reviewData) => {
  try {
    const response = await fetch(`${API_URL}/review`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(reviewData),
      credentials: "include",
    });
    if (!response.ok) throw new Error("Failed to add review");
    return await response.json();
  } catch (error) {
    throw new Error(error.message);
  }
};

export const getReviewById = async (id) => {
  try {
    const response = await fetch(`${API_URL}/review/${id}`);
    if (!response.ok) throw new Error("Failed to fetch review");
    return await response.json();
  } catch (error) {
    throw new Error(error.message);
  }
};

export const deleteReview = async (id) => {
  const response = await fetch(`${API_URL}/review/${id}`, {
    method: "DELETE",
  });
  if (!response.ok) throw new Error("Failed to delete review");
};

export const updateReview = async (id, updatedData) => {
  try {
    const response = await fetch(`${API_URL}/review/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedData),
      credentials: "include",
    });

    if (!response.ok) throw new Error("Failed to update review");
    return await response.json();
  } catch (error) {
    throw new Error(error.message);
  }
};
