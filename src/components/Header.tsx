import { BlueprintMetadata } from "@/types";

interface HeaderProps {
  metadata: BlueprintMetadata;
  layerCount: number;
}

export default function Header({ metadata, layerCount }: HeaderProps) {
  const stats = [
    { value: layerCount, label: "Architecture layers" },
    { value: metadata.total_l1_components, label: "L1 components" },
    { value: metadata.total_l2_capabilities, label: "L2 capabilities" },
    { value: `v${metadata.version}`, label: metadata.status },
  ];

  return (
    <>
      <h1 className="text-xl font-medium mb-1">Agentic Front Office (AFO) Capability Blueprint</h1>
      <p className="text-xs text-tx3 mb-5">
        L1/L2 capability decomposition of the Agentic Front Office reference
        architecture
      </p>
      <div className="flex gap-3 mb-3 flex-wrap">
        {stats.map((s) => (
          <div
            key={s.label}
            className="bg-bg2 rounded-lg px-3.5 py-2.5 flex-1 min-w-[120px]"
          >
            <div className="text-lg font-medium">{s.value}</div>
            <div className="text-[11px] text-tx3 mt-0.5">{s.label}</div>
          </div>
        ))}
      </div>
    </>
  );
}
