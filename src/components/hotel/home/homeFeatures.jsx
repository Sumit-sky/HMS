import React from "react";
import FeatureCard from "./featureCard";
import feature1 from "../../../Assets/home_features/feature1.png";
import feature2 from "../../../Assets/home_features/feature2.png";
import feature3 from "../../../Assets/home_features/feature3.png";

export default function HomeFeatures() {
  return (
    <div className="bg-[rgba(106,155,182,0.38)] w-full flex flex-col justify-center items-center p-10">
      <h1 className="font-serif text-4xl my-5">Get Everything Done</h1>
      <div className="flex w-11/12 justify-around my-5">
        <FeatureCard
          image={feature1}
          title={"Skyrocket conversion rate"}
          desc={
            "Increase hotel conversion up to 25% with our online visual merchandising interface."
          }
        />
        <FeatureCard
          image={feature3}
          title={"Spend less time for management"}
          desc={
            "Let your employees spend much less time managing the online store catalog."
          }
        />
        <FeatureCard
          image={feature2}
          title={"Increase your Revenue"}
          desc={"Increase the revenueof your hotel up to 15% easily."}
        />
      </div>
    </div>
  );
}
