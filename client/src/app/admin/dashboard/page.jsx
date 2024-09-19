"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

const Dashboard = () => {
  const router = useRouter();

  useEffect(() => {
    router.push("/admin/dashboard/articles");
  }, [router]);

  return null;
};

export default Dashboard;
