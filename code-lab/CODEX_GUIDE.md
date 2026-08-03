# 🤖 Codex / ChatGPT Daily Automation Guide — Code Lab Next.js

This document provides complete instructions, architecture rules, file schemas, and code templates for **Codex / ChatGPT** automated daily runs.

---

## 🎯 Purpose & Workflow Overview

Every morning, an automated cron trigger invokes Codex/ChatGPT to:
1. Search and discover the latest Next.js 14/15 feature, RFC update, or ecosystem pattern.
2. Formulate code examples with sample data, architectural usage guides, and key highlights.
3. Add or update the topic in the codebase **without breaking any existing topics or components**.
4. Update `data/automation-run.json` with the latest timestamp, recent entry details, and execution timeline.
5. Verify the changes via `npm run build` before pushing/re-deploying to Vercel.

---

## 📁 Repository Structure Map

```text
code-lab/
├── app/
│   ├── CodeLabApp.tsx            # Main layout wrapper
│   ├── globals.css               # Theme resets & scrollbars
│   ├── layout.tsx                # Metadata & root layout
│   └── page.tsx                  # SPA entry point with CodeLabProvider
├── components/
│   ├── Sidebar/                  # Side nav tab list & mobile drawer
│   ├── Header/                   # Top breadcrumb & last run date badge
│   ├── HomeView/                 # Dashboard view (4 stat cards, recent entry, timeline, grid)
│   ├── TopicView/                # Topic details, multi-file code viewer, docs, and sandbox
│   ├── CodeBlock/                # Multi-file tabbed code block with copy action
│   └── Toast/                    # Copy feedback notifications
├── context/
│   └── CodeLabContext.tsx        # React Context (activeTab, search, bookmarks, toast)
├── data/
│   ├── automation-run.json       # 🌟 Source of truth for automated run date & recent entry
│   └── topicsData.ts             # 🌟 Topics map, documentation, code files, category counts
├── CODEX_GUIDE.md                # 📘 This instruction manual
```

---

## 📋 Data Contract & Schemas

### 1. `data/automation-run.json` Schema

Codex **MUST** update this file on every automated run:

```json
{
  "lastRunTimeISO": "2026-08-12T08:15:00Z",
  "lastRunTimeFormatted": "August 12, 2026 • 8:15 AM",
  "automationStatus": "Active",
  "scheduleCron": "Runs daily at 7:30 AM",
  "nextRun": "Tomorrow 7:30 AM",
  "recentEntry": {
    "title": "Next.js Topic Title",
    "category": "App Router",
    "filesCount": 3,
    "description": "Short 1-2 sentence description of the entry.",
    "highlights": [
      "Highlight line 1",
      "Highlight line 2",
      "Highlight line 3",
      "Highlight line 4"
    ],
    "targetTab": "app-router"
  },
  "automationSteps": [
    { "time": "7:30 AM", "title": "Research & Discovery", "desc": "Scanned Next.js updates", "status": "completed" },
    { "time": "7:40 AM", "title": "Topic Selected", "desc": "Selected topic name", "status": "completed" },
    { "time": "7:50 AM", "title": "Code Generation", "desc": "Example implementation created", "status": "completed" },
    { "time": "8:05 AM", "title": "Validation", "desc": "Lint, type-check, and build passed", "status": "completed" },
    { "time": "8:10 AM", "title": "Documentation", "desc": "Usage guide generated", "status": "completed" },
    { "time": "8:15 AM", "title": "Completed", "desc": "Example added to repository", "status": "completed" }
  ]
}
```

---

## 🛠️ Step-by-Step Execution Guide for Codex

### Step 1: Update `data/automation-run.json`
- Replace `lastRunTimeISO` with current ISO timestamp.
- Replace `lastRunTimeFormatted` with formatted string (e.g. `"August 13, 2026 • 8:15 AM"`).
- Update `recentEntry` block with details of the new topic.

---

### Step 2: (If adding a NEW tab) Update `context/CodeLabContext.tsx`
If creating a new sidebar tab key (e.g. `"server-actions-v2"`):
1. Add the string literal to `TabType` in `context/CodeLabContext.tsx`:
   ```typescript
   export type TabType =
     | "home"
     | "app-router"
     | "new-topic-id" // <-- Add new tab key here
     | ...;
   ```

---

### Step 3: Update `data/topicsData.ts`

#### A. Add to `TOPIC_CATEGORIES` list (if new category):
```typescript
{ id: "new-topic-id", label: "Display Name", count: 4, iconName: "Zap" },
```

#### B. Add entry to `TOPICS_DATA` record:
```typescript
"new-topic-id": {
  id: "new-topic-id",
  title: "Full Topic Title",
  category: "Category Name",
  badge: "Feature Badge",
  exampleCount: 4,
  description: "Comprehensive description of the feature or pattern.",
  keyHighlights: [
    "Key highlight 1",
    "Key highlight 2",
    "Key highlight 3",
    "Key highlight 4"
  ],
  documentation: {
    overview: "In-depth explanation of how this works in Next.js...",
    bestPractices: [
      "Best practice 1",
      "Best practice 2"
    ],
    useCases: [
      "Use case 1",
      "Use case 2"
    ]
  },
  files: [
    {
      filename: "app/example/page.tsx",
      language: "typescript",
      code: `// Realistic Next.js 14+ code snippet`
    }
  ]
}
```

---

### Step 4: Validate Build Safety

Run the build command to ensure zero compilation or type errors:
```bash
npm run build
```

---

## 🚨 Critical Rules for Codex
1. **Zero UI Breaks**: Never delete existing keys in `TOPICS_DATA` or `TOPIC_CATEGORIES`. Only append or update entries.
2. **Pure SPA**: Do NOT add server-side `fetch()` dependencies, database connections, or secret tokens. All data must remain embedded in standard TypeScript objects or client components.
3. **Use CSS Modules**: If adding new UI components, always create accompanying `*.module.css` files.
4. **Icons**: Use existing `lucide-react` icon names mapped in `Sidebar.tsx` and `HomeView.tsx` (e.g. `FolderTree`, `Cpu`, `Zap`, `GitFork`, `Download`, `RefreshCw`, `Shield`, `Lock`, `Palette`, `FileText`, `Code2`, `ListOrdered`, `Search`, `Repeat`, `Gauge`, `Server`, `TestTube`).
