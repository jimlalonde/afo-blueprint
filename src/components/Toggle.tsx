"use client";

interface ToggleProps {
  label: string;
  enabled: boolean;
  onToggle: () => void;
}

export default function Toggle({ label, enabled, onToggle }: ToggleProps) {
  return (
    <div className="flex items-center gap-1.5">
      <button
        onClick={onToggle}
        className={`relative w-[34px] h-[18px] rounded-full cursor-pointer transition-colors flex-shrink-0 ${
          enabled ? "bg-[#0F6E56]" : "bg-bd2"
        }`}
        role="switch"
        aria-checked={enabled}
        aria-label={label}
      >
        <span
          className={`absolute top-0.5 left-0.5 w-3.5 h-3.5 bg-bg rounded-full transition-transform ${
            enabled ? "translate-x-4" : ""
          }`}
        />
      </button>
      <span className="text-xs text-tx2">{label}</span>
    </div>
  );
}
