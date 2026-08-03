"use client";

import React from "react";
import styles from "./CodeLabApp.module.css";
import { useCodeLab } from "@/context/CodeLabContext";
import Sidebar from "@/components/Sidebar/Sidebar";
import Header from "@/components/Header/Header";
import HomeView from "@/components/HomeView/HomeView";
import TopicView from "@/components/TopicView/TopicView";
import Toast from "@/components/Toast/Toast";

export default function CodeLabApp() {
  const { activeTab } = useCodeLab();

  return (
    <div className={styles.appLayout}>
      <Sidebar />
      <div className={styles.mainContent}>
        <Header />
        <main className={styles.scrollArea}>
          {activeTab === "home" ? <HomeView /> : <TopicView />}
        </main>
      </div>
      <Toast />
    </div>
  );
}
