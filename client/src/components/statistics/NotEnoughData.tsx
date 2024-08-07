import Icon from "../icons";
import { Card, CardContent } from "../ui/card";

const NotEnoughData = () => {
  return (
    <Card>
      <CardContent>
        <div className="flex justify-center items-center mt-6">
          <Icon
            name="info"
            width={24}
            height={24}
            fill="#fff"
            className="mr-4"
          />
          <span className="paragraph-semibold">Not enough data</span>
        </div>
      </CardContent>
    </Card>
  );
};

export default NotEnoughData;
