import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const KeypointCard = ({
  title,
  content,
}: {
  title: string;
  content: string | number | string[] | undefined;
}) => {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="body-medium">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        {Array.isArray(content) ? (
          content.map((item, index) => (
            <>
              <div key={index} className="h3-bold">
                {item}
              </div>
            </>
          ))
        ) : (
          <span className="h3-bold">{content}</span>
        )}
      </CardContent>
    </Card>
  );
};

export default KeypointCard;
