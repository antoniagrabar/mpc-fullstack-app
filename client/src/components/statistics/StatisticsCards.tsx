"use client";

import { useEffect, useState } from "react";
import KeypointCard from "../cards/KeypointCard";
import { keypointCardTitles } from "@/constants";
import { Statistics } from "@/types";
import { createAttackLabel } from "@/utils/helpers";
import AggregateDataCard from "../cards/AggregateDataCard";
import NotEnoughData from "./NotEnoughData";
import toast from "react-hot-toast";

const StatisticsCards = () => {
  const [statistics, setStatistics] = useState<Statistics>();
  const [notEnoughData, setNotEnoughData] = useState<boolean>(false);

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

      const responseData = await response.json();

      if (!response.ok) {
        if (response.status === 400) {
          setNotEnoughData(true);
        } else {
          toast.error(responseData.message);
        }
      } else {
        setStatistics(responseData);
      }
    } catch (error) {
      console.error("Error getting statistics:", error);
    }
  };

  useEffect(() => {
    fetchStatistics();

    const error = console.error;
    console.error = (...args: any) => {
      if (/defaultProps/.test(args[0])) return;
      error(...args);
    };
  }, []);

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
      ) : notEnoughData ? (
        <NotEnoughData />
      ) : (
        <></>
      )}
    </>
  );
};

export default StatisticsCards;
