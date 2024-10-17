import React, { ReactNode, useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { Home, Briefcase, PiggyBank, Users, User } from "lucide-react";
import { motion } from "framer-motion";
import Image from "next/image";
import { Toaster } from "@/components/ui/toaster";

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const router = useRouter();
  const [isMobile, setIsMobile] = useState(true);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 640);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => {
      window.removeEventListener("resize", checkMobile);
    };
  }, []);

  if (!isMobile) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-[#FFFFF0] to-white text-gray-800 p-4">
        <div className="flex flex-col items-center justify-center max-w-md text-center">
          <h1 className="text-3xl font-bold text-[#FFA500] mb-4">Rozi</h1>
          <p className="text-lg mb-8">
            Please open this app on a mobile device for the best experience.
          </p>
          <Image
            src="/logo.svg"
            alt="Rozi Logo"
            width={100}
            height={100}
            className="mx-auto"
          />
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-[#FFFFF0] text-gray-800">
      <Toaster />
      <main className="flex-1 p-4 pb-20">{children}</main>
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-[#4CAF50]">
        <div className="max-w-md mx-auto flex justify-around items-center h-16 px-2">
          <NavItem
            href="/home"
            icon={<Home className="w-5 h-5" />}
            label="Home"
            isActive={router.pathname === "/home"}
          />
          <NavItem
            href="/gigs"
            icon={<Briefcase className="w-5 h-5" />}
            label="Gigs"
            isActive={router.pathname === "/gigs"}
          />
          <NavItem
            href="/finance"
            icon={<PiggyBank className="w-5 h-5" />}
            label="Finance"
            isActive={router.pathname === "/finance"}
          />
          <NavItem
            href="/community"
            icon={<Users className="w-5 h-5" />}
            label="Community"
            isActive={router.pathname === "/community"}
          />
          <NavItem
            href="/me"
            icon={<User className="w-5 h-5" />}
            label="Me"
            isActive={router.pathname === "/me"}
          />
        </div>
      </nav>
    </div>
  );
};

interface NavItemProps {
  href: string;
  icon: React.ReactNode;
  label: string;
  isActive: boolean;
}

const NavItem: React.FC<NavItemProps> = ({ href, icon, label, isActive }) => (
  <Link
    href={href}
    className="relative flex flex-col items-center justify-center"
  >
    <motion.div
      className={`flex flex-col items-center justify-center  w-12 h-12 ${
        isActive ? "text-white" : "text-gray-600"
      }`}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
    >
      <div
        className={`p-2 rounded-full ${
          isActive ? "bg-[#FFA500] shadow-lg" : "hover:bg-[#FFF5E6]"
        }`}
      >
        {icon}
      </div>
      <motion.span
        className={`text-[10px] font-semibold mt-1 ${
          isActive ? "text-[#FFA500]" : "text-gray-600"
        }`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.2 }}
      >
        {label}
      </motion.span>
    </motion.div>
  </Link>
);

export default Layout;
