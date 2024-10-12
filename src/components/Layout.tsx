import React, { ReactNode, useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { Home, Briefcase, User, PiggyBank, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";

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

  const isActive = (path: string) => router.pathname === path;

  if (!isMobile) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-[#FFFFF0] to-white font-sans text-gray-800 p-4">
        <div className="flex flex-col items-center justify-center max-w-md text-center">
          <h1 className="text-3xl font-bold text-[#FF9933] mb-4">Rozi</h1>
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
    <div className="flex flex-col min-h-screen bg-[#FFFFF0] font-sans text-gray-800">
      <main className="flex-1 p-4 pb-24">{children}</main>
      <nav className="fixed bottom-0 left-0 right-0 bg-white shadow-lg border-t border-gray-200">
        <div className="flex justify-around items-center h-20">
          <NavItem
            href="/"
            icon={<Home className="w-6 h-6" />}
            label="Home"
            isActive={isActive("/")}
          />
          <NavItem
            href="/jobs"
            icon={<Briefcase className="w-6 h-6" />}
            label="Jobs"
            isActive={isActive("/jobs")}
          />
          <Link href="/me" className="relative -mt-6">
            <Button
              className={`rounded-full w-16 h-16 flex flex-col items-center justify-center transition-colors ${
                isActive("/me")
                  ? "bg-[#FF9933] text-white"
                  : "bg-[#138808] text-white hover:bg-[#FF9933]"
              }`}
            >
              <User className="w-8 h-8" />
            </Button>
          </Link>
          <NavItem
            href="/finance"
            icon={<PiggyBank className="w-6 h-6" />}
            label="Finance"
            isActive={isActive("/finance")}
          />
          <NavItem
            href="/community"
            icon={<Users className="w-6 h-6" />}
            label="Community"
            isActive={isActive("/community")}
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
    className={`flex flex-col items-center ${
      isActive ? "text-[#FF9933]" : "text-gray-400"
    } hover:text-[#FF9933] transition-colors`}
  >
    {icon}
    <span className="text-xs mt-1">{label}</span>
  </Link>
);

export default Layout;
