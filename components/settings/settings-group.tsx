import React from "react";
import { ChevronRight } from "lucide-react";
import { ToggleSwitch } from "@/components/ui/toggle-switch";

export type SettingItem = {
  id: string;
  icon: React.ElementType;
  label: string;
  type: "link" | "toggle";
  value?: string;
  defaultEnabled?: boolean;
};

export type SettingGroupData = {
  title: string;
  items: SettingItem[];
};

interface SettingsGroupProps {
  group: SettingGroupData;
  toggleStates: Record<string, boolean>;
  onToggle: (id: string) => void;
}

/**
 * SettingsGroup Component
 * 
 * Renders a specific category block within the Settings page.
 * Maps through individual setting items and handles toggle states vs static links.
 */
export const SettingsGroup = React.memo(({ group, toggleStates, onToggle }: SettingsGroupProps) => {
  return (
    <div>
      <p className="mb-2.5 ml-2 text-sm font-bold tracking-wide text-slate-500">
        {group.title}
      </p>
      <div className="overflow-hidden rounded-2xl bg-white shadow-card ring-1 ring-black/[0.04]">
        {group.items.map((item, index) => {
          const Icon = item.icon;
          const isLast = index === group.items.length - 1;

          return (
            <div key={item.id}>
              <div className="flex items-center gap-3 px-4 py-3.5">
                {/* Visual Icon */}
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-slate-100">
                  <Icon className="h-4 w-4 text-slate-500" />
                </div>

                {/* Main Label */}
                <span className="flex-1 text-sm font-medium text-slate-800">
                  {item.label}
                </span>

                {/* Action Control: Toggle or Navigation Indicator */}
                {item.type === "toggle" ? (
                  <ToggleSwitch
                    enabled={toggleStates[item.id] ?? false}
                    onToggle={() => onToggle(item.id)}
                  />
                ) : (
                  <div className="flex items-center gap-1 text-slate-400">
                    {item.value && (
                      <span className="text-xs">{item.value}</span>
                    )}
                    <ChevronRight className="h-4 w-4" />
                  </div>
                )}
              </div>
              
              {/* Internal Divider */}
              {!isLast && <div className="mx-4 h-px bg-slate-100" />}
            </div>
          );
        })}
      </div>
    </div>
  );
});
SettingsGroup.displayName = "SettingsGroup";
