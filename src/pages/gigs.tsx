import React, { useState } from "react";
import Layout from "@/components/Layout";
import { Card, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Coins, Clock, MapPin, Repeat, Zap } from "lucide-react";

interface Gig {
  id: number;
  title: string;
  category: string;
  pay: number;
  roziCoins: number;
  duration: string;
  location: string;
  isRecurring: boolean;
}

const gigs: Gig[] = [
  {
    id: 1,
    title: "Fix a leaky faucet",
    category: "Plumbing",
    pay: 500,
    roziCoins: 50,
    duration: "2 hours",
    location: "Indiranagar",
    isRecurring: false,
  },
  {
    id: 2,
    title: "Install ceiling fan",
    category: "Electrical",
    pay: 800,
    roziCoins: 80,
    duration: "3 hours",
    location: "Koramangala",
    isRecurring: false,
  },
  {
    id: 3,
    title: "Paint living room",
    category: "Painting",
    pay: 2000,
    roziCoins: 200,
    duration: "1 day",
    location: "Whitefield",
    isRecurring: false,
  },
  {
    id: 4,
    title: "Weekly pool maintenance",
    category: "Maintenance",
    pay: 1500,
    roziCoins: 150,
    duration: "3 hours",
    location: "JP Nagar",
    isRecurring: true,
  },
  {
    id: 5,
    title: "Repair door lock",
    category: "Carpentry",
    pay: 400,
    roziCoins: 40,
    duration: "1 hour",
    location: "Jayanagar",
    isRecurring: false,
  },
  {
    id: 6,
    title: "Monthly garden upkeep",
    category: "Gardening",
    pay: 1200,
    roziCoins: 120,
    duration: "4 hours",
    location: "HSR Layout",
    isRecurring: true,
  },
];

const categories = Array.from(new Set(gigs.map((gig) => gig.category)));

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

const GigsPage = () => {
  const [filteredGigs, setFilteredGigs] = useState<Gig[]>(gigs);
  const [categoryFilter, setCategoryFilter] = useState<string>("all");
  const [minPay, setMinPay] = useState<string>("");

  const handleCategoryChange = (value: string) => {
    setCategoryFilter(value);
    filterGigs(value, minPay);
  };

  const handleMinPayChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setMinPay(value);
    filterGigs(categoryFilter, value);
  };

  const filterGigs = (category: string, pay: string) => {
    let filtered = gigs;
    if (category !== "all") {
      filtered = filtered.filter((gig) => gig.category === category);
    }
    if (pay) {
      filtered = filtered.filter((gig) => gig.pay >= parseInt(pay));
    }
    setFilteredGigs(filtered);
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

  return (
    <Layout>
      <div className="container mx-auto p-4">
        <h1 className="text-xl font-semibold mb-4 text-left text-black">
          Available Gigs
        </h1>

        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="w-full sm:w-1/2">
            <Label
              htmlFor="category-filter"
              className="text-[#4CAF50] font-semibold"
            >
              Choose Your Expertise 🛠️
            </Label>
            <Select onValueChange={handleCategoryChange} value={categoryFilter}>
              <SelectTrigger
                id="category-filter"
                className="bg-white border-2 border-[#FFA500] focus:ring-[#FFA500]"
              >
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">🌟 All Categories</SelectItem>
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {getCategoryEmoji(category)} {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="w-full sm:w-1/2">
            <Label htmlFor="min-pay" className="text-[#4CAF50] font-semibold">
              Minimum Pay (₹) 💰
            </Label>
            <Input
              id="min-pay"
              type="number"
              placeholder="Enter minimum pay"
              value={minPay}
              onChange={handleMinPayChange}
              className="bg-white border-2 border-[#FFA500] focus:ring-[#FFA500]"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredGigs.map((gig) => (
            <Card
              key={gig.id}
              className="overflow-hidden hover:shadow-md transition-shadow duration-300"
            >
              <CardContent className="p-3">
                <div className="flex justify-between items-start mb-2">
                  <h2 className="text-lg font-semibold text-[#FFA500] pr-2">
                    {gig.title}
                  </h2>
                  {gig.isRecurring ? (
                    <Repeat
                      className="w-5 h-5 text-[#4CAF50]"
                      title="Recurring Gig"
                    />
                  ) : (
                    <Zap
                      className="w-5 h-5 text-[#FFA500]"
                      title="One-time Gig"
                    />
                  )}
                </div>
                <div className="flex items-center mb-2">
                  <span
                    className={`text-xs font-semibold px-2 py-1 rounded-full ${getCategoryColor(
                      gig.category
                    )}`}
                  >
                    {getCategoryEmoji(gig.category)} {gig.category}
                  </span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="font-bold text-[#4CAF50]">₹{gig.pay}</span>
                  <div className="flex items-center text-[#FFA500]">
                    <Coins className="w-4 h-4 mr-1" />
                    <span>{gig.roziCoins} $ROZI</span>
                  </div>
                </div>
                <div className="flex justify-between items-center text-xs text-gray-600 mt-2">
                  <div className="flex items-center">
                    <Clock className="w-3 h-3 mr-1" />
                    <span>{gig.duration}</span>
                  </div>
                  <div className="flex items-center">
                    <MapPin className="w-3 h-3 mr-1" />
                    <span>{gig.location}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default GigsPage;
