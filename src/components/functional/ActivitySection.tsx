import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Calendar, Banknote } from "lucide-react";

interface ActivitySectionProps {
  selectedDate: Date | null;
  setSelectedDate: React.Dispatch<React.SetStateAction<Date | null>>;
  currentMonth: number;
  setCurrentMonth: React.Dispatch<React.SetStateAction<Date>>;
  activityData: {
    totalGigs: number;
    totalEarnings: number;
    dailyData: { date: string; gigs: number; earnings: number }[];
  };
  prevMonth: () => void;
  nextMonth: () => void;
  renderCalendar: () => JSX.Element[];
}

const ActivitySection: React.FC<ActivitySectionProps> = ({
  selectedDate,
  setSelectedDate,
  currentMonth,
  setCurrentMonth,
  activityData,
  prevMonth,
  nextMonth,
  renderCalendar,
}) => {
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
            {new Date(new Date().getFullYear(), currentMonth).toLocaleString(
              "default",
              {
                month: "long",
                year: "numeric",
              }
            )}
          </h4>
          <Button
            onClick={nextMonth}
            variant="outline"
            size="icon"
            className="border-[#FFA500] text-[#FFA500] hover:bg-[#FFA500] hover:text-white"
            disabled={currentMonth === new Date().getMonth()}
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