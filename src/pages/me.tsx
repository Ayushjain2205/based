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
} from "lucide-react";
import Image from "next/image";

const profileData = {
  name: "John Doe",
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

export default function MePage() {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [activityData, setActivityData] = useState<{
    totalGigs: number;
    totalEarnings: number;
    dailyData: { date: string; gigs: number; earnings: number }[];
  }>({ totalGigs: 0, totalEarnings: 0, dailyData: [] });

  useEffect(() => {
    const dailyData = generateRandomData(
      currentMonth.getFullYear(),
      currentMonth.getMonth()
    );
    const totalGigs = dailyData.reduce((sum, day) => sum + day.gigs, 0);
    const totalEarnings = dailyData.reduce((sum, day) => sum + day.earnings, 0);
    setActivityData({ totalGigs, totalEarnings, dailyData });
  }, [currentMonth]);

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

  return (
    <Layout>
      <div className="container mx-auto pb-4 px-4">
        <Card className="mb-6 bg-white border-2 border-[#FFA500]">
          <CardContent className="p-4">
            <div className="flex items-center space-x-4">
              <Image
                src="/placeholder.svg?height=64&width=64"
                alt="profile"
                width={64}
                height={64}
                className="rounded-full"
              />
              <div>
                <h2 className="text-xl font-bold text-[#FFA500]">
                  {profileData.name}
                </h2>
                <div className="flex items-center text-sm text-gray-600">
                  <Wrench className="w-4 h-4 mr-1 text-[#FFA500]" />
                  {profileData.role}
                </div>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-4 mt-4">
              <div className="flex flex-col items-center">
                <Star className="w-6 h-6 text-[#FFA500] mb-1" />
                <span className="text-sm font-semibold">
                  {profileData.rating.toFixed(1)}
                </span>
                <span className="text-xs text-gray-600">Rating</span>
              </div>
              <div className="flex flex-col items-center">
                <Gauge className="w-6 h-6 text-[#FFA500] mb-1" />
                <span className="text-sm font-semibold">
                  {profileData.platformScore}
                </span>
                <span className="text-xs text-gray-600">Trust Score</span>
              </div>
              <div className="flex flex-col items-center">
                <Coins className="w-6 h-6 text-[#FFA500] mb-1" />
                <span className="text-sm font-semibold">
                  {profileData.roziCoins}
                </span>
                <span className="text-xs text-gray-600">$ROZI</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Tabs defaultValue="activity" className="mt-6">
          <TabsList className="w-full flex bg-white border-2 border-[#FFA500] p-1">
            <TabsTrigger
              value="activity"
              className="flex-1 data-[state=active]:bg-[#FFA500] data-[state=active]:text-white"
            >
              Activity & Earnings 📊
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
                <div className="flex justify-between mb-4">
                  <p className="text-lg">
                    <span className="font-semibold text-[#4CAF50]">
                      Total Gigs:
                    </span>{" "}
                    {activityData.totalGigs} 🛠️
                  </p>
                  <p className="text-lg">
                    <span className="font-semibold text-[#4CAF50]">
                      Total Earnings:
                    </span>{" "}
                    ₹{activityData.totalEarnings.toLocaleString()} 💰
                  </p>
                </div>
                <div className="mb-6">
                  <h3 className="text-lg font-semibold mb-2 text-gray-800">
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
                      disabled={
                        currentMonth.getMonth() === new Date().getMonth()
                      }
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
                  <div className="grid grid-cols-7 gap-1">
                    {renderCalendar()}
                  </div>
                </div>
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
