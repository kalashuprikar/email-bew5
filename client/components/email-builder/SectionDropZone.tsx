import React from "react";
import { useDrop } from "react-dnd";
import { cn } from "@/lib/utils";
import { ContentBlock } from "./types";
import { Plus } from "lucide-react";

interface SectionDropZoneProps {
  sectionId: string;
  blockIndex?: number;
  onBlockDrop: (block: ContentBlock, sectionId: string, position?: number) => void;
  isOver?: boolean;
  children?: React.ReactNode;
  className?: string;
  showPlaceholder?: boolean;
}

export const SectionDropZone: React.FC<SectionDropZoneProps> = ({
  sectionId,
  blockIndex,
  onBlockDrop,
  children,
  className,
  showPlaceholder = true,
}) => {
  const [{ isOver, canDrop }, drop] = useDrop(
    () => ({
      accept: ["block", "canvas-block"],
      drop: (item: any) => {
        // Handle block drop
        if (item.block) {
          // New block from BlocksPanel
          onBlockDrop(item.block, sectionId, blockIndex);
        } else if (item.blockId && item.index !== undefined) {
          // Moved block from canvas
          // This will be handled by a different handler
          return;
        }
      },
      collect: (monitor) => ({
        isOver: !!monitor.isOver(),
        canDrop: !!monitor.canDrop(),
      }),
    }),
    [sectionId, blockIndex, onBlockDrop],
  );

  return (
    <div
      ref={drop}
      className={cn(
        "relative transition-all",
        isOver && canDrop && "ring-2 ring-valasys-orange bg-orange-50",
        className,
      )}
    >
      {showPlaceholder && !children && isOver && canDrop && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="flex flex-col items-center gap-2 text-valasys-orange">
            <Plus className="w-6 h-6" />
            <span className="text-sm font-medium">Drop block here</span>
          </div>
        </div>
      )}

      {children ? (
        children
      ) : (
        <div className={cn(
          "min-h-32 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center transition-colors",
          isOver && canDrop && "border-valasys-orange bg-orange-50",
        )}>
          <div className="text-center text-gray-400">
            <Plus className="w-6 h-6 mx-auto mb-2 opacity-50" />
            <p className="text-sm">Drop a block here</p>
          </div>
        </div>
      )}
    </div>
  );
};
