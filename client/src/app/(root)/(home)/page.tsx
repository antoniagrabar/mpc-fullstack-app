import Welcome from "@/components/home/Welcome";

const Page = () => {
  return (
    <div>
      <Welcome />
      <p className="text-gray300 paragraph-regular">
        Thank you for deciding to join this research, where we aim to find
        correlations between cyberattacks and time periods to enhance our
        understanding and defenses against these threats. Before you proceed
        with inputting your data, please read the following instructions
        carefully.
      </p>
      <div className="pt-8">
        <h3 className="h3-semibold mb-3">What to Submit</h3>
        <p className="text-gray300 paragraph-regular">
          We request information on the 10 most common cyber attacks your
          organization has faced over the past 12 months. For each attack type,
          you will need to provide the number of incidents for each month over
          the past 12 months.
        </p>
      </div>
      <div className="pt-8">
        <h3 className="h3-semibold mb-3">Privacy and Security</h3>
        <p className="text-gray300 paragraph-regular">
          We utilize Multi-Party Computation (MPC) to ensure your data remains
          private and secure. Here&apos;s how it works:
        </p>
        <div className="pl-12 pt-3">
          <p className="text-gray300 paragraph-regular pb-3">
            <span className="paragraph-bold">100% hidden data: </span> The data
            you submit is masked with an encrypted mask. The masked data is sent
            to us (the service provider), and the encrypted mask is sent to the
            trusted third party (analyst), ensuring that no single party can
            access the complete data.
          </p>
          <p className="text-gray300 paragraph-regular pb-3">
            <span className="paragraph-bold">No data storage: </span> Your data
            is not stored in any database. It is processed in real-time and
            discarded immediately after computation.
          </p>
          <p className="text-gray300 paragraph-regular">
            <span className="paragraph-bold">Complete privacy: </span> Neither
            we nor any participating party can ever access your raw data. The
            computation is designed to aggregate results without revealing
            individual inputs.
          </p>
        </div>
      </div>
      <div className="pt-8">
        <h3 className="h3-semibold mb-3">How to Submit</h3>
        <div className="pl-12">
          <p className="text-gray300 paragraph-regular pb-3">
            1)
            <span className="paragraph-bold pl-2">
              Navigate to the &quot;Data Entry&quot; Tab:
            </span>{" "}
            Find this tab in the sidebar of the web page.
          </p>
          <p className="text-gray300 paragraph-regular pb-3">
            {" "}
            2)
            <span className="paragraph-bold pl-2">Fill in the table: </span>
            Enter the number of incidents for each attack type for each of the
            past 12 months in the provided table.
          </p>
          <p className="text-gray300 paragraph-regular">
            3)
            <span className="paragraph-bold pl-2">Submit data: </span> Once all
            fields are filled, click the &quot;Submit&quot; button.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Page;
