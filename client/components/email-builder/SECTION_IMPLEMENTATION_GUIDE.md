# Email Template Builder - Section-Based Drag-and-Drop Implementation Guide

## Overview

This guide explains how the new section-based drag-and-drop functionality works in the email template builder. This feature allows users to organize blocks into sections and drag blocks into specific sections with precise positioning.

## Architecture

### New Components

#### 1. **SectionDropZone** (`SectionDropZone.tsx`)
A drop zone component that accepts block drops into a specific section at a specific position.

**Key Features:**
- Accepts "block" items from the BlocksPanel
- Shows visual feedback when hovering over the drop zone
- Handles block drop events and calls the appropriate handler
- Can be used before, after, or within block lists

```tsx
<SectionDropZone
  sectionId={section.id}
  blockIndex={position}
  onBlockDrop={handleBlockDrop}
  showPlaceholder={true}
/>
```

#### 2. **SectionContainer** (`SectionContainer.tsx`)
Renders a section with its nested blocks and manages drop zones between blocks.

**Key Features:**
- Displays section header with collapsible content
- Shows drag handle for reordering sections
- Renders blocks within the section
- Has drop zones between each block for precise positioning
- Supports block selection, editing, duplication, and deletion

```tsx
<SectionContainer
  section={emailSection}
  sectionIndex={0}
  selectedBlockId={selectedBlockId}
  editingBlockId={editingBlockId}
  onBlockDrop={handleBlockDrop}
  onBlockUpdate={handleBlockUpdate}
  onDeleteSection={handleDeleteSection}
  // ... other props
/>
```

#### 3. **SectionsRenderer** (`SectionsRenderer.tsx`)
Renders all sections in the email template and provides the "Add Section" button.

**Key Features:**
- Renders each section using SectionContainer
- Handles section-level operations
- Shows empty state when no sections exist
- Provides "Add Section" button

### Data Structure

#### EmailSection Interface
```typescript
interface EmailSection {
  id: string;
  name: string;
  blocks: ContentBlock[];
  backgroundColor: string;
  padding: number;
  margin: number;
  borderWidth: number;
  borderColor: string;
  borderRadius: number;
  minHeight?: number;
}
```

#### Updated EmailTemplate Interface
```typescript
interface EmailTemplate {
  // ... existing fields
  blocks?: ContentBlock[];        // For backward compatibility
  sections?: EmailSection[];      // New section-based structure
  useSections?: boolean;          // Flag to use sections instead of blocks
}
```

## Usage

### 1. Converting to Section-Based Template

To enable sections in an email template:

```typescript
// Create a new template with sections
const template = createEmptyTemplate();

// Add a section
const section = createEmptySection("Header");
const templateWithSection = addSectionToTemplate(template, section);

// Set the template to use sections
templateWithSection.useSections = true;
```

### 2. Adding Blocks to Sections

Blocks can be added to sections in several ways:

#### Via Drag-and-Drop
Users can drag blocks from the BlocksPanel onto:
- An empty section
- Between existing blocks in a section
- At the end of a section

The `onBlockDropInSection` handler is called automatically.

#### Programmatically
```typescript
// Add a block to a section at a specific position
const updatedSection = addBlockToSection(section, newBlock, position);

// Or add it to the end
const updatedSection = addBlockToSection(section, newBlock);
```

### 3. Handler Functions

#### Section Operations

**Add Section:**
```typescript
const handleAddSection = () => {
  const newSection = createEmptySection("New Section");
  setTemplate(prev => addSectionToTemplate(prev, newSection));
};
```

**Delete Section:**
```typescript
const handleDeleteSection = (sectionId: string) => {
  setTemplate(prev => removeSectionFromTemplate(prev, sectionId));
};
```

**Update Section:**
```typescript
const handleUpdateSection = (section: EmailSection) => {
  setTemplate(prev => updateSectionInTemplate(prev, section));
};
```

#### Block Operations

**Drop Block into Section:**
```typescript
const handleBlockDropInSection = (
  block: ContentBlock,
  sectionId: string,
  position?: number
) => {
  setTemplate(prev => {
    const sections = [...(prev.sections || [])];
    const sectionIndex = sections.findIndex(s => s.id === sectionId);
    if (sectionIndex !== -1) {
      sections[sectionIndex] = addBlockToSection(
        sections[sectionIndex],
        block,
        position
      );
    }
    return {
      ...prev,
      sections,
      updatedAt: new Date().toISOString(),
    };
  });
};
```

**Update Block in Section:**
```typescript
const handleBlockUpdateInSection = (
  block: ContentBlock,
  sectionId: string
) => {
  setTemplate(prev => {
    const sections = [...(prev.sections || [])];
    const sectionIndex = sections.findIndex(s => s.id === sectionId);
    if (sectionIndex !== -1) {
      sections[sectionIndex] = updateBlockInSection(
        sections[sectionIndex],
        block
      );
    }
    return {
      ...prev,
      sections,
      updatedAt: new Date().toISOString(),
    };
  });
};
```

