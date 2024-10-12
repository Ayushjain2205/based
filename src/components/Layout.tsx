import React, { ReactNode } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { Home, Briefcase, PiggyBank, Users, User } from "lucide-react";
import { motion } from "framer-motion";

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const router = useRouter();

  return (
    <div className="flex flex-col min-h-screen bg-[#FFFFF0] text-gray-800">
      <main className="flex-1 p-4 pb-20">{children}</main>
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200">
        <div className="max-w-md mx-auto flex justify-around items-center h-16 px-2">
          <NavItem
            href="/"
            icon={<Home className="w-5 h-5" />}
            label="Home"
            isActive={router.pathname === "/"}
          />
          <NavItem
            href="/jobs"
            icon={<Briefcase className="w-5 h-5" />}
            label="Jobs"
            isActive={router.pathname === "/jobs"}
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
      className={`flex flex-col items-center justify-center w-12 h-12 ${
        isActive ? "text-white" : "text-gray-400"
      }`}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
    >
      <div
        className={`p-2 rounded-full ${
          isActive ? "bg-[#FF9933] shadow-lg" : "hover:bg-[#FFF5E6]"
        }`}
      >
        {icon}
      </div>
      <motion.span
        className={`text-[10px] font-medium mt-1 ${
          isActive ? "text-[#FF9933]" : "text-gray-400"
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
