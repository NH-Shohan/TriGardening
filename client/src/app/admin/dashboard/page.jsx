"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Articles from "./articles/page";

const Dashboard = () => {
  const router = useRouter();

  useEffect(() => {
    router.push("/admin/dashboard/articles");
  }, [router]);

  return <Articles />;
};

export default Dashboard;
