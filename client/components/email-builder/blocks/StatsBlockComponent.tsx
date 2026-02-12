import React, { useState } from "react";
import { StatsBlock } from "../types";
import { Copy, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { generateId } from "../utils";

interface StatsBlockComponentProps {
  block: StatsBlock;
  isSelected: boolean;
  onUpdate: (block: StatsBlock) => void;
}

export const StatsBlockComponent: React.FC<StatsBlockComponentProps> = ({
  block,
  isSelected,
  onUpdate,
}) => {
  const [editMode, setEditMode] = useState<{ id: string; field: "value" | "label" } | null>(null);
  const [hoveredFieldId, setHoveredFieldId] = useState<string | null>(null);
  const [focusedFieldId, setFocusedFieldId] = useState<string | null>(null);

  const handleUpdateStat = (id: string, field: "value" | "label", content: string) => {
    const updatedStats = block.stats.map((s) =>
      s.id === id ? { ...s, [field]: content } : s
    );
    onUpdate({ ...block, stats: updatedStats });
  };

  const handleDuplicateStat = (id: string) => {
    const statToDuplicate = block.stats.find((s) => s.id === id);
    if (statToDuplicate) {
      const newStats = [...block.stats];
      const index = block.stats.findIndex((s) => s.id === id);
      newStats.splice(index + 1, 0, {
        ...statToDuplicate,
        id: generateId(),
      });
      onUpdate({ ...block, stats: newStats });
    }
  };

  const handleDeleteStat = (id: string) => {
    const newStats = block.stats.filter((s) => s.id !== id);
    onUpdate({ ...block, stats: newStats });
    setEditMode(null);
    setFocusedFieldId(null);
  };

  // No local createId needed, using generateId from utils

  const containerStyle = {
    width: `${block.width}${block.widthUnit}`,
    margin: "20px 0",
    display: "flex",
    flexWrap: "wrap" as const,
  };

  const FieldToolbar = ({
    onCopy,
    onDelete,
  }: {
    onCopy: () => void;
    onDelete: () => void;
  }) => {
    return (
      <div className="flex items-center gap-1 bg-white border border-gray-200 rounded-lg p-1 shadow-md mt-2 w-fit mx-auto z-[110]">
        <Button
          variant="ghost"
          size="sm"
          className="h-7 w-7 p-0 hover:bg-gray-100"
          onClick={(e) => {
            e.stopPropagation();
            onCopy();
          }}
        >
          <Copy className="w-3.5 h-3.5 text-gray-700" />
        </Button>
        <Button
          variant="ghost"
          size="sm"
          className="h-7 w-7 p-0 hover:bg-red-50"
          onClick={(e) => {
            e.stopPropagation();
            onDelete();
          }}
        >
          <Trash2 className="w-3.5 h-3.5 text-red-600" />
        </Button>
      </div>
    );
  };

  return (
    <div
      style={containerStyle}
      className={`rounded-lg transition-all group relative ${
        isSelected ? "ring-2 ring-valasys-orange" : ""
      }`}
    >
      {block.stats.map((stat, index) => {
        const borderStyle =
          index !== block.stats.length - 1
            ? { borderRight: "1px solid #e0e0e0" }
            : {};
        
        const isHovered = hoveredFieldId === stat.id;
        const isFocused = focusedFieldId === stat.id;

        return (
          <div
            key={stat.id}
            style={{
              width: "33%",
              textAlign: "center",
              padding: `${stat.padding}px`,
              boxSizing: "border-box",
              ...borderStyle,
              position: "relative",
            }}
            onMouseEnter={() => setHoveredFieldId(stat.id)}
            onMouseLeave={() => setHoveredFieldId(null)}
          >
            <div
              className="relative p-2 rounded transition-all"
              style={{
                border: isFocused
                  ? "2px solid rgb(255, 106, 0)"
                  : isHovered
                  ? "2px dotted rgb(255, 106, 0)"
                  : "2px solid transparent",
              }}
              onClick={() => setFocusedFieldId(stat.id)}
            >
              {/* Value Field */}
              <div className="mb-2">
                {editMode?.id === stat.id && editMode.field === "value" ? (
                  <Input
                    value={stat.value}
                    onChange={(e) => handleUpdateStat(stat.id, "value", e.target.value)}
                    onBlur={() => setEditMode(null)}
                    autoFocus
                    className="text-center font-bold text-lg"
                  />
                ) : (
                  <h3
                    style={{
                      margin: 0,
                      fontSize: `${stat.fontSize}px`,
                      fontWeight: "bold",
                      color: stat.textColor,
                      cursor: "pointer",
                    }}
                    onDoubleClick={() => setEditMode({ id: stat.id, field: "value" })}
                  >
                    {stat.value}
                  </h3>
                )}
              </div>

              {/* Label Field */}
              <div>
                {editMode?.id === stat.id && editMode.field === "label" ? (
                  <Input
                    value={stat.label}
                    onChange={(e) => handleUpdateStat(stat.id, "label", e.target.value)}
                    onBlur={() => setEditMode(null)}
                    autoFocus
                    className="text-center text-sm"
                  />
                ) : (
                  <p
                    style={{
                      margin: 0,
                      fontSize: `${stat.labelFontSize}px`,
                      color: "#666",
                      cursor: "pointer",
                    }}
                    onDoubleClick={() => setEditMode({ id: stat.id, field: "label" })}
                  >
                    {stat.label}
                  </p>
                )}
              </div>

              {isFocused && (
                <FieldToolbar
                  onCopy={() => handleDuplicateStat(stat.id)}
                  onDelete={() => handleDeleteStat(stat.id)}
                />
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};