**Delete Block from Section:**
```typescript
const handleBlockDeleteInSection = (
  blockId: string,
  sectionId: string
) => {
  setTemplate(prev => {
    const sections = [...(prev.sections || [])];
    const sectionIndex = sections.findIndex(s => s.id === sectionId);
    if (sectionIndex !== -1) {
      sections[sectionIndex] = removeBlockFromSection(
        sections[sectionIndex],
        blockId
      );
    }
    return {
      ...prev,
      sections,
      updatedAt: new Date().toISOString(),
    };
  });
};
```

**Move Block Within Section:**
```typescript
const handleMoveBlockWithinSection = (
  blockIndex: number,
  hoverIndex: number,
  sectionId: string
) => {
  setTemplate(prev => {
    const sections = [...(prev.sections || [])];
    const sectionIndex = sections.findIndex(s => s.id === sectionId);
    if (sectionIndex !== -1) {
      sections[sectionIndex] = moveBlockWithinSection(
        sections[sectionIndex],
        blockIndex,
        hoverIndex
      );
    }
    return {
      ...prev,
      sections,
      updatedAt: new Date().toISOString(),
    };
  });
};
```

## Drag-and-Drop Flow

### 1. Block Drop from BlocksPanel to Section

```
User drags block from BlocksPanel
     ↓
Block hovers over SectionDropZone
     ↓
Visual feedback shown (ring-2 ring-valasys-orange)
     ↓
User releases mouse
     ↓
onBlockDropInSection() handler called
     ↓
Block added to section at specified position
     ↓
Template state updated
     ↓
Section re-renders with new block
```

### 2. Block Movement Within Section

```
User drags block within section
     ↓
onMoveBlockWithinSection() handler called
     ↓
Block index updated in section
     ↓
Section re-renders with new block order
```

## Backward Compatibility

The implementation maintains full backward compatibility with the existing block-based system:

- If `template.useSections` is `false` or not set, the renderer uses the classic block-based rendering
- The `template.blocks` array is still supported for non-section templates
- Existing code that doesn't use sections continues to work unchanged

## Visual Feedback

### Drop Zone States

**Empty Section:**
- Shows a dashed border with "Drop a block here" message
- Becomes highlighted when block hovers over it

**Between Blocks:**
- Shows a thin line separator
- Becomes highlighted with orange color on hover

**Hover State:**
- Displays `ring-2 ring-valasys-orange` border
- Background changes to `bg-orange-50`

## Utilities

All section-related utility functions are in `utils.ts`:

- `createEmptySection()` - Create a new section
- `addBlockToSection()` - Add a block to a section
- `removeBlockFromSection()` - Remove a block from a section
- `updateBlockInSection()` - Update a block in a section
- `moveBlockWithinSection()` - Reorder blocks within a section
- `addSectionToTemplate()` - Add a section to template
- `removeSectionFromTemplate()` - Remove a section from template
- `updateSectionInTemplate()` - Update a section in template
- `moveSectionInTemplate()` - Reorder sections in template

## Example Usage

### Complete Example: Adding a Section-Based Email

```typescript
// 1. Create template with sections
const template = {
  ...createEmptyTemplate(),
  useSections: true,
  sections: [
    {
      id: generateId(),
      name: "Header Section",
      blocks: [
        createTitleBlock("Welcome"),
        createTextBlock("Thanks for signing up!"),
      ],
      backgroundColor: "#ffffff",
      padding: 20,
      margin: 0,
      borderWidth: 0,
      borderColor: "#000000",
      borderRadius: 0,
    },
    {
      id: generateId(),
      name: "Content Section",
      blocks: [
        createImageBlock(),
        createButtonBlock(),
      ],
      backgroundColor: "#f5f5f5",
      padding: 20,
      margin: 10,
      borderWidth: 1,
      borderColor: "#ddd",
      borderRadius: 4,
    },
  ],
};

// 2. User drags a new block from BlocksPanel to Content Section
const handleBlockDrop = (block, sectionId, position) => {
  // Handler automatically adds block to section
  onBlockDropInSection(block, sectionId, position);
};

// 3. Result: Block is now in the specified section at the specified position
```

## Testing Checklist

- [ ] Drag block from BlocksPanel into empty section
- [ ] Drag block from BlocksPanel between existing blocks in section
- [ ] Drag block from BlocksPanel to the end of a section
- [ ] Reorder blocks within a section
- [ ] Duplicate blocks within a section
- [ ] Delete blocks from a section
- [ ] Delete entire section
- [ ] Create new section
- [ ] Drag blocks between sections
- [ ] Save and load template with sections
- [ ] Verify backward compatibility with non-section templates

## Future Enhancements

Possible improvements:

1. **Cross-Section Drag**: Allow dragging blocks between sections
2. **Section Templates**: Pre-designed section layouts
3. **Section Styling**: UI for customizing section styling
4. **Nested Sections**: Sections within sections
5. **Section Locking**: Prevent accidental section modifications
6. **Responsive Sections**: Different layouts for mobile/desktop
