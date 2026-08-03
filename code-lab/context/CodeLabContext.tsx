"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

export type TabType =
  | "home"
  | "app-router"
  | "server-components"
  | "server-actions"
  | "routing-navigation"
  | "data-fetching"
  | "caching-revalidation"
  | "middleware"
  | "authentication"
  | "ui-styling"
  | "forms"
  | "axios-api-calls"
  | "pagination"
  | "search-filters"
  | "infinite-scroll"
  | "performance"
  | "deployment"
  | "testing";

interface CodeLabContextType {
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  isMobileMenuOpen: boolean;
  setIsMobileMenuOpen: (open: boolean) => void;
  bookmarks: string[];
  toggleBookmark: (tabId: string) => void;
  toastMessage: string | null;
  showToast: (msg: string) => void;
}

const CodeLabContext = createContext<CodeLabContextType | undefined>(undefined);

export const CodeLabProvider = ({ children }: { children: ReactNode }) => {
  const [activeTab, setActiveTabState] = useState<TabType>("home");
  const [searchQuery, setSearchQuery] = useState("");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [bookmarks, setBookmarks] = useState<string[]>([]);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const setActiveTab = (tab: TabType) => {
    setActiveTabState(tab);
    setIsMobileMenuOpen(false); // Close mobile menu on tab selection
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const toggleBookmark = (tabId: string) => {
    setBookmarks((prev) => {
      const isBookmarked = prev.includes(tabId);
      const updated = isBookmarked
        ? prev.filter((id) => id !== tabId)
        : [...prev, tabId];
      showToast(
        isBookmarked ? "Removed from bookmarks" : "Added to saved bookmarks"
      );
      return updated;
    });
  };

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  return (
    <CodeLabContext.Provider
      value={{
        activeTab,
        setActiveTab,
        searchQuery,
        setSearchQuery,
        isMobileMenuOpen,
        setIsMobileMenuOpen,
        bookmarks,
        toggleBookmark,
        toastMessage,
        showToast,
      }}
    >
      {children}
    </CodeLabContext.Provider>
  );
};

export const useCodeLab = () => {
  const context = useContext(CodeLabContext);
  if (!context) {
    throw new Error("useCodeLab must be used within a CodeLabProvider");
  }
  return context;
};
