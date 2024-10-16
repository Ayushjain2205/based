import React, { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Calendar, Banknote } from "lucide-react";

interface DailyData {
  date: string;
  gigs: number;
  earnings: number;
}

interface ActivityData {
  totalGigs: number;
  totalEarnings: number;
  dailyData: DailyData[];
}

const generateRandomData = (year: number, month: number): DailyData[] => {
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  return Array.from({ length: daysInMonth }, (_, i) => ({
    date: new Date(year, month, i + 1).toISOString().split("T")[0],
    gigs: Math.floor(Math.random() * 4),
    earnings: Math.floor(Math.random() * 2000 + 500),
  }));
};

const ActivitySection: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [activityData, setActivityData] = useState<ActivityData>({
    totalGigs: 0,
    totalEarnings: 0,
    dailyData: [],
  });

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

  const getActivityColor = (gigs: number): string => {
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
        ></Button>
      );
    }

    return days;
  };

  return (
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
          {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
            <div
              key={day}
              className="text-center text-sm font-medium text-[#4CAF50]"
            >
              {day}
            </div>
          ))}
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
                (d) => d.date === selectedDate.toISOString().split("T")[0]
              )?.gigs || 0}
            </p>
            <p className="text-gray-700">
              <Banknote className="inline-block w-5 h-5 mr-2 text-[#FFA500]" />
              Earnings: ₹
              {activityData.dailyData
                .find(
                  (d) => d.date === selectedDate.toISOString().split("T")[0]
                )
                ?.earnings.toLocaleString() || 0}
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ActivitySection;
