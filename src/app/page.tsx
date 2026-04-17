import Blueprint from "@/components/Blueprint";
import blueprintData from "../../afo_capability_blueprint.json";
import { BlueprintData } from "@/types";

export default function Home() {
  return <Blueprint data={blueprintData as BlueprintData} />;
}
