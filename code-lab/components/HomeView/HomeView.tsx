"use client";

import React from "react";
import styles from "./HomeView.module.css";
import { useCodeLab } from "@/context/CodeLabContext";
import {
  TOPIC_CATEGORIES,
  RECENT_ENTRY,
  AUTOMATION_STEPS,
  LAST_RUN_METADATA,
} from "@/data/topicsData";
import {
  FileText,
  Code2,
  Clock,
  CheckCircle2,
  Folder,
  Globe,
  ArrowRight,
  Check,
  FolderTree,
  Cpu,
  Zap,
  GitFork,
  Download,
  RefreshCw,
  Shield,
  Lock,
  Palette,
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

export default function HomeView() {
  const { setActiveTab } = useCodeLab();

  return (
    <div className={styles.container}>
      {/* Welcome Title */}
      <div className={styles.welcomeHeader}>
        <h1 className={styles.welcomeTitle}>Welcome to Code Lab 👋</h1>
        <p className={styles.welcomeSub}>
          Your Next.js reference lab with daily automated examples.
        </p>
      </div>

      {/* Top 4 Stat Cards */}
      <div className={styles.statsGrid}>
        <div className={styles.statCard}>
          <div className={`${styles.statIconBox} ${styles.iconBlue}`}>
            <FileText size={22} />
          </div>
          <div className={styles.statMeta}>
            <span className={styles.statValue}>28</span>
            <span className={styles.statLabel}>Total Topics</span>
            <span className={styles.statSub}>Organized by category</span>
          </div>
        </div>

        <div className={styles.statCard}>
          <div className={`${styles.statIconBox} ${styles.iconGreen}`}>
            <Code2 size={22} />
          </div>
          <div className={styles.statMeta}>
            <span className={styles.statValue}>42</span>
            <span className={styles.statLabel}>Total Examples</span>
            <span className={styles.statSub}>Live & ready to explore</span>
          </div>
        </div>

        <div className={styles.statCard}>
          <div className={`${styles.statIconBox} ${styles.iconPurple}`}>
            <Clock size={22} />
          </div>
          <div className={styles.statMeta}>
            <span className={styles.statValue}>
              {LAST_RUN_METADATA.lastRunTimeFormatted.split("•")[0].trim()}
            </span>
            <span className={styles.statLabel}>Last Automated Run</span>
            <span className={styles.statSub}>
              {LAST_RUN_METADATA.lastRunTimeFormatted.split("•")[1] ? LAST_RUN_METADATA.lastRunTimeFormatted.split("•")[1].trim() + " • Today" : "Today"}
            </span>
          </div>
        </div>

        <div className={styles.statCard}>
          <div className={`${styles.statIconBox} ${styles.iconYellow}`}>
            <CheckCircle2 size={22} />
          </div>
          <div className={styles.statMeta}>
            <span className={styles.statValue}>{LAST_RUN_METADATA.automationStatus}</span>
            <span className={styles.statLabel}>Automation Status</span>
            <span className={styles.statSub}>{LAST_RUN_METADATA.scheduleCron}</span>
          </div>
        </div>
      </div>

      {/* Middle Row */}
      <div className={styles.middleGrid}>
        {/* Recent Entry Card */}
        <div className={styles.cardBox}>
          <div className={styles.cardHeaderRow}>
            <div className={styles.cardHeaderTitle}>
              <span>Recent Entry</span>
              <span className={styles.newPill}>New</span>
            </div>
          </div>

          <div className={styles.entryBody}>
            <div className={styles.avatarCircle}>N</div>
            <div className={styles.entryMeta}>
              <h2 className={styles.entryTitle}>{RECENT_ENTRY.title}</h2>
              <p className={styles.entryDesc}>{RECENT_ENTRY.description}</p>

              <div className={styles.entryTags}>
                <span className={styles.tagItem}>
                  <Folder size={14} className="text-slate-400" />
                  {RECENT_ENTRY.category}
                </span>
                <span className={styles.tagItem}>
                  <FileText size={14} className="text-slate-400" />
                  {RECENT_ENTRY.filesCount} files
                </span>
                <span className={styles.tagItem}>
                  <Globe size={14} className="text-slate-400" />
                  Live Demo
                </span>
              </div>
            </div>
          </div>

          <div className={styles.highlightsBox}>
            <span className={styles.highlightsTitle}>Key Highlights</span>
            <div className={styles.highlightsList}>
              {RECENT_ENTRY.highlights.map((item, idx) => (
                <div key={idx} className={styles.highlightItem}>
                  <Check size={15} className={styles.highlightCheckIcon} />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          <button
            className={styles.viewBtn}
            onClick={() => setActiveTab(RECENT_ENTRY.targetTab)}
          >
            <span>View Example</span>
            <ArrowRight size={16} />
          </button>
        </div>

        {/* Automation Status Timeline Card */}
        <div className={styles.cardBox}>
          <div className={styles.cardHeaderRow}>
            <span className={styles.cardHeaderTitle}>Automation Status</span>
            <span className={styles.statusNextPill}>Next run: {LAST_RUN_METADATA.nextRun}</span>
          </div>

          <div className={styles.timelineList}>
            {AUTOMATION_STEPS.map((step, idx) => (
              <div key={idx} className={styles.timelineItem}>
                <div className={styles.timelineDot}>
                  <Check size={14} />
                </div>
                <div className={styles.timelineContent}>
                  <div className={styles.timelineHeaderRow}>
                    <span className={styles.timelineStepTitle}>
                      {step.title}
                    </span>
                    <span className={styles.timelineTime}>{step.time}</span>
                  </div>
                  <span className={styles.timelineStepDesc}>{step.desc}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* All Topics Overview Section */}
      <div className={styles.overviewSection}>
        <div className={styles.overviewHeader}>
          <h2 className={styles.overviewTitle}>All Topics Overview</h2>
          <button
            className={styles.viewAllLink}
            onClick={() => setActiveTab("app-router")}
          >
            <span>View all topics</span>
            <ArrowRight size={16} />
          </button>
        </div>

        <div className={styles.topicGrid}>
          {TOPIC_CATEGORIES.map((topic) => {
            const IconComponent = TOPIC_ICON_MAP[topic.iconName] || Code2;

            return (
              <div
                key={topic.id}
                className={styles.topicCard}
                onClick={() => setActiveTab(topic.id)}
              >
                <div className={styles.topicCardLeft}>
                  <div className={styles.topicIconBox}>
                    <IconComponent size={18} />
                  </div>
                  <div className={styles.topicMeta}>
                    <span className={styles.topicName}>{topic.label}</span>
                    <span className={styles.topicSub}>
                      {topic.count} {topic.count === 1 ? "example" : "examples"}
                    </span>
                  </div>
                </div>
                <div className={styles.topicBadge}>{topic.count}</div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
