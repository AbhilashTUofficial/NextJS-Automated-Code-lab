"use client";

import React from "react";
import styles from "./Header.module.css";
import { useCodeLab } from "@/context/CodeLabContext";
import { TOPICS_DATA, LAST_RUN_METADATA } from "@/data/topicsData";
import { Clock, Menu, ChevronRight } from "lucide-react";

export default function Header() {
  const { activeTab, setIsMobileMenuOpen } = useCodeLab();

  const currentTopic = TOPICS_DATA[activeTab];

  return (
    <header className={styles.headerContainer}>
      <div className={styles.leftSection}>
        <button
          className={styles.mobileMenuBtn}
          onClick={() => setIsMobileMenuOpen(true)}
          aria-label="Open Mobile Menu"
        >
          <Menu size={20} />
        </button>

        <div className={styles.breadcrumb}>
          <span>Code Lab</span>
          <ChevronRight size={14} className="text-slate-400" />
          <span className={styles.breadActive}>
            {activeTab === "home"
              ? "Dashboard Overview"
              : currentTopic?.title || activeTab}
          </span>
        </div>
      </div>

      <div className={styles.rightSection}>
        <div className={styles.dateBadge}>
          <Clock size={14} className="text-slate-400" />
          <span>{LAST_RUN_METADATA.lastRunTimeFormatted}</span>
        </div>
      </div>
    </header>
  );
}
