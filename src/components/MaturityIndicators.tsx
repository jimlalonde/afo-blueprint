import { MaturityIndicators as MaturityType } from "@/types";
import { STAGE_LABELS } from "@/lib/constants";

interface Props {
  indicators: MaturityType;
  singleColumn?: boolean;
}

const BORDER_COLORS: Record<string, string> = {
  s1: "var(--color-tx3)",
  s2: "#534AB7",
  s3: "#0F6E56",
  s4: "#185FA5",
};

export default function MaturityIndicators({
  indicators,
  singleColumn,
}: Props) {
  if (!indicators || Object.keys(indicators).length === 0) return null;

  return (
    <div
      className={`mt-2 grid gap-1 ${singleColumn ? "grid-cols-1" : "grid-cols-2"}`}
    >
      {STAGE_LABELS.map(({ key, label, cls }) => {
        const text = indicators[key as keyof MaturityType];
        if (!text) return null;
        return (
          <div
            key={key}
            className="py-1 px-2 rounded text-[10px] leading-snug border border-bd"
            style={{ borderLeftWidth: 2, borderLeftColor: BORDER_COLORS[cls] }}
          >
            <span className="font-medium">{label}:</span>{" "}
            <span className="text-tx3">{text}</span>
          </div>
        );
      })}
    </div>
  );
}
