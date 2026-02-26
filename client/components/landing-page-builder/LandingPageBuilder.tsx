import React, { useState, useEffect } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { ChevronLeft, Save, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { LandingPage, LandingPageBlock } from "./types";
import {
  getLandingPagesFromLocalStorage,
  saveLandingPageToLocalStorage,
  createHeaderBlock,
  createHeroBlock,
  createFeaturesBlock,
  createTestimonialsBlock,
  createAboutBlock,
  createContactFormBlock,
  createFooterBlock,
} from "./utils";
import { DraggableLandingPagePreview } from "./DraggableLandingPagePreview";
import { BlocksPanel } from "./BlocksPanel";
import { SectionsPanel } from "./SectionsPanel";
import { LandingPageSettingsPanel } from "./LandingPageSettingsPanel";
import { LandingPagePreviewMode } from "./LandingPagePreviewMode";
import { ElementContentPanel } from "./ElementContentPanel";

interface LandingPageBuilderProps {
  pageId?: string;
  onBack: () => void;
}

export const LandingPageBuilder: React.FC<LandingPageBuilderProps> = ({
  pageId,
  onBack,
}) => {
  const [page, setPage] = useState<LandingPage | null>(null);
  const [pageName, setPageName] = useState("");
  const [selectedBlockId, setSelectedBlockId] = useState<string | null>(null);
  const [selectedElement, setSelectedElement] = useState<"heading" | "subheading" | "button" | null>(null);
  const [selectedLinkIndex, setSelectedLinkIndex] = useState<number | null>(null);
  const [selectedLinkType, setSelectedLinkType] = useState<"navigation" | "quick" | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [isSectionsPanelOpen, setIsSectionsPanelOpen] = useState(false);
  const [previewMode, setPreviewMode] = useState(false);

  useEffect(() => {
    if (pageId) {
      const pages = getLandingPagesFromLocalStorage();
      const foundPage = pages.find((p) => p.id === pageId);
      if (foundPage) {
        setPage(foundPage);
        setPageName(foundPage.name);
      }
    } else {
      // Create a new page with no default blocks
      const newPage: LandingPage = {
        id: `lp-${Date.now()}`,
        name: "Untitled Landing Page",
        description: "A new landing page",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        blocks: [],
      };
      setPage(newPage);
      setPageName(newPage.name);
    }
  }, [pageId]);

  const handleAddBlock = (block: LandingPageBlock) => {
    if (!page) return;

    setPage({
      ...page,
      blocks: [...page.blocks, block],
    });
  };

  const handleUpdateBlock = (
    blockId: string,
    properties: Record<string, any>,
  ) => {
    if (!page) return;

    const updatedBlocks = page.blocks.map((block) =>
      block.id === blockId ? { ...block, properties } : block,
    );

    setPage({
      ...page,
      blocks: updatedBlocks,
    });
  };

  const handleDeleteBlock = (blockId: string) => {
    if (!page) return;

    setPage({
      ...page,
      blocks: page.blocks.filter((block) => block.id !== blockId),
    });

    setSelectedBlockId(null);
    setSelectedElement(null);
  };

  const handleMoveBlock = (blockId: string, direction: "up" | "down") => {
    if (!page) return;

    const index = page.blocks.findIndex((b) => b.id === blockId);
    if (
      (direction === "up" && index === 0) ||
      (direction === "down" && index === page.blocks.length - 1)
    ) {
      return;
    }

    const newBlocks = [...page.blocks];
    const targetIndex = direction === "up" ? index - 1 : index + 1;
    [newBlocks[index], newBlocks[targetIndex]] = [
      newBlocks[targetIndex],
      newBlocks[index],
    ];

    setPage({
      ...page,
      blocks: newBlocks,
    });
  };

  const handleDuplicateBlock = (blockId: string) => {
    if (!page) return;

    const blockToClone = page.blocks.find((b) => b.id === blockId);
    if (!blockToClone) return;

    const duplicatedBlock: LandingPageBlock = {
      ...JSON.parse(JSON.stringify(blockToClone)),
      id: `block-${Date.now()}`,
    };

    const blockIndex = page.blocks.findIndex((b) => b.id === blockId);
    const newBlocks = [...page.blocks];
    newBlocks.splice(blockIndex + 1, 0, duplicatedBlock);

    setPage({
      ...page,
      blocks: newBlocks,
    });
  };

  const handleReorderBlocks = (reorderedBlocks: LandingPageBlock[]) => {
    if (!page) return;

    setPage({
      ...page,
      blocks: reorderedBlocks,
    });
  };

  const handleAddBlockAtIndex = (blockIndex: number, block: LandingPageBlock) => {
    if (!page) return;

    const newBlocks = [...page.blocks];
    newBlocks.splice(blockIndex, 0, block);

    setPage({
      ...page,
      blocks: newBlocks,
    });
  };

  const handleSelectTemplate = (blocks: LandingPageBlock[]) => {
    if (!page) return;

    // Add all blocks from the template to the page at once
    setPage({
      ...page,
      blocks: [...page.blocks, ...blocks],
    });

    setIsSectionsPanelOpen(false);
  };

  const handleSave = async () => {
    if (!page) return;

    setIsSaving(true);
    try {
      const updatedPage = {
        ...page,
        name: pageName,
        updatedAt: new Date().toISOString(),
      };
      saveLandingPageToLocalStorage(updatedPage);
      setPage(updatedPage);
      // Show a success message (you can add toast notification here)
      setTimeout(() => {
        setIsSaving(false);
      }, 500);
    } catch (error) {
      console.error("Error saving landing page:", error);
      setIsSaving(false);
    }
  };

  const handleSaveAndExit = async () => {
    if (!page) return;

    setIsSaving(true);
    try {
      const updatedPage = {
        ...page,
        name: pageName,
        updatedAt: new Date().toISOString(),
      };
      saveLandingPageToLocalStorage(updatedPage);
      setPage(updatedPage);
      // Redirect back to templates list after save
      setTimeout(() => {
        setIsSaving(false);
        onBack();
      }, 500);
    } catch (error) {
      console.error("Error saving landing page:", error);
      setIsSaving(false);
    }
  };

  if (!page) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-gray-500">Loading...</div>
      </div>
    );
  }

  const selectedBlock =
    page.blocks.find((b) => b.id === selectedBlockId) || null;

  // If in preview mode, show the preview component
  if (previewMode) {
    return (
      <LandingPagePreviewMode
        page={page}
        onBack={() => setPreviewMode(false)}
      />
    );
  }

  return (
    <DndProvider backend={HTML5Backend}>
    <div className="flex h-screen bg-gray-100" style={{ transform: 'scale(0.8)', transformOrigin: 'top left', width: '125vw', height: '125vh' }}>
      {/* Left Sidebar - Blocks Panel */}
      <div className="w-[450px] bg-white border-r border-gray-200 overflow-hidden flex flex-col">
        <div className="sticky top-0 z-20 bg-white border-b border-gray-200 p-4">
          <Button
            variant="ghost"
            size="sm"
            className="w-full justify-start text-gray-600 hover:text-gray-900"
            onClick={() => {
              if (previewMode) {
                setPreviewMode(false);
              } else {
                onBack();
              }
            }}
          >
            <ChevronLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
        </div>
        <BlocksPanel
          onAddBlock={handleAddBlock}
          onOpenSectionsPanel={() => setIsSectionsPanelOpen(true)}
        />
      </div>

      {/* Middle - Sections Panel (conditional) */}
      {isSectionsPanelOpen && (
        <div className="w-[420px] bg-white border-r border-gray-200 overflow-hidden flex flex-col">
          <SectionsPanel
            onSelectTemplate={handleSelectTemplate}
            onBack={() => setIsSectionsPanelOpen(false)}
          />
        </div>
      )}

      {/* Center - Main Editor Area */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
          <div className="flex-1">
            <Input
              value={pageName}
              onChange={(e) => setPageName(e.target.value)}
              placeholder="Landing Page Title"
              className="text-lg font-semibold border-0 focus-visible:ring-0 px-0"
            />
          </div>
          <div className="flex gap-2">
            <Button
              variant={previewMode ? "default" : "outline"}
              size="sm"
              onClick={() => setPreviewMode(!previewMode)}
              className={previewMode ? "bg-valasys-orange text-white" : ""}
            >
              <Eye className="w-4 h-4 mr-2" />
              Preview
            </Button>
            <Button
              onClick={handleSave}
              disabled={isSaving}
              variant="outline"
              size="sm"
            >
              <Save className="w-4 h-4 mr-2" />
              {isSaving ? "Saving..." : "Save"}
            </Button>
            <Button
              onClick={handleSaveAndExit}
              disabled={isSaving}
              className="bg-valasys-orange hover:bg-orange-600"
            >
              <Save className="w-4 h-4 mr-2" />
              {isSaving ? "Saving..." : "Save & exit"}
            </Button>
          </div>
        </div>

        {/* Preview Area */}
        <div className="flex-1 overflow-y-auto bg-gray-50 p-4">
          <div>
            <DraggableLandingPagePreview
              page={page}
              selectedBlockId={selectedBlockId}
              selectedElement={selectedElement}
              onSelectBlock={(blockId) => {
                setSelectedBlockId(blockId);
                setSelectedElement(null);
                setSelectedLinkIndex(null);
                setSelectedLinkType(null);
              }}
              onElementSelect={setSelectedElement}
              onUpdateBlock={handleUpdateBlock}
              onDeleteBlock={handleDeleteBlock}
              onMoveBlock={handleMoveBlock}
              onDuplicateBlock={handleDuplicateBlock}
              onReorderBlocks={handleReorderBlocks}
              onAddBlock={handleAddBlockAtIndex}
              onLinkSelect={(blockId, linkIndex, linkType) => {
                setSelectedBlockId(blockId);
                setSelectedLinkIndex(linkIndex);
                setSelectedLinkType(linkType);
                setSelectedElement(null);
              }}
            />
          </div>
        </div>
      </div>

      {/* Right Sidebar - Settings or Content Panel */}
      <div className="w-[480px] bg-white border-l border-gray-200 overflow-hidden flex flex-col">
        {selectedElement ? (
          <ElementContentPanel
            block={selectedBlock}
            selectedElement={selectedElement}
            onElementSelect={() => {
              setSelectedElement(null);
            }}
            onBlockUpdate={handleUpdateBlock}
            blockId={selectedBlockId || undefined}
          />
        ) : (
          <LandingPageSettingsPanel
            block={selectedBlock}
            blockId={selectedBlockId || undefined}
            selectedElement={selectedElement}
            onElementSelect={setSelectedElement}
            onBlockUpdate={handleUpdateBlock}
            onBlockDelete={
              selectedBlockId ? () => handleDeleteBlock(selectedBlockId) : undefined
            }
            selectedLinkIndex={selectedLinkIndex}
            selectedLinkType={selectedLinkType}
            onLinkSelect={(index, type) => {
              setSelectedLinkIndex(index);
              setSelectedLinkType(type);
            }}
          />
        )}
      </div>
    </div>
    </DndProvider>
  );
};
