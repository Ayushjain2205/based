import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";

interface Milestone {
  icon: string;
  title: string;
  value: string;
}

interface BenefitCardProps {
  title: string;
  emoji: string;
  milestones: Milestone[];
  isActive: boolean;
  onClick: () => void;
}

const BenefitCard: React.FC<BenefitCardProps> = ({
  title,
  emoji,
  isActive,
  onClick,
}) => {
  return (
    <Card
      className={`w-full cursor-pointer transition-all duration-300 ${
        isActive ? "border-[#FFA500] border-2" : "border border-gray-200"
      }`}
      onClick={onClick}
    >
      <CardContent className="p-4 flex flex-col items-center justify-center h-32">
        <span className="text-4xl mb-2">{emoji}</span>
        <h3
          className={`text-lg font-semibold text-center ${
            isActive ? "text-[#FFA500]" : "text-black"
          }`}
        >
          {title}
        </h3>
      </CardContent>
    </Card>
  );
};

const UnlockedBenefits: React.FC = () => {
  const [expandedBenefit, setExpandedBenefit] = useState<string | null>(null);

  const benefits = [
    {
      title: "Insurance",
      emoji: "🛡️",
      milestones: [
        { icon: "🏥", title: "Health Coverage", value: "Basic" },
        { icon: "🚑", title: "Accident Insurance", value: "✓" },
        { icon: "👨‍👩‍👧‍👦", title: "Family Coverage", value: "50 gigs away" },
      ],
    },
    {
      title: "Loans",
      emoji: "💰",
      milestones: [
        { icon: "🚨", title: "Emergency Loan", value: "Up to ₹5,000" },
        { icon: "💼", title: "Business Loan", value: "40 gigs away" },
        { icon: "🏠", title: "Housing Loan", value: "100 gigs away" },
      ],
    },
    {
      title: "Subsidies",
      emoji: "🏷️",
      milestones: [
        { icon: "🔧", title: "Tool Discount", value: "10% off" },
        { icon: "📚", title: "Skill Upgrade", value: "35 gigs away" },
        { icon: "🎫", title: "License Renewal", value: "60 gigs away" },
      ],
    },
  ];

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-bold text-left mt-6 mb-2">
        Unlocked Benefits
      </h2>
      <div className="grid grid-cols-3 gap-4">
        {benefits.map((benefit) => (
          <BenefitCard
            key={benefit.title}
            {...benefit}
            isActive={expandedBenefit === benefit.title}
            onClick={() =>
              setExpandedBenefit(
                expandedBenefit === benefit.title ? null : benefit.title
              )
            }
          />
        ))}
      </div>
      {expandedBenefit && (
        <Card className="w-full mt-4 border-[#FFA500] border-2">
          <CardContent className="p-4">
            <h4 className="text-xl font-semibold mb-4 text-[#FFA500]">
              {expandedBenefit} Metrics
            </h4>
            {benefits
              .find((b) => b.title === expandedBenefit)
              ?.milestones.map((milestone, index) => (
                <div
                  key={index}
                  className="flex justify-between items-center mb-3 bg-gray-100 p-2 rounded"
                >
                  <div className="flex items-center">
                    <span className="text-2xl mr-2">{milestone.icon}</span>
                    <span className="text-lg">{milestone.title}</span>
                  </div>
                  <span className="text-lg font-semibold text-[#4CAF50]">
                    {milestone.value}
                  </span>
                </div>
              ))}
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default UnlockedBenefits;
