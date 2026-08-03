"use client";

import React, { useState } from "react";
import styles from "./TopicView.module.css";
import { useCodeLab } from "@/context/CodeLabContext";
import { TOPICS_DATA } from "@/data/topicsData";
import CodeBlock from "@/components/CodeBlock/CodeBlock";
import InteractiveWidget from "./InteractiveWidget";
import {
  ArrowLeft,
  Bookmark,
  CheckCircle2,
  Code,
  BookOpen,
  PlayCircle,
  FolderTree,
  Cpu,
  Zap,
  GitFork,
  Download,
  RefreshCw,
  Shield,
  Lock,
  Palette,
  FileText,
  Code2,
  ListOrdered,
  Search,
  Repeat,
  Gauge,
  Server,
  TestTube,
} from "lucide-react";

const TOPIC_ICON_MAP: Record<string, React.ElementType> = {
  FolderTree,
  Cpu,
  Zap,
  GitFork,
  Download,
  RefreshCw,
  Shield,
  Lock,
  Palette,
  FileText,
  Code2,
  ListOrdered,
  Search,
  Repeat,
  Gauge,
  Server,
  TestTube,
};

export default function TopicView() {
  const { activeTab, setActiveTab, bookmarks, toggleBookmark } = useCodeLab();
  const [subTab, setSubTab] = useState<"code" | "docs" | "demo">("code");

  const topic = TOPICS_DATA[activeTab];

  if (!topic) {
    return (
      <div className={styles.container}>
        <div className={styles.topBar}>
          <button className={styles.backBtn} onClick={() => setActiveTab("home")}>
            <ArrowLeft size={16} />
            <span>Back to Home</span>
          </button>
        </div>
        <div className="p-8 text-center bg-white border rounded-xl">
          <h2 className="text-xl font-bold text-slate-800">Topic Not Found</h2>
          <p className="text-slate-500 mt-2">
            The requested topic &quot;{activeTab}&quot; is currently unavailable.
          </p>
        </div>
      </div>
    );
  }

  const isBookmarked = bookmarks.includes(topic.id);
  const IconComp = TOPIC_ICON_MAP[topic.id] || Code2;

  return (
    <div className={styles.container}>
      {/* Top Bar Navigation */}
      <div className={styles.topBar}>
        <button className={styles.backBtn} onClick={() => setActiveTab("home")}>
          <ArrowLeft size={16} />
          <span>Back to Home</span>
        </button>
      </div>

      {/* Main Header Card */}
      <div className={styles.headerCard}>
        <div className={styles.titleRow}>
          <div className={styles.titleLeft}>
            <div className={styles.topicIconBox}>
              <IconComp size={24} />
            </div>
            <div>
              <h1 className={styles.topicTitleText}>{topic.title}</h1>
              <div className={styles.badgeGroup}>
                <span className={styles.categoryBadge}>{topic.category}</span>
                <span className={styles.featureBadge}>{topic.badge}</span>
                <span className="text-xs text-slate-500 font-medium">
                  {topic.exampleCount} Code Examples
                </span>
              </div>
            </div>
          </div>

          <div className={styles.actionBtns}>
            <button
              onClick={() => toggleBookmark(topic.id)}
              className={`${styles.bookmarkBtn} ${
                isBookmarked ? styles.bookmarked : ""
              }`}
            >
              <Bookmark size={16} fill={isBookmarked ? "currentColor" : "none"} />
              <span>{isBookmarked ? "Saved" : "Save Bookmark"}</span>
            </button>
          </div>
        </div>

        <p className={styles.description}>{topic.description}</p>
      </div>

      {/* Sub Tabs Bar */}
      <div className={styles.subTabsRow}>
        <button
          onClick={() => setSubTab("code")}
          className={`${styles.subTabBtn} ${
            subTab === "code" ? styles.subTabActive : ""
          }`}
        >
          <Code size={16} />
          <span>Code & Specs</span>
        </button>

        <button
          onClick={() => setSubTab("docs")}
          className={`${styles.subTabBtn} ${
            subTab === "docs" ? styles.subTabActive : ""
          }`}
        >
          <BookOpen size={16} />
          <span>Documentation</span>
        </button>

        <button
          onClick={() => setSubTab("demo")}
          className={`${styles.subTabBtn} ${
            subTab === "demo" ? styles.subTabActive : ""
          }`}
        >
          <PlayCircle size={16} />
          <span>Interactive Sandbox</span>
        </button>
      </div>

      {/* View Content based on Sub-Tab */}
      {subTab === "code" && (
        <div className={styles.contentGrid}>
          {/* Multi-file Code Block */}
          <div>
            <CodeBlock files={topic.files} />
          </div>

          {/* Key Highlights Sidebar Card */}
          <div className={styles.highlightsCard}>
            <h3 className={styles.cardTitle}>Key Highlights</h3>
            <div className={styles.highlightsList}>
              {topic.keyHighlights.map((hl, idx) => (
                <div key={idx} className={styles.checkItem}>
                  <CheckCircle2 size={16} className={styles.checkIcon} />
                  <span>{hl}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {subTab === "docs" && (
        <div className={styles.docContainer}>
          <div className={styles.docSection}>
            <h2 className={styles.docHeading}>Architecture Overview</h2>
            <p className={styles.docParagraph}>{topic.documentation.overview}</p>
          </div>

          <div className={styles.docSection}>
            <h2 className={styles.docHeading}>Best Practices</h2>
            <div className={styles.bulletList}>
              {topic.documentation.bestPractices.map((bp, idx) => (
                <div key={idx} className={styles.bulletItem}>
                  • {bp}
                </div>
              ))}
            </div>
          </div>

          <div className={styles.docSection}>
            <h2 className={styles.docHeading}>Common Use Cases</h2>
            <div className={styles.bulletList}>
              {topic.documentation.useCases.map((uc, idx) => (
                <div key={idx} className={styles.bulletItem}>
                  • {uc}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {subTab === "demo" && <InteractiveWidget topicId={topic.id} />}
    </div>
  );
}
