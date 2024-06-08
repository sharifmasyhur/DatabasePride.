import { Canteen } from "@/types";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Dot } from "lucide-react";

type Props = {
  canteen: Canteen;
};

const CanteenInfo = ({ canteen }: Props) => {
  return (
    <Card className="border-sla">
      <CardHeader>
        <CardTitle className="text-3xl font-bold tracking-tight">
          {canteen.canteenName}
        </CardTitle>
        <CardDescription>
          {canteen.faculty}, {canteen.cluster}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex">
        {canteen.cuisines.map((item, index) => (
          <span className="flex">
            <span>{item}</span>
            {index < canteen.cuisines.length - 1 && <Dot />}
          </span>
        ))}
      </CardContent>
    </Card>
  );
};

export default CanteenInfo;
