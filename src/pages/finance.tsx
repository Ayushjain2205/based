"use client";

import React, { useState, useEffect } from "react";
import Layout from "@/components/Layout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Coins, Calendar, User, Shield } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { format } from "date-fns";
import { useToast } from "@/hooks/use-toast";

interface LendingRequest {
  id: number;
  title: string;
  amount: number;
  fulfilled: number;
  deadline: Date;
  requester: string;
  trustScore: number;
}

const lendingRequests: LendingRequest[] = [
  {
    id: 1,
    title: "New sewing machine for tailoring business",
    amount: 15000,
    fulfilled: 10000,
    deadline: new Date("2024-11-15"),
    requester: "Priya Sharma",
    trustScore: 85,
  },
  {
    id: 2,
    title: "Education fees for computer course",
    amount: 25000,
    fulfilled: 5000,
    deadline: new Date("2024-12-01"),
    requester: "Rahul Patel",
    trustScore: 92,
  },
  {
    id: 3,
    title: "Stock for small grocery store",
    amount: 50000,
    fulfilled: 30000,
    deadline: new Date("2024-10-30"),
    requester: "Anita Desai",
    trustScore: 78,
  },
];

const ROZI_COIN_RATE = 0.1; // 1 $ROZI coin per 10 INR lent

