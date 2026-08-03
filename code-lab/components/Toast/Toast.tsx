"use client";

import React from "react";
import styles from "./Toast.module.css";
import { useCodeLab } from "@/context/CodeLabContext";
import { CheckCircle } from "lucide-react";

export default function Toast() {
  const { toastMessage } = useCodeLab();

  if (!toastMessage) return null;

  return (
    <div className={styles.toastContainer}>
      <CheckCircle size={18} className={styles.checkIcon} />
      <span>{toastMessage}</span>
    </div>
  );
}
