"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import { Button } from "../components/ui/button";
import { motion } from "framer-motion";

const NotFoundPage: React.FC = () => {
  const router = useRouter();
  const [countdown, setCountdown] = useState(5);

  useEffect(() => {
    const redirectTimer = setInterval(() => {
      setCountdown((prev) => {
        if (prev === 1) {
          clearInterval(redirectTimer);
          router.push("/home");
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(redirectTimer);
  }, [router]);

  return (
    <div className="min-h-screen bg-[#FFFFF0] flex flex-col items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center"
      >
        <Image
          src="/logo.svg"
          alt="Rozi Logo"
          width={120}
          height={120}
          className="mx-auto mb-8"
        />
        <h1 className="text-4xl font-bold text-[#FFA500] mb-4">
          404 - Page Not Found
        </h1>
        <p className="text-xl text-gray-600 mb-4">
          The page you are looking for does not exist or has been moved.
        </p>
        <p className="text-lg text-[#4CAF50] mb-8">
          You will be redirected to the home page in {countdown} seconds.
        </p>
        <Button
          onClick={() => router.push("/home")}
          className="bg-[#FFA500] hover:bg-[#FFB733] text-white font-semibold py-2 px-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-200"
        >
          Go to Home Page
        </Button>
      </motion.div>
    </div>
  );
};

export default NotFoundPage;
