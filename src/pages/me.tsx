"use client";

import React, { useState, useEffect } from "react";
import Layout from "@/components/Layout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  ChevronLeft,
  ChevronRight,
  Star,
  Coins,
  Gauge,
  Wrench,
  Calendar,
  DollarSign,
  Upload,
  Briefcase,
} from "lucide-react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

const profileData = {
  name: "Rahul Singh",
  role: "Plumber",
  rating: 4.8,
  platformScore: 92,
  roziCoins: 1500,
};

const generateRandomData = (year: number, month: number) => {
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  return Array.from({ length: daysInMonth }, (_, i) => ({
    date: new Date(year, month, i + 1).toISOString().split("T")[0],
    gigs: Math.floor(Math.random() * 4),
    earnings: Math.floor(Math.random() * 2000 + 500),
  }));
};

const MetricCard = ({ icon: Icon, value, label }) => (
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
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [activityData, setActivityData] = useState<{
    totalGigs: number;
    totalEarnings: number;
    dailyData: { date: string; gigs: number; earnings: number }[];
  }>({ totalGigs: 0, totalEarnings: 0, dailyData: [] });
  const [currentMetricIndex, setCurrentMetricIndex] = useState(0);

  useEffect(() => {
    const dailyData = generateRandomData(
      currentMonth.getFullYear(),
      currentMonth.getMonth()
    );
    const totalGigs = dailyData.reduce((sum, day) => sum + day.gigs, 0);
    const totalEarnings = dailyData.reduce((sum, day) => sum + day.earnings, 0);
    setActivityData({ totalGigs, totalEarnings, dailyData });
  }, [currentMonth]);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentMetricIndex((prevIndex) => (prevIndex + 1) % 5);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const prevMonth = () => {
    setCurrentMonth(
      new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1)
    );
    setSelectedDate(null);
  };

  const nextMonth = () => {
    const today = new Date();
    if (currentMonth < today) {
      setCurrentMonth(
        new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1)
      );
      setSelectedDate(null);
    }
  };

  const getActivityColor = (gigs: number) => {
    if (gigs >= 3) return "bg-[#FFA500]";
    if (gigs === 2) return "bg-[#FFB733]";
    if (gigs === 1) return "bg-[#FFC966]";
    return "bg-[#FFE0B2]";
  };

  const renderCalendar = () => {
    const firstDayOfMonth = new Date(
      currentMonth.getFullYear(),
      currentMonth.getMonth(),
      1
    ).getDay();
    const daysInMonth = new Date(
      currentMonth.getFullYear(),
      currentMonth.getMonth() + 1,
      0
    ).getDate();
    const days = [];

    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(<div key={`empty-${i}`} className="h-10" />);
    }

    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(
        currentMonth.getFullYear(),
        currentMonth.getMonth(),
        day
      );
      const dayData = activityData.dailyData.find(
        (d) => d.date === date.toISOString().split("T")[0]
      );
      const isSelected =
        selectedDate && date.toDateString() === selectedDate.toDateString();

      days.push(
        <Button
          key={day}
          className={`h-10 w-full ${
            isSelected
              ? "bg-[#4CAF50] hover:bg-[#4CAF50] text-white"
              : getActivityColor(dayData?.gigs || 0)
          } hover:opacity-90 rounded-md`}
          onClick={() => setSelectedDate(date)}
        />
      );
    }

    return days;
  };

  const metrics = [
    { icon: Star, value: profileData.rating.toFixed(1), label: "Rating" },
    { icon: Gauge, value: profileData.platformScore, label: "Trust Score" },
    { icon: Coins, value: profileData.roziCoins, label: "$ROZI" },
    { icon: Briefcase, value: activityData.totalGigs, label: "Total Gigs" },
    {
      icon: DollarSign,
      value: `₹${activityData.totalEarnings.toLocaleString()}`,
      label: "Total Earnings",
    },
  ];

  return (
    <Layout>
      <div className="container mx-auto pb-4">
        <Card className="mb-6 bg-white border-2 border-[#000]">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <Image src="/avatar.svg" alt="profile" width={32} height={32} />
                <div>
                  <h2 className="text-xl font-bold text-[#000]">
                    {profileData.name}
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
              value="import"
              className="flex-1 data-[state=active]:bg-[#FFA500] data-[state=active]:text-white"
            >
              Import Data 📥
            </TabsTrigger>
          </TabsList>
          <TabsContent value="activity">
            <Card className="bg-white">
              <CardContent className="p-4">
                <h3 className="text-lg font-semibold mb-4 text-gray-800">
                  Daily Activity
                </h3>
                <div className="flex justify-between items-center mb-4">
                  <Button
                    onClick={prevMonth}
                    variant="outline"
                    size="icon"
                    className="border-[#FFA500] text-[#FFA500] hover:bg-[#FFA500] hover:text-white"
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <h4 className="text-md font-semibold text-gray-800">
                    {currentMonth.toLocaleString("default", {
                      month: "long",
                      year: "numeric",
                    })}
                  </h4>
                  <Button
                    onClick={nextMonth}
                    variant="outline"
                    size="icon"
                    className="border-[#FFA500] text-[#FFA500] hover:bg-[#FFA500] hover:text-white"
                    disabled={currentMonth.getMonth() === new Date().getMonth()}
                  >
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
                <div className="grid grid-cols-7 gap-1 mb-2">
                  {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(
                    (day) => (
                      <div
                        key={day}
                        className="text-center text-sm font-medium text-[#4CAF50]"
                      >
                        {day}
                      </div>
                    )
                  )}
                </div>
                <div className="grid grid-cols-7 gap-1">{renderCalendar()}</div>
                {selectedDate && (
                  <div className="mt-4 p-4 bg-gray-100 rounded-lg shadow">
                    <h3 className="text-lg font-semibold mb-2 text-gray-800">
                      Activity for{" "}
                      {selectedDate.toLocaleDateString("en-US", {
                        month: "long",
                        day: "numeric",
                      })}
                    </h3>
                    <p className="text-gray-700 mb-2">
                      <Calendar className="inline-block w-5 h-5 mr-2 text-[#FFA500]" />
                      Gigs completed:{" "}
                      {activityData.dailyData.find(
                        (d) =>
                          d.date === selectedDate.toISOString().split("T")[0]
                      )?.gigs || 0}
                    </p>
                    <p className="text-gray-700">
                      <DollarSign className="inline-block w-5 h-5 mr-2 text-[#FFA500]" />
                      Earnings: ₹
                      {activityData.dailyData
                        .find(
                          (d) =>
                            d.date === selectedDate.toISOString().split("T")[0]
                        )
                        ?.earnings.toLocaleString() || 0}
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="import">
            <Card className="bg-white border-2 border-[#FFA500]">
              <CardContent className="p-4">
                <h2 className="text-xl font-bold mb-4 text-gray-800">
                  Import Data
                </h2>
                <p className="mb-4 text-gray-700">
                  Use this section to import your activity data from other
                  platforms.
                </p>
                <Button className="w-full bg-[#FFA500] hover:bg-[#FFB733] text-white">
                  <Upload className="w-4 h-4 mr-2" />
                  Import Data
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
}
