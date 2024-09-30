"use client";

import { deleteProduct, getAllProducts } from "@/lib/apiService";
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

  useEffect(() => {
    const fetchData = async () => {
      const result = await getAllProducts();
      setData(result);
    };

    fetchData();
  }, []);

  return (
    <DataTable
      columns={columns(handleDelete)}
      data={data}
      onDelete={handleDelete}
      loading={loading}
    />
  );
}
