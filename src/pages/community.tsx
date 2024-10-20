import React, { useState } from "react";
import Layout from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

import {
  Coins,
  Users,
  ChevronDown,
  ChevronUp,
  CheckCircle,
  XCircle,
  Calendar,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Community {
  id: string;
  name: string;
  members: number;
  icon: string;
}

interface Proposal {
  id: number;
  title: string;
  description: string;
  communityId: string;
  yesVotes: number;
  noVotes: number;
  deadline: Date;
  userVotingPower: number;
}

const communities: Community[] = [
  { id: "plumbers", name: "Plumbers of Bangalore", members: 234, icon: "🔧" },
  { id: "urban", name: "Urban Company Partners", members: 1678, icon: "🏙️" },
  { id: "handymen", name: "Handymen Network", members: 1456, icon: "🛠️" },
  {
    id: "electricians",
    name: "Electricians United",
    members: 345,
    icon: "⚡",
  },
];

const initialProposals: Proposal[] = [
  {
    id: 1,
    title: "Implement Micro-Insurance for Gig Workers",
    description:
      "Introduce a micro-insurance program to provide basic health and accident coverage for all registered gig workers on the platform.",
    communityId: "urban",
    yesVotes: 1500,
    noVotes: 500,
    deadline: new Date("2024-12-31"),
    userVotingPower: 100,
  },
  {
    id: 2,
    title: "Expand Platform to Rural Areas",
    description:
      "Develop strategies and allocate resources to expand the Rozi platform's reach to rural areas, focusing on agricultural and cottage industry gig work.",
    communityId: "handymen",
    yesVotes: 2000,
    noVotes: 800,
    deadline: new Date("2024-11-30"),
    userVotingPower: 150,
  },
  {
    id: 3,
    title: "Implement Skill Development Programs",
    description:
      "Create and fund skill development programs to help gig workers improve their skills and increase their earning potential on the platform.",
    communityId: "plumbers",
    yesVotes: 1800,
    noVotes: 200,
    deadline: new Date("2024-10-15"),
    userVotingPower: 80,
  },
  {
    id: 4,
    title: "Establish a Gig Worker Emergency Fund",
    description:
      "Set up an emergency fund to provide financial assistance to gig workers facing unexpected hardships or medical emergencies.",
    communityId: "urban",
    yesVotes: 3000,
    noVotes: 700,
    deadline: new Date("2024-09-30"),
    userVotingPower: 120,
  },
  {
    id: 5,
    title: "Introduce Peer-to-Peer Mentorship Program",
    description:
      "Create a mentorship program where experienced gig workers can guide and support newcomers, fostering community growth and knowledge sharing.",
    communityId: "electricians",
    yesVotes: 1200,
    noVotes: 300,
    deadline: new Date("2024-11-15"),
    userVotingPower: 90,
  },
  {
    id: 6,
    title: "Implement Fair Pricing Algorithm",
    description:
      "Develop and implement a transparent, fair pricing algorithm that ensures competitive rates for gig workers while maintaining affordability for customers.",
    communityId: "handymen",
    yesVotes: 2500,
    noVotes: 1000,
    deadline: new Date("2024-12-15"),
    userVotingPower: 130,
  },
  {
    id: 7,
    title: "Launch Gig Worker Cooperative Ownership Model",
    description:
      "Explore and implement a cooperative ownership model where long-term, high-performing gig workers can become partial owners of the platform.",
    communityId: "plumbers",
    yesVotes: 1600,
    noVotes: 900,
    deadline: new Date("2025-01-31"),
    userVotingPower: 110,
  },
  {
    id: 8,
    title: "Create a Gig Worker Wellness Program",
    description:
      "Establish a wellness program offering mental health support, stress management resources, and work-life balance guidance for gig workers.",
    communityId: "urban",
    yesVotes: 2200,
    noVotes: 400,
    deadline: new Date("2024-10-31"),
    userVotingPower: 100,
  },
  {
    id: 9,
    title: "Implement Blockchain-based Payment System",
    description:
      "Develop and integrate a blockchain-based payment system to ensure faster, more secure, and transparent transactions for gig workers.",
    communityId: "electricians",
    yesVotes: 1800,
    noVotes: 1200,
    deadline: new Date("2025-02-28"),
    userVotingPower: 140,
  },
  {
    id: 10,
    title: "Establish Gig Worker Representation Committee",
    description:
      "Form a committee with elected gig worker representatives to participate in platform decision-making processes and advocate for worker interests.",
    communityId: "handymen",
    yesVotes: 2800,
    noVotes: 600,
    deadline: new Date("2024-11-30"),
    userVotingPower: 160,
  },
];

const CommunityVoting: React.FC = () => {
  const [selectedCommunity, setSelectedCommunity] = useState<string>(
    communities[0].id
  );
  const [expandedProposal, setExpandedProposal] = useState<number | null>(null);
  const [proposals, setProposals] = useState<Proposal[]>(initialProposals);
  const { toast } = useToast();

  const handleVote = (proposalId: number, voteType: "yes" | "no") => {
    setProposals((prevProposals) =>
      prevProposals.map((proposal) => {
        if (proposal.id === proposalId) {
          const updatedProposal = { ...proposal };
          if (voteType === "yes") {
            updatedProposal.yesVotes += proposal.userVotingPower;
          } else {
            updatedProposal.noVotes += proposal.userVotingPower;
          }
          return updatedProposal;
        }
        return proposal;
      })
    );

    const proposal = proposals.find((p) => p.id === proposalId);
    if (!proposal) return;

    const votes = proposal.userVotingPower;

    toast({
      title: "Vote Recorded",
      className: "rounded-xl",
      description: (
        <div className="flex items-center">
          <div
            className={`w-6 h-6 rounded-full mr-2 flex items-center justify-center ${
              voteType === "yes" ? "bg-[#4CAF50]" : "bg-red-500"
            }`}
          >
            {voteType === "yes" ? (
              <CheckCircle className="w-4 h-4 text-white" />
            ) : (
              <XCircle className="w-4 h-4 text-white" />
            )}
          </div>
          <span className="rounded-xl">
            You voted <strong>{voteType}</strong> with{" "}
            <strong>{votes} votes</strong> ({votes} $ROZI)
          </span>
        </div>
      ),
      duration: 5000,
    });
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-IN", { day: "numeric", month: "short" });
  };

  const toggleExpand = (id: number) => {
    setExpandedProposal(expandedProposal === id ? null : id);
  };

  const calculatePercentage = (yes: number, no: number) => {
    const total = yes + no;
    return total > 0 ? Math.round((yes / total) * 100) : 0;
  };

  return (
    <Layout>
      <div className="container mx-auto pb-4">
        <h1 className="text-xl font-bold mb-4">Community Governance</h1>
        <Select
          value={selectedCommunity}
          onValueChange={(value) => setSelectedCommunity(value)}
        >
          <SelectTrigger className="w-full mb-4 rounded-xl">
            <SelectValue placeholder="Select a community" />
          </SelectTrigger>
          <SelectContent>
            {communities.map((community) => (
              <SelectItem key={community.id} value={community.id}>
                <span className="mr-2">{community.icon}</span>
                {community.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {communities.find((c) => c.id === selectedCommunity) && (
          <Card className="mb-4 rounded-xl overflow-hidden">
            <CardHeader className="bg-[#FFA500] text-white p-3">
              <CardTitle className="text-lg font-semibold flex items-center justify-between">
                <span>
                  {communities.find((c) => c.id === selectedCommunity)?.name}
                </span>

                <div className="flex items-center bg-gray-100 rounded-full px-3 py-1">
                  <Users className="w-4 h-4 mr-1 text-[#4CAF50]" />
                  <span className="text-sm font-semibold text-[#4CAF50]">
                    {
                      communities.find((c) => c.id === selectedCommunity)
                        ?.members
                    }
                  </span>
                </div>
              </CardTitle>
            </CardHeader>
          </Card>
        )}

        <div className="space-y-4">
          {proposals
            .filter((proposal) => proposal.communityId === selectedCommunity)
            .map((proposal) => (
              <Card
                key={proposal.id}
                className="overflow-hidden hover:shadow-lg transition-shadow duration-300 rounded-xl"
              >
                <Collapsible>
                  <CardContent className="p-4">
                    <h3 className="font-semibold text-sm mb-2">
                      {proposal.title}
                    </h3>
                    <div className="flex items-center justify-between mb-2 text-xs text-gray-500">
                      <div className="flex items-center">
                        <Coins className="w-3 h-3 text-[#FFA500] mr-1" />
                        <span>{proposal.userVotingPower} $ROZI</span>
                      </div>
                      <div className="flex items-center">
                        <Calendar className="w-3 h-3 mr-1" />
                        <span>{formatDate(proposal.deadline)}</span>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2 mb-3">
                      <div className="flex-grow h-2 rounded-full overflow-hidden">
                        <div className="h-full flex">
                          <div
                            className="h-full bg-[#4CAF50]"
                            style={{
                              width: `${calculatePercentage(
                                proposal.yesVotes,
                                proposal.noVotes
                              )}%`,
                            }}
                          />
                          <div
                            className="h-full bg-red-500"
                            style={{
                              width: `${
                                100 -
                                calculatePercentage(
                                  proposal.yesVotes,
                                  proposal.noVotes
                                )
                              }%`,
                            }}
                          />
                        </div>
                      </div>
                      <span className="text-xs font-semibold text-[#4CAF50]">
                        {calculatePercentage(
                          proposal.yesVotes,
                          proposal.noVotes
                        )}
                        %
                      </span>
                      <span className="text-xs font-semibold text-red-500">
                        {100 -
                          calculatePercentage(
                            proposal.yesVotes,
                            proposal.noVotes
                          )}
                        %
                      </span>
                    </div>
                    <div className="flex space-x-2">
                      <Button
                        onClick={() => handleVote(proposal.id, "yes")}
                        className="bg-[#4CAF50] hover:bg-[#45a049] text-white rounded-xl flex-1"
                        size="sm"
                      >
                        <CheckCircle className="w-4 h-4 mr-1" /> Yes
                      </Button>
                      <Button
                        onClick={() => handleVote(proposal.id, "no")}
                        className="bg-red-500 hover:bg-red-600 text-white rounded-xl flex-1"
                        size="sm"
                      >
                        <XCircle className="w-4 h-4 mr-1" /> No
                      </Button>
                      <CollapsibleTrigger asChild>
                        <Button
                          variant="outline"
                          size="sm"
                          className="rounded-xl"
                          onClick={() => toggleExpand(proposal.id)}
                        >
                          {expandedProposal === proposal.id ? (
                            <ChevronUp className="h-4 w-4" />
                          ) : (
                            <ChevronDown className="h-4 w-4" />
                          )}
                        </Button>
                      </CollapsibleTrigger>
                    </div>
                  </CardContent>
                  <CollapsibleContent>
                    <CardContent className="pt-0 pb-4 px-4">
                      <p className="text-xs text-gray-600">
                        {proposal.description}
                      </p>
                    </CardContent>
                  </CollapsibleContent>
                </Collapsible>
              </Card>
            ))}
        </div>
      </div>
    </Layout>
  );
};

export default CommunityVoting;
