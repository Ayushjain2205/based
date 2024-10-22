import React, { useState } from "react";
import { Star, CheckCircle, Wrench, Coins, Gauge } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import { usePrivy } from "@privy-io/react-auth";

interface ProfileCardProps {
  roles: string[];
  rating: number;
  platformScore: number;
  roziCoins: number;
}

const getCategoryEmoji = (category: string) => {
  const emojis: { [key: string]: string } = {
    Plumbing: "🚽",
    Electrical: "⚡",
    Painting: "🎨",
    Carpentry: "🔨",
    Maintenance: "🔧",
    Gardening: "🌱",
  };
  return emojis[category] || "🛠️";
};

const getCategoryColor = (category: string) => {
  const colors: { [key: string]: string } = {
    Plumbing: "bg-blue-100 text-blue-800",
    Electrical: "bg-yellow-100 text-yellow-800",
    Painting: "bg-green-100 text-green-800",
    Carpentry: "bg-red-100 text-red-800",
    Maintenance: "bg-purple-100 text-purple-800",
    Gardening: "bg-emerald-100 text-emerald-800",
  };
  return colors[category] || "bg-gray-100 text-gray-800";
};

// Utility function to shorten ethereum address
const shortenAddress = (address: string) => {
  if (!address) return "";
  return `${address.substring(0, 6)}...${address.substring(
    address.length - 5
  )}`;
};

export default function ProfileCard({
  roles,
  rating,
  platformScore,
  roziCoins,
}: ProfileCardProps) {
  const { ready, authenticated, user } = usePrivy();

  // Show nothing if user is not authenticated or data is still loading
  if (!(ready && authenticated) || !user) {
    return null;
  }

  const [name, setName] = useState(user.google?.name || "Anonymous Ninja");
  const [address, setAddress] = useState(user.wallet?.address);

  return (
    <Card className="w-full max-w-md border-2 border-black bg-white shadow-lg mx-auto">
      <CardContent className="p-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <Image src="/avatar.svg" alt="profile" width={64} height={64} />
            <div>
              <h2 className="text-lg font-bold text-black capitalize">
                {name}
              </h2>
              <div className="flex flex-wrap gap-1 mt-1">
                {roles.map((role, index) => (
                  <span
                    key={index}
                    className={`text-xs font-semibold px-2 py-1 rounded-full ${getCategoryColor(
                      role
                    )}`}
                  >
                    {getCategoryEmoji(role)} {role}
                  </span>
                ))}
              </div>
              <div className="flex items-center mt-2">
                <span className="text-sm font-semibold text-black mr-2">
                  {address && shortenAddress(address)}
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
