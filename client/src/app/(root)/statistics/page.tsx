import StatisticsCards from "@/components/statistics/StatisticsCards";

const Page = () => {
  return (
    <>
      <h2 className="h2-bold mb-8">Statistics</h2>
      <p className="text-gray300 paragraph-regular mb-8">
        Here you can find the aggregate statistics of the submitted data. Data
        analysis is conducted only when there are at least three data entries
        from different companies, guaranteeing that the data remains
        confidential and cannot be inferred or deduced from any individual
        source.
      </p>
      <StatisticsCards />
    </>
  );
};

export default Page;
