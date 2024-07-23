import Icon from "../icons";
import Link from "next/link";
import { Button } from "../ui/button";

const SignUpSuccess = () => {
  return (
    <>
      <Icon
        name="checkCircle"
        width={80}
        height={80}
        fill="#fff"
        stroke="#32de84"
        className="mb-4"
      />
      <h3 className="h3-bold">Registration completed successfully.</h3>
      <Link href="/sign-in">
        <Button className="mt-4">Login</Button>
      </Link>
    </>
  );
};

export default SignUpSuccess;
