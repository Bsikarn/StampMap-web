import React from "react";
import { ChevronRight } from "lucide-react";
import { ToggleSwitch } from "@/components/ui/toggle-switch";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

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
 * SettingsGroup — Renders a single settings category card.
 * Uses Tailwind v4 design tokens (glass, brand, ink tokens) instead of hardcoded colors.
 * Replaces internal divider with shadcn/ui Separator.
 */
export const SettingsGroup = React.memo(({ group, toggleStates, onToggle }: SettingsGroupProps) => {
  return (
    <div>
      <p className="mb-2.5 ml-2 text-xs font-bold uppercase tracking-[0.14em] text-ink-muted">
        {group.title}
      </p>

      <div className="glass shadow-soft overflow-hidden rounded-[20px] border border-white/65">
        {group.items.map((item, index) => {
          const Icon = item.icon;
          const isLast = index === group.items.length - 1;

          return (
            <div key={item.id}>
              <div className="flex items-center gap-3 px-4 py-3.5">
                {/* Icon container with brand-light background */}
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-surface-subtle">
                  <Icon className="h-4 w-4 text-ink-secondary" />
                </div>

                {/* Label */}
                <span className="flex-1 text-sm font-medium text-ink">
                  {item.label}
                </span>

                {/* Action: Toggle or chevron link */}
                {item.type === "toggle" ? (
                  <ToggleSwitch
                    enabled={toggleStates[item.id] ?? false}
                    onToggle={() => onToggle(item.id)}
                  />
                ) : (
                  <div className="flex items-center gap-1 text-ink-muted">
                    {item.value && (
                      <span className="text-xs font-medium">{item.value}</span>
                    )}
                    <ChevronRight className="h-4 w-4" />
                  </div>
                )}
              </div>

              {/* Internal divider via shadcn/ui Separator */}
              {!isLast && <Separator className="mx-4 bg-brand/6 w-[calc(100%-2rem)]" />}
            </div>
          );
        })}
      </div>
    </div>
  );
});
SettingsGroup.displayName = "SettingsGroup";
