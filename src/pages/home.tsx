import ProfileCard from "@/components/functional/ProfileCard";
import Layout from "@/components/Layout";
import React from "react";
import UnlockedBenefits from "@/components/functional/UnlockedBenefits";
const Home = () => {
  return (
    <Layout>
      <ProfileCard
        name="Ayush Jain"
        baseName="iyush.base.eth"
        role="Plumber"
        rating={4.8}
        platformScore={750}
        roziCoins={1000}
      />
      <UnlockedBenefits />
    </Layout>
  );
};

export default Home;
