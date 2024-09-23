"use client";

import logoSingle from "@/assets/logoSingle.svg";
import { Separator } from "@/components/ui/separator";
import { Sidebar, SidebarBody, SidebarLink } from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";
import {
  Article,
  GearSix,
  Quotes,
  SignOut,
  Video,
} from "@phosphor-icons/react/dist/ssr";
import { motion } from "framer-motion";
import { Bricolage_Grotesque } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const bricolageGrotesque = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-bricolage-grotesque",
  display: "swap",
});

export default function DashboardLayout({ children }) {
  const pathname = usePathname();

  const links = [
    {
      label: "Articles",
      href: "/admin/dashboard/articles",
      Icon: <Article className="w-6 h-6" />,
    },
    {
      label: "Videos",
      href: "/admin/dashboard/videos",
      Icon: <Video className="w-6 h-6" />,
    },
    {
      label: "Reviews",
      href: "/admin/dashboard/reviews",
      Icon: <Quotes className="w-6 h-6" />,
    },
    {
      label: "Settings",
      href: "/admin/dashboard/settings",
      Icon: <GearSix className="w-6 h-6" />,
    },
  ];

  const [open, setOpen] = useState(false);

  return (
    <div
      className={cn(
        "rounded-md flex flex-col md:flex-row w-screen mx-auto overflow-hidden h-screen p-5 gap-5"
      )}
    >
      <Sidebar className="" open={open} setOpen={setOpen} animate={true}>
        <SidebarBody className="justify-between gap-5 bg-neutral-50 rounded-2xl border">
          <div className="flex flex-col overflow-y-auto overflow-x-hidden">
            <>
              <Logo />
            </>
            <div className="mt-8 flex flex-col gap-1">
              {links.map((link, idx) => (
                <SidebarLink
                  key={idx}
                  link={link}
                  active={pathname.startsWith(link.href)}
                />
              ))}
            </div>
          </div>
          <div className="group transition-all">
            <Separator className={"group-hover:opacity-0"} />
            <SidebarLink
              className={"hover:bg-red-500/10 hover:text-red-500"}
              link={{
                label: "Log Out",
                href: "/admin",
                Icon: <SignOut className="w-6 h-6 group-hover:text-red-500" />,
              }}
            />
          </div>
        </SidebarBody>
      </Sidebar>
      <Dashboard children={children} />
    </div>
  );
}
export const Logo = () => {
  return (
    <Link
      href="/admin/dashboard"
      className="font-normal flex space-x-2 items-center text-sm py-1 relative z-20"
    >
      <Image
        src={logoSingle}
        className="flex-shrink-0 rounded-full"
        width={48}
        height={48}
        alt="Avatar"
      />
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className={`font-bold text-2xl leading-none text-green-600 dark:text-white whitespace-pre font-[family-name:var(--font-bricolage-grotesque)] ${bricolageGrotesque.variable}`}
      >
        Tri <br />
        Gardening
      </motion.span>
    </Link>
  );
};

const Dashboard = ({ children }) => {
  return (
    <div className="bg-neutral-50 rounded-2xl w-full h-full p-5 border overflow-auto">
      {children}
    </div>
  );
};
