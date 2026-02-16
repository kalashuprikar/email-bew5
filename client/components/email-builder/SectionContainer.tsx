import React, { useState } from "react";
import { useDrag, useDrop } from "react-dnd";
import { cn } from "@/lib/utils";
import { EmailSection, ContentBlock } from "./types";
import { DraggableBlock } from "./DraggableBlock";
import { SectionDropZone } from "./SectionDropZone";
import { GripVertical, Trash2, Copy, Settings, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";

interface SectionContainerProps {
  section: EmailSection;
  sectionIndex: number;
  selectedBlockId: string | null;
  editingBlockId: string | null;
  selectedFooterElement?: string | null;
  onBlockUpdate: (block: ContentBlock) => void;
  onBlockSelect: (id: string) => void;
  onEditingBlockChange?: (id: string | null) => void;
  onFooterElementSelect?: (element: string | null) => void;
  onBlockDrop: (block: ContentBlock, sectionId: string, position?: number) => void;
  onBlockMove: (blockId: string, fromSectionId: string, toSectionId: string, position: number) => void;
  onMoveBlockWithinSection: (blockIndex: number, hoverIndex: number, sectionId: string) => void;
  onDuplicateBlock: (block: ContentBlock, sectionId: string, position: number) => void;
  onDeleteBlock: (blockId: string, sectionId: string) => void;
  onDeleteSection: (sectionId: string) => void;
  onSectionUpdate: (section: EmailSection) => void;
}

export const SectionContainer: React.FC<SectionContainerProps> = ({
  section,
  sectionIndex,
  selectedBlockId,
  editingBlockId,
  selectedFooterElement,
  onBlockUpdate,
  onBlockSelect,
  onEditingBlockChange,
  onFooterElementSelect,
  onBlockDrop,
  onMoveBlockWithinSection,
  onDuplicateBlock,
  onDeleteBlock,
  onDeleteSection,
  onSectionUpdate,
}) => {
  const [isExpanded, setIsExpanded] = useState(true);
  const [isHovering, setIsHovering] = useState(false);

  const [{ isDragging }, drag] = useDrag(
    () => ({
      type: "section",
      item: () => ({ sectionId: section.id, sectionIndex }),
      collect: (monitor) => ({
        isDragging: !!monitor.isDragging(),
      }),
    }),
    [section.id, sectionIndex],
  );

  const [{ isOver }, drop] = useDrop(
    () => ({
      accept: "section",
      hover: (item: any) => {
        // Can add section reordering here if needed
      },
      collect: (monitor) => ({
        isOver: !!monitor.isOver(),
      }),
    }),
    [],
  );

  const sectionRef = React.useRef<HTMLDivElement>(null);
  drop(sectionRef);

  return (
    <div
      ref={sectionRef}
      className={cn(
        "bg-white border border-gray-200 rounded-lg overflow-hidden transition-all",
        isDragging && "opacity-50",
        isOver && "ring-2 ring-valasys-orange",
        isHovering && "shadow-md",
      )}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      {/* Section Header */}
      <div className="flex items-center justify-between px-4 py-3 bg-gray-50 border-b border-gray-200">
        <div className="flex items-center gap-3">
          <button
            ref={drag}
            className="p-1 text-gray-400 hover:text-gray-600 cursor-move"
            title="Drag to reorder section"
          >
            <GripVertical className="w-4 h-4" />
          </button>
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="p-1 text-gray-600 hover:bg-white rounded transition-colors"
            title={isExpanded ? "Collapse section" : "Expand section"}
          >
            <ChevronDown
              className={cn("w-4 h-4 transition-transform", !isExpanded && "-rotate-90")}
            />
          </button>
          <div>
            <h3 className="font-medium text-gray-900 text-sm">{section.name || "Section"}</h3>
            <p className="text-xs text-gray-500">{section.blocks.length} block(s)</p>
          </div>
        </div>

        {isHovering && (
          <div className="flex gap-1">
            <Button
              variant="ghost"
              size="sm"
              className="h-8 w-8 p-0 hover:bg-gray-200"
              title="Section settings"
            >
              <Settings className="w-4 h-4 text-gray-600" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="h-8 w-8 p-0 hover:bg-red-50"
              onClick={() => onDeleteSection(section.id)}
              title="Delete section"
            >
              <Trash2 className="w-4 h-4 text-red-600" />
            </Button>
          </div>
        )}
      </div>

      {/* Section Content */}
      {isExpanded && (
        <div className="p-4 space-y-3">
          {section.blocks.length === 0 ? (
            <SectionDropZone
              sectionId={section.id}
              onBlockDrop={onBlockDrop}
              showPlaceholder={true}
            />
          ) : (
            <>
              {section.blocks.map((block, blockIndex) => (
                <div key={block.id}>
                  {/* Drop zone before block */}
                  <SectionDropZone
                    sectionId={section.id}
                    blockIndex={blockIndex}
                    onBlockDrop={onBlockDrop}
                    showPlaceholder={false}
                    className="h-1 mb-2"
                  />

                  {/* Block */}
                  <DraggableBlock
                    block={block}
                    index={blockIndex}
                    totalBlocks={section.blocks.length}
                    isSelected={selectedBlockId === block.id}
                    isEditing={editingBlockId === block.id}
                    selectedFooterElement={selectedFooterElement}
                    onBlockUpdate={onBlockUpdate}
                    onBlockSelect={onBlockSelect}
                    onEditingBlockChange={onEditingBlockChange}
                    onFooterElementSelect={onFooterElementSelect}
                    onMoveBlock={(dragIndex, hoverIndex) =>
                      onMoveBlockWithinSection(dragIndex, hoverIndex, section.id)
                    }
                    onAddBlock={(newBlock, position) =>
                      onBlockDrop(newBlock, section.id, position)
                    }
                    onDuplicate={(dupBlock, position) =>
                      onDuplicateBlock(dupBlock, section.id, position)
                    }
                    onDelete={(blockId) => onDeleteBlock(blockId, section.id)}
                  />
                </div>
              ))}

              {/* Drop zone after last block */}
              <SectionDropZone
                sectionId={section.id}
                blockIndex={section.blocks.length}
                onBlockDrop={onBlockDrop}
                showPlaceholder={false}
                className="h-1 mt-2"
              />
            </>
          )}
        </div>
      )}
    </div>
  );
};
