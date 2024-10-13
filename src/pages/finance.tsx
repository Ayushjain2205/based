import React, { useState } from "react";
import Layout from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
import { Coins, Calendar } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { format } from "date-fns";

interface LendingRequest {
  id: number;
  title: string;
  amount: number;
  fulfilled: number;
  deadline: Date;
}

const lendingRequests: LendingRequest[] = [
  {
    id: 1,
    title: "New sewing machine for tailoring business",
    amount: 15000,
    fulfilled: 10000,
    deadline: new Date("2024-11-15"),
  },
  {
    id: 2,
    title: "Education fees for computer course",
    amount: 25000,
    fulfilled: 5000,
    deadline: new Date("2024-12-01"),
  },
  {
    id: 3,
    title: "Stock for small grocery store",
    amount: 50000,
    fulfilled: 30000,
    deadline: new Date("2024-10-30"),
  },
];

const FinancePage: React.FC = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState<LendingRequest | null>(
    null
  );
  const [lendAmount, setLendAmount] = useState<string>("");
  const [borrowTitle, setBorrowTitle] = useState("");
  const [borrowAmount, setBorrowAmount] = useState("");
  const [borrowDeadline, setBorrowDeadline] = useState<Date | undefined>(
    undefined
  );

  const handleBorrowSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log("Borrow request:", {
      borrowTitle,
      borrowAmount,
      borrowDeadline,
    });
    setIsDialogOpen(false);
    setBorrowTitle("");
    setBorrowAmount("");
    setBorrowDeadline(undefined);
  };

  const handleLendSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedRequest) {
      const lendAmountNumber = parseFloat(lendAmount);
      const maxLendAmount = selectedRequest.amount - selectedRequest.fulfilled;
      if (lendAmountNumber > 0 && lendAmountNumber <= maxLendAmount) {
        console.log(`Lending ${lendAmount} to request ${selectedRequest.id}`);
        // Update the fulfilled amount (this should be done on the server in a real app)
        selectedRequest.fulfilled += lendAmountNumber;
      } else {
        console.log("Invalid lending amount");
      }
    }
    setSelectedRequest(null);
    setLendAmount("");
  };

  const formatDate = (date: Date) => {
    return format(date, "dd MMM yyyy");
  };

  return (
    <Layout>
      <div className="container mx-auto p-4">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold">Active Lending Requests</h2>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-[#FFA500] hover:bg-[#FF8C00] text-white rounded-xl">
                Borrow Money 🙋
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md w-[90%] rounded-xl p-6">
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
                    <PopoverContent className="w-auto p-0" align="start">
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {lendingRequests.map((request) => (
            <Card
              key={request.id}
              className="overflow-hidden hover:shadow-lg transition-shadow duration-300 rounded-xl"
            >
              <CardHeader className="bg-[#FFA500] text-white p-3">
                <CardTitle className="text-lg font-semibold">
                  {request.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4">
                <div className="space-y-3">
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-[#4CAF50] font-semibold flex items-center">
                      <Coins className="w-4 h-4 mr-1" />₹
                      {request.amount.toLocaleString()}
                    </span>
                    <span className="text-[#FFA500] font-semibold flex items-center">
                      <Calendar className="w-4 h-4 mr-1" />
                      {formatDate(request.deadline)}
                    </span>
                  </div>
                  <Progress
                    value={(request.fulfilled / request.amount) * 100}
                    className="w-full"
                  />
                  <div className="text-xs text-gray-600">
                    ₹{request.fulfilled.toLocaleString()} of ₹
                    {request.amount.toLocaleString()} fulfilled
                  </div>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button
                        className="w-full bg-[#4CAF50] hover:bg-[#45a049] text-white rounded-xl"
                        onClick={() => setSelectedRequest(request)}
                      >
                        Lend Money 🤝
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-md w-[90%] rounded-xl p-6">
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
                                selectedRequest.amount -
                                selectedRequest.fulfilled
                              ).toLocaleString()
                            : 0}
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
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default FinancePage;
