import React from "react";
import { EmailTemplate, ContentBlock, EmailSection } from "./types";
import { SectionContainer } from "./SectionContainer";
import { SectionDropZone } from "./SectionDropZone";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

interface SectionsRendererProps {
  template: EmailTemplate;
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
  onAddSection: () => void;
}

export const SectionsRenderer: React.FC<SectionsRendererProps> = ({
  template,
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
  onAddSection,
}) => {
  const sections = template.sections || [];

  if (!template.useSections || sections.length === 0) {
    return null;
  }

  return (
    <div className="space-y-4">
      {sections.map((section, sectionIndex) => (
        <SectionContainer
          key={section.id}
          section={section}
          sectionIndex={sectionIndex}
          selectedBlockId={selectedBlockId}
          editingBlockId={editingBlockId}
          selectedFooterElement={selectedFooterElement}
          onBlockUpdate={onBlockUpdate}
          onBlockSelect={onBlockSelect}
          onEditingBlockChange={onEditingBlockChange}
          onFooterElementSelect={onFooterElementSelect}
          onBlockDrop={onBlockDrop}
          onMoveBlockWithinSection={onMoveBlockWithinSection}
          onDuplicateBlock={onDuplicateBlock}
          onDeleteBlock={onDeleteBlock}
          onDeleteSection={onDeleteSection}
          onSectionUpdate={onSectionUpdate}
        />
      ))}

      {/* Add new section button */}
      <div className="pt-4 border-t border-gray-200">
        <Button
          onClick={onAddSection}
          variant="outline"
          className="w-full gap-2 text-valasys-orange hover:text-valasys-orange"
        >
          <Plus className="w-4 h-4" />
          Add Section
        </Button>
      </div>
    </div>
  );
};
