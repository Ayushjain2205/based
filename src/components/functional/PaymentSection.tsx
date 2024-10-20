import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  CreditCard,
  ArrowUpRight,
  ArrowDownRight,
  DollarSign,
  Banknote,
} from "lucide-react";

interface Transaction {
  id: string;
  type: "received" | "sent";
  amount: number;
  currency: string;
  counterparty: string;
  gig: string;
  date: string;
}

const transactions: Transaction[] = [
  {
    id: "1",
    type: "received",
    amount: 500,
    currency: "₹",
    counterparty: "ramesh.base.eth",
    gig: "Fix a leaky faucet",
    date: "October 15, 2023",
  },
  {
    id: "2",
    type: "received",
    amount: 200,
    currency: "₹",
    counterparty: "Rahul suresh",
    gig: "Install ceiling fan",
    date: "October 14, 2023",
  },
  {
    id: "3",
    type: "received",
    amount: 1000,
    currency: "₹",
    counterparty: "neha.base.eth",
    gig: "Paint living room",
    date: "October 13, 2023",
  },
  {
    id: "4",
    type: "sent",
    amount: 1500,
    currency: "₹",
    counterparty: "rani.base.eth",
    gig: "Supplies",
    date: "October 8, 2023",
  },
];

const TransactionTile: React.FC<Transaction> = ({
  type,
  amount,
  currency,
  counterparty,
  gig,
  date,
}) => (
  <div className="bg-white rounded-lg shadow-md p-4 flex items-center justify-between hover:shadow-lg transition-shadow duration-200">
    <div className="flex items-center">
      <div
        className={`rounded-full p-2 mr-4 ${
          type === "received" ? "bg-green-100" : "bg-red-100"
        }`}
      >
        {type === "received" ? (
          <ArrowDownRight className="w-6 h-6 text-[#4CAF50]" />
        ) : (
          <ArrowUpRight className="w-6 h-6 text-red-500" />
        )}
      </div>
      <div>
        <span className="font-semibold text-gray-800 text-base">
          {counterparty}
        </span>
        <p className="text-sm text-gray-600">{gig}</p>
        <p className="text-xs text-gray-500">{date}</p>
      </div>
    </div>
    <div className="text-right">
      <span
        className={`font-bold text-lg ${
          type === "received" ? "text-[#4CAF50]" : "text-red-500"
        }`}
      >
        {type === "received" ? "+" : "-"}
        {currency}
        {amount}
      </span>
    </div>
  </div>
);

const PaymentSection: React.FC = () => {
  return (
    <Card className="bg-white border">
      <CardContent className="p-4 space-y-6">
        <Card className="bg-[#FFA500] text-white">
          <CardContent className="p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold">Your Balance</h2>
              <Banknote className="w-8 h-8" />
            </div>
            <p className="text-4xl font-bold mb-2">₹2,150</p>
            <p className="text-sm opacity-80">Available balance</p>
          </CardContent>
        </Card>

        <div>
          <h2 className="text-xl font-bold text-gray-800 mb-4">
            Recent Transactions
          </h2>
          <div className="space-y-4">
            {transactions.map((transaction) => (
              <TransactionTile key={transaction.id} {...transaction} />
            ))}
          </div>
        </div>

        <Button className="w-full bg-[#FFA500] hover:bg-[#FFB733] text-white py-6 text-lg font-semibold rounded-lg shadow-md hover:shadow-lg transition-all duration-200">
          <CreditCard className="w-6 h-6 mr-2" />
          Withdraw
        </Button>
      </CardContent>
    </Card>
  );
};

export default PaymentSection;
