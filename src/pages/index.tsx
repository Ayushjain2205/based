import ProfileCard from "@/components/functional/ProfileCard";
import Layout from "@/components/Layout";
import React from "react";

const index = () => {
  return (
    <Layout>
      <ProfileCard
        name="Rahul Singh"
        baseName="rahul.base"
        role="Plumber"
        rating={4.8}
        platformScore={750}
        roziCoins={1000}
      />
    </Layout>
  );
};

export default index;
