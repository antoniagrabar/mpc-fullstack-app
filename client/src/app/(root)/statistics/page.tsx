import StatisticsCards from "@/components/statistics/StatisticsCards";

const Page = () => {
  return (
    <>
      <h2 className="h2-bold mb-8">Statistics</h2>
      <p className="text-gray300 paragraph-regular mb-8">
        Here you can find the aggregate statistics of the submitted data. Data
        analysis is performed when there is a minimum of two data entries from
        different companies, ensuring the data privacy from the first company.
      </p>
      <StatisticsCards />
    </>
  );
};

export default Page;