export default function FinancePage() {
  const [borrowDialogOpen, setBorrowDialogOpen] = useState(false);
  const [lendDialogOpen, setLendDialogOpen] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState<LendingRequest | null>(
    null
  );
  const [lendAmount, setLendAmount] = useState<string>("");
  const [roziCoins, setRoziCoins] = useState<number>(0);
  const [borrowTitle, setBorrowTitle] = useState("");
  const [borrowAmount, setBorrowAmount] = useState("");
  const [borrowDeadline, setBorrowDeadline] = useState<Date | undefined>(
    undefined
  );
  const { toast } = useToast();

  useEffect(() => {
    if (lendAmount) {
      const amount = parseFloat(lendAmount);
      setRoziCoins(Math.floor(amount * ROZI_COIN_RATE));
    } else {
      setRoziCoins(0);
    }
  }, [lendAmount]);

  const handleBorrowSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Borrow request:", {
      borrowTitle,
      borrowAmount,
      borrowDeadline,
    });
    setBorrowDialogOpen(false);
    setBorrowTitle("");
    setBorrowAmount("");
    setBorrowDeadline(undefined);
    toast({
      title: "Request Created",
      description: "Your borrowing request has been successfully created.",
      duration: 3000,
      className: "bg-[#4CAF50] text-white rounded-xl",
    });
  };

  const handleLendSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedRequest) {
      const lendAmountNumber = parseFloat(lendAmount);
      const maxLendAmount = selectedRequest.amount - selectedRequest.fulfilled;
      if (lendAmountNumber > 0 && lendAmountNumber <= maxLendAmount) {
        console.log(`Lending ${lendAmount} to request ${selectedRequest.id}`);
        console.log(`User receives ${roziCoins} $ROZI coins`);
        selectedRequest.fulfilled += lendAmountNumber;
        setLendDialogOpen(false);
        toast({
          title: "Lending Successful",
          description: `You have successfully lent ₹${lendAmountNumber.toLocaleString()} and received ${roziCoins} $ROZI coins.`,
          duration: 3000,
          className: "bg-[#FFA500] text-white rounded-xl",
        });
      } else {
        toast({
          title: "Lending Failed",
          description: "Invalid lending amount. Please try again.",
          duration: 3000,
          className: "bg-red-500 text-white rounded-xl",
        });
      }
    }
    setSelectedRequest(null);
    setLendAmount("");
    setLendDialogOpen(false);
  };

  const formatDate = (date: Date) => {
    return format(date, "dd MMM yyyy");
  };

  return (
    <Layout>
      <div className="container mx-auto pb-4">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-xl font-bold">Active Lending Requests</h1>
          <Dialog open={borrowDialogOpen} onOpenChange={setBorrowDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-[#FFA500] hover:bg-[#FF8C00] text-white rounded-xl">
                Borrow Money 🙋
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md w-[90%] rounded-xl p-6 bg-white">
              <DialogHeader>
                <DialogTitle className="text-[#FFA500] text-2xl mb-4">
                  Create a Borrowing Request
                </DialogTitle>
              </DialogHeader>
              <form onSubmit={handleBorrowSubmit} className="space-y-4">
                <div>
                  <Label
                    htmlFor="title"
                    className="text-[#4CAF50] font-semibold"
                  >
                    Request Title
                  </Label>
                  <Input
                    id="title"
                    value={borrowTitle}
                    onChange={(e) => setBorrowTitle(e.target.value)}
                    placeholder="Enter a title for your request"
                    className="rounded-xl mt-1"
                  />
                </div>
                <div>
                  <Label
                    htmlFor="amount"
                    className="text-[#4CAF50] font-semibold"
                  >
                    Amount Needed (₹)
                  </Label>
                  <Input
                    id="amount"
                    type="number"
                    value={borrowAmount}
                    onChange={(e) => setBorrowAmount(e.target.value)}
                    placeholder="Enter amount"
                    className="rounded-xl mt-1"
                  />
                </div>
                <div>
                  <Label
                    htmlFor="deadline"
                    className="text-[#4CAF50] font-semibold"
                  >
                    Deadline
                  </Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={`w-full justify-start text-left font-normal rounded-xl ${
                          !borrowDeadline && "text-muted-foreground"
                        }`}
                      >
                        <Calendar className="mr-2 h-4 w-4" />
                        {borrowDeadline ? (
                          formatDate(borrowDeadline)
                        ) : (
                          <span>Pick a date</span>
                        )}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent
                      className="w-auto p-0 rounded-xl"
                      align="start"
                    >
                      <CalendarComponent
                        mode="single"
                        selected={borrowDeadline}
                        onSelect={setBorrowDeadline}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>
                <Button
                  type="submit"
                  className="w-full bg-[#FFA500] hover:bg-[#FF8C00] text-white rounded-xl mt-4"
                >
                  Submit Request 📨
                </Button>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        <div className="space-y-4">
          {lendingRequests.map((request) => (
            <Card
              key={request.id}
              className="overflow-hidden hover:shadow-lg transition-shadow duration-300 rounded-xl"
            >
              <CardContent className="p-4">
                <h3 className="font-semibold text-sm mb-2">{request.title}</h3>
                <div className="flex items-center justify-between mb-2 text-xs text-gray-500">
                  <div className="flex items-center">
                    <User className="w-3 h-3 mr-1 text-[#4CAF50]" />
                    <span>{request.requester}</span>
                  </div>
                  <div className="flex items-center">
                    <Shield className="w-3 h-3 mr-1 text-[#4CAF50]" />
                    <span>Trust Score: {request.trustScore}</span>
                  </div>
                  <div className="flex items-center">
                    <Calendar className="w-3 h-3 mr-1" />
                    <span>{formatDate(request.deadline)}</span>
                  </div>
                </div>
                <div className="flex items-center justify-between mb-2 text-sm">
                  <span className="text-[#4CAF50] font-semibold flex items-center">
                    <Coins className="w-4 h-4 mr-1" />₹
                    {request.amount.toLocaleString()}
                  </span>
                  <span className="font-semibold">
                    {Math.round((request.fulfilled / request.amount) * 100)}%
                    funded
                  </span>
                </div>
                <div className="space-y-2 mb-3">
                  <Progress
                    value={(request.fulfilled / request.amount) * 100}
                    className="w-full"
                  />
                  <div className="text-xs text-gray-600">
                    ₹{request.fulfilled.toLocaleString()} of ₹
                    {request.amount.toLocaleString()} fulfilled
                  </div>
                </div>
                <Dialog open={lendDialogOpen} onOpenChange={setLendDialogOpen}>
                  <DialogTrigger asChild>
                    <Button
                      className="w-full bg-[#4CAF50] hover:bg-[#45a049] text-white rounded-xl"
                      onClick={() => {
                        setSelectedRequest(request);
                        setLendDialogOpen(true);
                      }}
                    >
                      Lend Money 🤝
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-md w-[90%] rounded-xl p-6 bg-white">
                    <DialogHeader>
                      <DialogTitle className="text-[#4CAF50] text-2xl mb-4">
                        Lend Money
                      </DialogTitle>
                    </DialogHeader>
                    <form onSubmit={handleLendSubmit} className="space-y-4">
                      <div>
                        <Label
                          htmlFor="lendAmount"
                          className="text-[#FFA500] font-semibold"
                        >
                          Amount to Lend (₹)
                        </Label>
                        <Input
                          id="lendAmount"
                          type="number"
                          placeholder="Enter amount"
                          className="rounded-xl mt-1"
                          value={lendAmount}
                          onChange={(e) => setLendAmount(e.target.value)}
                          max={
                            selectedRequest
                              ? selectedRequest.amount -
                                selectedRequest.fulfilled
                              : 0
                          }
                        />
                      </div>
                      <div className="text-sm text-gray-600">
                        Maximum amount: ₹
                        {selectedRequest
                          ? (
                              selectedRequest.amount - selectedRequest.fulfilled
                            ).toLocaleString()
                          : 0}
                      </div>
                      <div className="text-sm font-semibold text-[#4CAF50]">
                        You will receive: {roziCoins} $ROZI coins
                      </div>
                      <Button
                        type="submit"
                        className="w-full bg-[#4CAF50] hover:bg-[#45a049] text-white rounded-xl mt-4"
                        disabled={
                          !selectedRequest ||
                          parseFloat(lendAmount) <= 0 ||
                          parseFloat(lendAmount) >
                            selectedRequest.amount - selectedRequest.fulfilled
                        }
                      >
                        Confirm Lending 💖
                      </Button>
                    </form>
                  </DialogContent>
                </Dialog>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </Layout>
  );
}
