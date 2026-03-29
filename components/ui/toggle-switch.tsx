import React from "react";

interface ToggleSwitchProps {
  enabled: boolean;
  onToggle: () => void;
}

/**
 * ToggleSwitch Component
 * 
 * A custom iOS-styled toggle switch.
 */
export const ToggleSwitch = React.memo(({ enabled, onToggle }: ToggleSwitchProps) => {
  return (
    <button
      onClick={onToggle}
      className={`relative h-7 w-12 rounded-full transition-colors duration-200 ${
        enabled ? "bg-brand" : "bg-gray-300"
      }`}
      aria-label="Toggle setting"
    >
      <span
        className={`absolute top-0.5 h-6 w-6 rounded-full bg-white shadow-sm transition-transform duration-200 ${
          enabled ? "left-[calc(100%-1.625rem)]" : "left-0.5"
        }`}
      />
    </button>
  );
});
ToggleSwitch.displayName = "ToggleSwitch";
