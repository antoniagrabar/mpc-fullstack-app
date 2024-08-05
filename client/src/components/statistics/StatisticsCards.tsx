"use client";

import { useEffect, useState } from "react";
import KeypointCard from "../cards/KeypointCard";
import { keypointCardTitles } from "@/constants";
import { Statistics } from "@/types";
import { createAttackLabel } from "@/utils/helpers";
import AggregateDataCard from "../cards/AggregateDataCard";

const StatisticsCards = () => {
  const [statistics, setStatistics] = useState<Statistics>();

  useEffect(() => {
    const fetchStatistics = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_ANALYST_URL}/statistics`,
          {
            method: "GET",
            headers: {
              "Content-type": "application/json",
            },
          }
        );

        if (!response.ok) {
          throw new Error(response.statusText);
        }
        const responseData = await response.json();
        setStatistics(responseData);
      } catch (error) {
        console.error("Error getting statistics:", error);
      }
    };

    fetchStatistics();
  }, []);

  console.log(statistics);

  const keypointCardContent = (index: number) => {
    if (statistics) {
      switch (index) {
        case 0:
          return statistics.companies;
        case 1:
          return statistics.totalAttacks;
        case 2:
          return createAttackLabel(statistics.mostCommonAttack);
        case 3:
          return createAttackLabel(statistics.leastCommonAttack);
      }
    }
  };

  return (
    <>
      {statistics ? (
        <>
          <div className="grid gap-3 md:grid-cols-2 md:gap-6 lg:grid-cols-4">
            {keypointCardTitles.map((title: string, index: number) => (
              <KeypointCard
                title={title}
                key={index}
                content={keypointCardContent(index)}
              />
            ))}
          </div>
          <div className="mt-6">
            <AggregateDataCard aggregateData={statistics?.aggregateData} />
          </div>
        </>
      ) : (
        <></>
      )}
    </>
  );
};

export default StatisticsCards;
