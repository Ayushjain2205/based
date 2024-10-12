import React from "react";
import { Star, CheckCircle, Wrench, Coins, Gauge } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface ProfileCardProps {
  name: string;
  baseName: string;
  role: string;
  rating: number;
  platformScore: number;
  roziCoins: number;
}

export default function ProfileCard({
  name,
  baseName,
  role,
  rating,
  platformScore,
  roziCoins,
}: ProfileCardProps) {
  return (
    <Card className="w-full max-w-md border-2 border-black bg-white shadow-lg mx-auto">
      <CardContent className="p-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <Avatar className="w-16 h-16 border-2 border-[#FFA500]">
              <AvatarImage
                src="/placeholder.svg?height=64&width=64"
                alt={name}
              />
              <AvatarFallback>
                {name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <div>
              <h2 className="text-lg font-bold text-black">{name}</h2>
              <div className="flex items-center text-sm text-gray-600">
                <Wrench className="w-4 h-4 mr-1 text-[#FFA500]" />
                {role}
              </div>
              <div className="flex items-center mt-1">
                <span className="text-sm font-semibold text-black mr-2">
                  {baseName}
                </span>
                <span className="text-[#4CAF50] flex items-center text-xs bg-[#4CAF50]/10 px-1 py-0.5 rounded-full">
                  <CheckCircle className="w-3 h-3 mr-1" />
                  Verified
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4 mb-2">
          <div className="flex flex-col items-center">
            <Star className="w-8 h-8 text-[#FFA500] mb-1" />
            <span className="text-sm font-semibold">{rating.toFixed(1)}</span>
            <span className="text-xs text-gray-600">stars</span>
          </div>

          <div className="flex flex-col items-center">
            <Gauge className="w-8 h-8 text-[#FFA500] mb-1" />
            <span className="text-sm font-semibold">{platformScore}</span>
            <span className="text-xs text-gray-600">trust score</span>
          </div>

          <div className="flex flex-col items-center">
            <Coins className="w-8 h-8 text-[#FFA500] mb-1" />
            <span className="text-sm font-semibold">{roziCoins}</span>
            <span className="text-xs text-gray-600">$ROZI</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
