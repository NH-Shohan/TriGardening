"use client";

import {
  deleteProduct,
  getAllProducts,
  updateArticleStatus,
} from "@/lib/apiService";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { columns } from "./ArticleColumn";
import { DataTable } from "./DataTable";

export default function ArticlesPage() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    setLoading(true);
    try {
      const result = await getAllProducts();
      setData(result);
    } catch (error) {
      toast.error("Failed to fetch products!");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDelete = async (id) => {
    try {
      await deleteProduct(id);
      toast.success("Article deleted successfully");
      await fetchData();
    } catch (error) {
      toast.error("Error deleting article!");
    }
  };

  const handleStatus = async (id, status) => {
    const newStatus = status === "hidden" ? "visible" : "hidden";

    try {
      await updateArticleStatus(id, newStatus);
      toast.success("Article status updated successfully");
      await fetchData();
    } catch (error) {
      console.error("Error in handleStatus:", error);
      toast.error(`Error updating article status: ${error.message}`);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const result = await getAllProducts();
      setData(result);
    };

    fetchData();
  }, []);

  return (
    <DataTable
      columns={columns(handleDelete, handleStatus)}
      data={data}
      onDelete={handleDelete}
      loading={loading}
    />
  );
}
