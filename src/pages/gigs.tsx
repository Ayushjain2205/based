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
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Coins,
  Clock,
  MapPin,
  Repeat,
  Zap,
  ChevronDown,
  ChevronUp,
} from "lucide-react";

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
    title: "Install faucet",
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
  const [minPay, setMinPay] = useState<number>(0);
  const [gigType, setGigType] = useState<string>("all");
  const [showFilters, setShowFilters] = useState<boolean>(false);

  const handleCategoryChange = (value: string) => {
    setCategoryFilter(value);
    filterGigs(value, minPay, gigType);
  };

  const handleMinPayChange = (value: number[]) => {
    setMinPay(value[0]);
    filterGigs(categoryFilter, value[0], gigType);
  };

  const handleGigTypeChange = (value: string) => {
    setGigType(value);
    filterGigs(categoryFilter, minPay, value);
  };

  const filterGigs = (category: string, pay: number, type: string) => {
    let filtered = gigs;
    if (category !== "all") {
      filtered = filtered.filter((gig) => gig.category === category);
    }
    filtered = filtered.filter((gig) => gig.pay >= pay);
    if (type !== "all") {
      filtered = filtered.filter(
        (gig) => gig.isRecurring === (type === "recurring")
      );
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
      <div className="container mx-auto ">
        <h1 className="text-xl font-bold mb-4 text-left text-black">
          Available Gigs
        </h1>

        <Button
          onClick={() => setShowFilters(!showFilters)}
          className="mb-4 bg-[#FFA500] hover:bg-[#FF8C00] text-white rounded-xl w-full"
        >
          {showFilters ? "Hide Filters 🙈" : "Show Filters 🔍"}
          {showFilters ? (
            <ChevronUp className="ml-2 h-4 w-4" />
          ) : (
            <ChevronDown className="ml-2 h-4 w-4" />
          )}
        </Button>

        {showFilters && (
          <Card className="mb-6 overflow-hidden rounded-xl">
            <CardContent className="p-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label
                    htmlFor="category-filter"
                    className="text-[#4CAF50] font-semibold mb-2 block"
                  >
                    Expertise 🛠️
                  </Label>
                  <Select
                    onValueChange={handleCategoryChange}
                    value={categoryFilter}
                  >
                    <SelectTrigger
                      id="category-filter"
                      className="w-full bg-white border-2 border-[#FFA500] focus:ring-[#FFA500] rounded-xl"
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
                <div>
                  <Label
                    htmlFor="min-pay"
                    className="text-[#4CAF50] font-semibold mb-2 block"
                  >
                    Minimum Pay 💰
                  </Label>
                  <Slider
                    id="min-pay"
                    min={0}
                    max={2000}
                    step={100}
                    value={[minPay]}
                    onValueChange={handleMinPayChange}
                    className="mt-2"
                  />
                  <div className="text-center mt-1">₹{minPay}</div>
                </div>
                <div>
                  <Label
                    htmlFor="gig-type"
                    className="text-[#4CAF50] font-semibold mb-2 block"
                  >
                    Gig Type 🔄
                  </Label>
                  <Select onValueChange={handleGigTypeChange} value={gigType}>
                    <SelectTrigger
                      id="gig-type"
                      className="w-full bg-white border-2 border-[#FFA500] focus:ring-[#FFA500] rounded-xl"
                    >
                      <SelectValue placeholder="Select gig type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Types</SelectItem>
                      <SelectItem value="one-time">One-time ⚡</SelectItem>
                      <SelectItem value="recurring">Recurring 🔄</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredGigs.map((gig) => (
            <Card
              key={gig.id}
              className="overflow-hidden hover:shadow-md transition-shadow duration-300 rounded-xl"
            >
              <CardContent className="p-3">
                <div className="flex justify-between items-start mb-2">
                  <h2 className="text-lg font-semibold text-[#000] pr-2">
                    {gig.title}
                  </h2>
                  {gig.isRecurring ? (
                    <Repeat className="w-5 h-5 text-[#4CAF50]" />
                  ) : (
                    <Zap className="w-5 h-5 text-[#FFA500]" />
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
