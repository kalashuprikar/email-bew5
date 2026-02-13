import React, { useState } from "react";
import { Copy, Trash2 } from "lucide-react";
import { FooterWithContactBlock } from "../types";

interface FooterWithContactBlockComponentProps {
  block: FooterWithContactBlock;
  isSelected: boolean;
  selectedElement?: string | null;
  onContentChange: (field: string, value: any) => void;
  onElementSelect?: (element: string) => void;
  onBlockSelect?: (blockId: string) => void;
  blockIndex?: number;
}

export const FooterWithContactBlockComponent: React.FC<
  FooterWithContactBlockComponentProps
> = ({
  block,
  isSelected,
  selectedElement,
  onContentChange,
  onElementSelect,
  onBlockSelect,
  blockIndex = 0,
}) => {
  const [hoveredSection, setHoveredSection] = useState<string | null>(null);
  const [sectionDuplicates, setSectionDuplicates] = useState<{ [key: string]: any[] }>({});

  const handleFieldChange = (
    field: keyof typeof block,
    subField: string,
    value: string,
  ) => {
    const fieldValue = block[field];
    const updatedField = { ...(fieldValue as any), [subField]: value };
    onContentChange(field, updatedField);
  };

  const handleElementSelect = (element: string) => {
    if (onBlockSelect) {
      onBlockSelect(block.id);
    }
    onElementSelect?.(element);
  };

  const handleCopySection = (sectionType: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const fieldValue = block[sectionType as keyof typeof block];
    const duplicatedValue = { ...(fieldValue as any) };
    
    setSectionDuplicates(prev => ({
      ...prev,
      [sectionType]: [...(prev[sectionType] || []), duplicatedValue]
    }));
  };

  const handleDeleteDuplicate = (sectionType: string, index: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setSectionDuplicates(prev => ({
      ...prev,
      [sectionType]: prev[sectionType]?.filter((_, i) => i !== index) || []
    }));
  };

  const handleDeleteSection = (sectionType: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const fieldValue = block[sectionType as keyof typeof block];
    const resetValue = { ...(fieldValue as any) };

    if ("content" in resetValue) {
      resetValue.content = "";
    } else if ("text" in resetValue) {
      resetValue.text = "";
    }

    onContentChange(sectionType, resetValue);
  };

  const handleDuplicateChange = (sectionType: string, index: number, field: string, value: string) => {
    setSectionDuplicates(prev => {
      const updated = [...(prev[sectionType] || [])];
      updated[index] = { ...updated[index], [field]: value };
      return { ...prev, [sectionType]: updated };
    });
  };

  const renderSection = (label: string, sectionType: string, section: any, isTextarea: boolean = false, alignment: string = "left") => {
    const content = section.content || section.text || "";
    
    return (
      <>
        {content && (
          <div
            className={`cursor-pointer rounded p-2 transition-all relative ${
              selectedElement === sectionType
                ? "border-2 border-valasys-orange"
                : hoveredSection === sectionType
                  ? "border-2 border-dashed border-valasys-orange"
                  : ""
            }`}
            onMouseEnter={() => setHoveredSection(sectionType)}
            onMouseLeave={() => setHoveredSection(null)}
            onClick={(e) => {
              e.stopPropagation();
              handleElementSelect(sectionType);
            }}
          >
            {selectedElement === sectionType ? (
              isTextarea ? (
                <textarea
                  value={content}
                  onChange={(e) =>
                    handleFieldChange(sectionType as keyof typeof block, "content", e.target.value)
                  }
                  autoFocus
                  className="w-full rounded px-2 py-1 text-center outline-none"
                  style={{
                    fontSize: `${section.fontSize}px`,
                    fontWeight: section.fontWeight,
                    color: section.fontColor,
                  }}
                  rows={2}
                />
              ) : (
                <input
                  type="text"
                  value={content}
                  onChange={(e) =>
                    handleFieldChange(sectionType as keyof typeof block, section.content ? "content" : "text", e.target.value)
                  }
                  autoFocus
                  className="w-full rounded px-2 py-1 text-center outline-none"
                  style={{
                    fontSize: `${section.fontSize}px`,
                    fontWeight: section.fontWeight,
                    color: section.fontColor,
                  }}
                />
              )
            ) : (
              <p
                style={{
                  fontSize: `${section.fontSize}px`,
                  fontWeight: section.fontWeight,
                  color: section.fontColor,
                  fontFamily: section.fontFamily || "inherit",
                  fontStyle: section.fontStyle || "normal",
                  margin: 0,
                  padding: `${section.padding}px`,
                  textAlign: alignment as any,
                }}
              >
                {content}
              </p>
            )}
            {selectedElement === sectionType && (
              <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 z-50 flex items-center gap-1 bg-white rounded-full px-2 py-1 shadow-lg">
                <button
                  onClick={(e) => handleCopySection(sectionType, e)}
                  title="Copy section"
                  className="p-1.5 text-gray-700 hover:text-orange-600 hover:bg-orange-50 rounded transition-colors"
                >
                  <Copy className="w-4 h-4" />
                </button>
                <button
                  onClick={(e) => handleDeleteSection(sectionType, e)}
                  title="Delete section"
                  className="p-1.5 text-gray-700 hover:text-red-600 hover:bg-red-50 rounded transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>
        )}

        {/* Duplicate Sections */}
        {sectionDuplicates[sectionType]?.map((duplicate, dupIndex) => (
          <div
            key={`${sectionType}-dup-${dupIndex}`}
            className={`cursor-pointer rounded p-2 transition-all relative border-2 border-dashed border-valasys-orange`}
            onMouseEnter={() => setHoveredSection(`${sectionType}-dup-${dupIndex}`)}
            onMouseLeave={() => setHoveredSection(null)}
            onClick={(e) => {
              e.stopPropagation();
              handleElementSelect(`${sectionType}-dup-${dupIndex}`);
            }}
          >
            {selectedElement === `${sectionType}-dup-${dupIndex}` ? (
              isTextarea ? (
                <textarea
                  value={duplicate.content || duplicate.text || ""}
                  onChange={(e) =>
                    handleDuplicateChange(sectionType, dupIndex, duplicate.content ? "content" : "text", e.target.value)
                  }
                  autoFocus
                  className="w-full rounded px-2 py-1 text-center outline-none"
                  style={{
                    fontSize: `${duplicate.fontSize}px`,
                    fontWeight: duplicate.fontWeight,
                    color: duplicate.fontColor,
                  }}
                  rows={2}
                />
              ) : (
                <input
                  type="text"
                  value={duplicate.content || duplicate.text || ""}
                  onChange={(e) =>
                    handleDuplicateChange(sectionType, dupIndex, duplicate.content ? "content" : "text", e.target.value)
                  }
                  autoFocus
                  className="w-full rounded px-2 py-1 text-center outline-none"
                  style={{
                    fontSize: `${duplicate.fontSize}px`,
                    fontWeight: duplicate.fontWeight,
                    color: duplicate.fontColor,
                  }}
                />
              )
            ) : (
              <p
                style={{
                  fontSize: `${duplicate.fontSize}px`,
                  fontWeight: duplicate.fontWeight,
                  color: duplicate.fontColor,
                  fontFamily: duplicate.fontFamily || "inherit",
                  fontStyle: duplicate.fontStyle || "normal",
                  margin: 0,
                  padding: `${duplicate.padding}px`,
                  textAlign: alignment as any,
                }}
              >
                {duplicate.content || duplicate.text || ""}
              </p>
            )}
            {selectedElement === `${sectionType}-dup-${dupIndex}` && (
              <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 z-50 flex items-center gap-1 bg-white rounded-full px-2 py-1 shadow-lg">
                <button
                  onClick={(e) => handleCopySection(sectionType, e)}
                  title="Copy section"
                  className="p-1.5 text-gray-700 hover:text-orange-600 hover:bg-orange-50 rounded transition-colors"
                >
                  <Copy className="w-4 h-4" />
                </button>
                <button
                  onClick={(e) => handleDeleteDuplicate(sectionType, dupIndex, e)}
                  title="Delete section"
                  className="p-1.5 text-gray-700 hover:text-red-600 hover:bg-red-50 rounded transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>
        ))}
      </>
    );
  };

  return (
    <footer
      className={`transition-all ${isSelected ? "ring-2 ring-valasys-orange" : ""}`}
      style={{
        backgroundColor: block.backgroundColor,
        padding: `${block.padding}px`,
      }}
    >
      <div className="flex gap-8 mb-4">
        {/* Left Column */}
        <div className="flex-1">
          {renderSection("Enterprise Name", "enterpriseName", block.enterpriseName, false, "left")}
          {renderSection("Address", "address", block.address, true, "left")}
        </div>

        {/* Right Column */}
        <div className="flex-1">
          {renderSection("Privacy Links", "privacyLinks", block.privacyLinks, false, "right")}
          {renderSection("Email", "email", block.email, false, "right")}
          {renderSection("Phone", "phone", block.phone, false, "right")}
        </div>
      </div>

      {/* Unsubscribe Link */}
      <div className="border-t pt-4">
        {renderSection("Unsubscribe", "unsubscribeLink", block.unsubscribeLink, false, "center")}
      </div>
    </footer>
  );
};
