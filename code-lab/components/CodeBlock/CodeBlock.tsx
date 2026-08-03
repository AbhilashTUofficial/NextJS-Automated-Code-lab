"use client";

import React, { useState } from "react";
import styles from "./CodeBlock.module.css";
import { CodeFile } from "@/data/topicsData";
import { useCodeLab } from "@/context/CodeLabContext";
import { Copy, Check, FileCode } from "lucide-react";

interface CodeBlockProps {
  files: CodeFile[];
}

export default function CodeBlock({ files }: CodeBlockProps) {
  const [activeFileIndex, setActiveFileIndex] = useState(0);
  const [copied, setCopied] = useState(false);
  const { showToast } = useCodeLab();

  if (!files || files.length === 0) return null;

  const currentFile = files[activeFileIndex] || files[0];

  const handleCopy = () => {
    navigator.clipboard.writeText(currentFile.code);
    setCopied(true);
    showToast(`Copied ${currentFile.filename} to clipboard!`);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className={styles.codeContainer}>
      <div className={styles.tabHeader}>
        <div className={styles.tabList}>
          {files.map((file, idx) => (
            <button
              key={idx}
              onClick={() => setActiveFileIndex(idx)}
              className={`${styles.tabBtn} ${
                activeFileIndex === idx ? styles.tabActive : ""
              }`}
            >
              <FileCode size={14} />
              <span>{file.filename}</span>
            </button>
          ))}
        </div>

        <div className={styles.actionsGroup}>
          <button onClick={handleCopy} className={styles.copyBtn}>
            {copied ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />}
            <span>{copied ? "Copied!" : "Copy Code"}</span>
          </button>
        </div>
      </div>

      <div className={styles.codeBody}>
        <pre>
          <code>{currentFile.code}</code>
        </pre>
      </div>
    </div>
  );
}
