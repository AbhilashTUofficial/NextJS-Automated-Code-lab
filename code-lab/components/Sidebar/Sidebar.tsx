"use client";

import React from "react";
import styles from "./Sidebar.module.css";
import { useCodeLab, TabType } from "@/context/CodeLabContext";
import { TOPIC_CATEGORIES } from "@/data/topicsData";
import {
  Home,
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
  Code,
  Sparkles,
  X,
} from "lucide-react";

const ICON_MAP: Record<string, React.ElementType> = {
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

export default function Sidebar() {
  const { activeTab, setActiveTab, searchQuery, setSearchQuery, isMobileMenuOpen, setIsMobileMenuOpen } =
    useCodeLab();

  const filteredCategories = TOPIC_CATEGORIES.filter((cat) =>
    cat.label.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <aside
        className={`${styles.sidebarContainer} ${
          isMobileMenuOpen ? styles.sidebarOpen : ""
        }`}
      >
        <div className={styles.brandHeader}>
          <div className={styles.brandLogo}>
            <Code size={20} strokeWidth={2.5} />
          </div>
          <div className={styles.brandTitle}>
            <span className={styles.appName}>Code Lab</span>
            <span className={styles.appSub}>Next.js</span>
          </div>
          {isMobileMenuOpen && (
            <button
              onClick={() => setIsMobileMenuOpen(false)}
              style={{ marginLeft: "auto", background: "none", border: "none", cursor: "pointer", color: "#64748b" }}
            >
              <X size={20} />
            </button>
          )}
        </div>

        <div className={styles.searchContainer}>
          <div className={styles.searchInputWrapper}>
            <Search size={16} className="text-slate-400" />
            <input
              type="text"
              placeholder="Search topics..."
              className={styles.searchInput}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        <nav className={styles.navScrollArea}>
          {/* Home Tab */}
          <button
            onClick={() => setActiveTab("home")}
            className={`${styles.navItem} ${
              activeTab === "home" ? styles.navItemActive : ""
            }`}
          >
            <div className={styles.navItemLeft}>
              <Home size={18} className={styles.navItemIcon} />
              <span>Home</span>
            </div>
          </button>

          {/* Topic Tabs */}
          {filteredCategories.map((cat) => {
            const IconComp = ICON_MAP[cat.iconName] || Code2;
            const isActive = activeTab === cat.id;

            return (
              <button
                key={cat.id}
                onClick={() => setActiveTab(cat.id)}
                className={`${styles.navItem} ${
                  isActive ? styles.navItemActive : ""
                }`}
              >
                <div className={styles.navItemLeft}>
                  <IconComp size={18} className={styles.navItemIcon} />
                  <span>{cat.label}</span>
                </div>
                <span className={styles.badgeCount}>{cat.count}</span>
              </button>
            );
          })}
        </nav>

        <div className={styles.footerBanner}>
          <div className={styles.bannerCard}>
            <div className={styles.bannerIcon}>
              <Sparkles size={18} />
            </div>
            <div className={styles.bannerText}>
              <span className={styles.bannerTitle}>More topics coming soon...</span>
              <span className={styles.bannerSub}>Stay tuned!</span>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
