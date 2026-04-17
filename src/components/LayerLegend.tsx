import { LAYER_COLORS, LAYER_NAMES } from "@/lib/constants";

const LEGEND_LAYERS = [
  "experience",
  "orchestration_aeo",
  "functional_pillars",
  "content_operations_ico",
  "commercial_brain",
  "enterprise_data",
  "governance_trust",
];

export default function LayerLegend() {
  return (
    <div className="flex gap-2.5 mb-3 flex-wrap">
      {LEGEND_LAYERS.map((id) => (
        <div key={id} className="text-[11px] text-tx3 flex items-center gap-1">
          <div
            className="w-2.5 h-2.5 rounded-sm"
            style={{ background: LAYER_COLORS[id] }}
          />
          {LAYER_NAMES[id]}
        </div>
      ))}
    </div>
  );
}
