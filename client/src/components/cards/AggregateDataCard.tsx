"use client";

import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts";
import {
  aggregateDataChartConfig,
  lineChartColors,
  attacks,
} from "@/constants";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { MonthData } from "@/types";

const AggregateDataCard = (aggregateData: { aggregateData: MonthData[] }) => {
  return (
    <Card>
      <CardHeader className="pb-6">
        <CardTitle className="body-medium ">Total Attack Frequency</CardTitle>
        <CardDescription>January - December 2024</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={aggregateDataChartConfig}>
          <LineChart
            accessibilityLayer
            data={aggregateData.aggregateData}
            margin={{
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <YAxis />
            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
            {attacks.map((attack, index) => (
              <Line
                key={attack}
                dataKey={attack}
                type="monotone"
                stroke={lineChartColors[index]}
                strokeWidth={2}
                dot={false}
              />
            ))}
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};

export default AggregateDataCard;
