import React, { useState, useEffect } from "react";
import Layout from "@/components/Layout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import {
  Star,
  Coins,
  Gauge,
  Banknote,
  Briefcase,
  LucideIcon,
} from "lucide-react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { usePrivy } from "@privy-io/react-auth";
import ImportDataSection from "@/components/functional/ImportDataSection";
import ActivitySection from "@/components/functional/ActivitySection";
import PaymentSection from "@/components/functional/PaymentSection";

interface ProfileData {
  role: string;
  rating: number;
  platformScore: number;
  roziCoins: number;
}

const profileData: ProfileData = {
  role: "Plumber",
  rating: 4.8,
  platformScore: 92,
  roziCoins: 1500,
};

interface MetricCardProps {
  icon: LucideIcon;
  value: string | number;
  label: string;
}

const MetricCard: React.FC<MetricCardProps> = ({
  icon: Icon,
  value,
  label,
}) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -20 }}
    className="flex items-center space-x-2"
  >
    <Icon className="w-6 h-6 text-[#FFA500]" />
    <div>
      <span className="text-lg font-semibold">{value}</span>
      <span className="text-sm text-gray-600 block">{label}</span>
    </div>
  </motion.div>
);

export default function MePage() {
  const [currentMetricIndex, setCurrentMetricIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentMetricIndex((prevIndex) => (prevIndex + 1) % 5);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const metrics: MetricCardProps[] = [
    { icon: Star, value: profileData.rating.toFixed(1), label: "Rating" },
    { icon: Gauge, value: profileData.platformScore, label: "Trust Score" },
    { icon: Coins, value: profileData.roziCoins, label: "$ROZI" },
    { icon: Briefcase, value: "65", label: "Total Gigs" },
    { icon: Banknote, value: "₹32,505", label: "Total Earnings" },
  ];

  const { ready, authenticated, user } = usePrivy();

  // Show nothing if user is not authenticated or data is still loading
  if (!(ready && authenticated) || !user) {
    return null;
  }

  const [name, setName] = useState(user.google?.name || "Anonymous Ninja");

  return (
    <Layout>
      <div className="container mx-auto pb-4">
        <Card className="mb-6 bg-white border-2 border-[#000]">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <Image src="/avatar.svg" alt="profile" width={32} height={32} />
                <div>
                  <h2 className="text-xl font-bold text-[#000] capitalize">
                    {name}
                  </h2>
                </div>
              </div>
              <AnimatePresence mode="wait">
                <MetricCard
                  key={currentMetricIndex}
                  {...metrics[currentMetricIndex]}
                />
              </AnimatePresence>
            </div>
          </CardContent>
        </Card>

        <Tabs defaultValue="activity" className="mt-6">
          <TabsList className="w-full flex bg-white border-2 border-[#FFA500] p-1">
            <TabsTrigger
              value="activity"
              className="flex-1 data-[state=active]:bg-[#FFA500] data-[state=active]:text-white"
            >
              Activity 📊
            </TabsTrigger>
            <TabsTrigger
              value="payments"
              className="flex-1 data-[state=active]:bg-[#FFA500] data-[state=active]:text-white"
            >
              Payments 💰
            </TabsTrigger>
            <TabsTrigger
              value="import"
              className="flex-1 data-[state=active]:bg-[#FFA500] data-[state=active]:text-white"
            >
              Import Data 📥
            </TabsTrigger>
          </TabsList>
          <TabsContent value="activity">
            <ActivitySection />
          </TabsContent>
          <TabsContent value="payments">
            <PaymentSection />
          </TabsContent>
          <TabsContent value="import">
            <ImportDataSection />
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
}
