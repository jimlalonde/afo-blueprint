import BlueprintV2 from "@/components/BlueprintV2";
import blueprintData from "../../afo_capability_blueprint.json";
import { BlueprintData } from "@/types";

export default function Home() {
  return <BlueprintV2 data={blueprintData as BlueprintData} />;
}
