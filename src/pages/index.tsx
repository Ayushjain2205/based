"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

const languages = [
  { code: "en", text: "Rozi" },
  { code: "hi", text: "रोज़ी" },
  { code: "bn", text: "রোজি" },
  { code: "ta", text: "ரோசி" },
  { code: "te", text: "రోజీ" },
  { code: "mr", text: "रोझी" },
  { code: "gu", text: "રોઝી" },
  { code: "kn", text: "ರೋಜಿ" },
];

export default function SplashScreen() {
  const [currentLanguage, setCurrentLanguage] = useState(0);
  const [currentIllustration, setCurrentIllustration] = useState(1);

  useEffect(() => {
    const languageInterval = setInterval(() => {
      setCurrentLanguage((prev) => (prev + 1) % languages.length);
    }, 3000);

    const illustrationInterval = setInterval(() => {
      setCurrentIllustration((prev) => (prev % 8) + 1);
    }, 2000);

    return () => {
      clearInterval(languageInterval);
      clearInterval(illustrationInterval);
    };
  }, []);

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
              className="text-5xl font-bold text-[#FF9933]"
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
          className="w-64 h-64"
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
}
