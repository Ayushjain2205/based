"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const languages: { code: string; text: string }[] = [
  { code: "en", text: "Rozi" },
  { code: "hi", text: "रोज़ी" },
  { code: "bn", text: "রোজি" },
  { code: "ta", text: "ரோசி" },
  { code: "te", text: "రోజీ" },
  { code: "mr", text: "रोझी" },
  { code: "gu", text: "રોઝી" },
  { code: "kn", text: "ರೋಜಿ" },
];

interface SplashScreenProps {
  onSplashComplete: () => void;
}

const SplashScreen: React.FC<SplashScreenProps> = ({ onSplashComplete }) => {
  const [currentLanguage, setCurrentLanguage] = useState(0);
  const [currentIllustration, setCurrentIllustration] = useState(1);

  useEffect(() => {
    const languageInterval = setInterval(() => {
      setCurrentLanguage((prev) => (prev + 1) % languages.length);
    }, 3000);

    const illustrationInterval = setInterval(() => {
      setCurrentIllustration((prev) => (prev % 8) + 1);
    }, 2000);

    const splashTimer = setTimeout(onSplashComplete, 5000);

    return () => {
      clearInterval(languageInterval);
      clearInterval(illustrationInterval);
      clearTimeout(splashTimer);
    };
  }, [onSplashComplete]);

  return (
    <div className="h-screen w-full bg-[#FFFFF0] flex flex-col items-center justify-between">
      <div className="flex-1" />
      <div className="flex items-center justify-center space-x-4">
        <div className="w-24 h-24">
          <Image src="/logo.svg" alt="Rozi Logo" width={96} height={96} />
        </div>
        <div className="h-24 flex items-center overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentLanguage}
              initial={{ opacity: 0, y: -40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 40 }}
              transition={{ duration: 0.5 }}
              className="text-5xl font-bold text-[#FFA500]"
            >
              {languages[currentLanguage].text}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
      <div className="flex-1" />
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIllustration}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1.2 }}
          transition={{ duration: 2.5 }}
          className="w-64 h-64 relative"
        >
          <Image
            src={`/illustrations/${currentIllustration}.svg`}
            alt={`Illustration ${currentIllustration}`}
            layout="fill"
            objectFit="cover"
          />
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

const LoginBox: React.FC = () => {
  return (
    <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center text-[#FFA500]">
        Login to Rozi
      </h2>
      <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
        <div className="space-y-2">
          <Label
            htmlFor="username"
            className="text-sm font-medium text-gray-700"
          >
            Username or Phone Number
          </Label>
          <Input
            type="text"
            id="username"
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#FFA500]"
            placeholder="Enter your username or phone number"
          />
        </div>
        <div className="space-y-2">
          <Label
            htmlFor="password"
            className="text-sm font-medium text-gray-700"
          >
            Password
          </Label>
          <Input
            type="password"
            id="password"
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#FFA500]"
            placeholder="Enter your password"
          />
        </div>
        <Button
          type="submit"
          className="w-full bg-[#FFA500] hover:bg-[#FF9000] text-white font-semibold py-2 rounded-md transition duration-300 ease-in-out transform hover:scale-105"
        >
          Log In
        </Button>
      </form>
      <div className="mt-4 text-center">
        <a href="#" className="text-sm text-[#4CAF50] hover:underline">
          Forgot password?
        </a>
      </div>
      <div className="mt-6 text-center">
        <p className="text-sm text-gray-600">Don't have an account?</p>
        <a
          href="#"
          className="text-sm text-[#4CAF50] hover:underline font-semibold"
        >
          Sign up for Rozi
        </a>
      </div>
    </div>
  );
};

export default function Component() {
  const [showSplash, setShowSplash] = useState(true);

  const handleSplashComplete = () => {
    setShowSplash(false);
  };

  return (
    <div className="min-h-screen bg-[#FFFFF0]">
      <AnimatePresence>
        {showSplash ? (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <SplashScreen onSplashComplete={handleSplashComplete} />
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="flex items-center justify-center min-h-screen p-4"
          >
            <LoginBox />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
