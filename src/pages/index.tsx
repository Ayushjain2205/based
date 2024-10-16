"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { usePrivy } from "@privy-io/react-auth";

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
  //onSplashComplete: () => void
}

const SplashScreen: React.FC<SplashScreenProps> = ({}) => {
  const [currentLanguage, setCurrentLanguage] = useState(0);
  const [currentIllustration, setCurrentIllustration] = useState(1);
  const [showLoginButton, setShowLoginButton] = useState(false);
  const { ready, authenticated, login } = usePrivy();
  const router = useRouter();

  useEffect(() => {
    const languageInterval = setInterval(() => {
      setCurrentLanguage((prev) => (prev + 1) % languages.length);
    }, 3000);

    const illustrationInterval = setInterval(() => {
      setCurrentIllustration((prev) => (prev % 8) + 1);
    }, 2000);

    const loginButtonTimer = setTimeout(() => {
      setShowLoginButton(true);
    }, 5000);

    return () => {
      clearInterval(languageInterval);
      clearInterval(illustrationInterval);
      clearTimeout(loginButtonTimer);
    };
  }, []);

  useEffect(() => {
    if (ready && authenticated) {
      router.push("/home");
    }
  }, [ready, authenticated, router]);

  const disableLogin = !ready || (ready && authenticated);

  return (
    <div className="h-screen w-full bg-[#FFFFF0] flex flex-col items-center justify-between">
      <div className="flex-1" />
      <div className="flex flex-col items-center justify-center space-y-4">
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
        <AnimatePresence>
          {showLoginButton && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              <Button
                className="mt-16 bg-[#FFA500] hover:bg-[#FF9000] text-white font-semibold py-2 px-6 rounded-md transition duration-300 ease-in-out transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                onClick={login}
                disabled={disableLogin}
              >
                {ready ? (authenticated ? "Logged In" : "Login") : "Loading..."}
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
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

const DesktopView: React.FC = () => (
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

export default function Home() {
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

  return (
    <div className="min-h-screen bg-[#FFFFF0]">
      {isMobile ? <SplashScreen /> : <DesktopView />}
    </div>
  );
}
