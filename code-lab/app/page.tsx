"use client";

import { CodeLabProvider } from "@/context/CodeLabContext";
import CodeLabApp from "./CodeLabApp";

export default function Home() {
  return (
    <CodeLabProvider>
      <CodeLabApp />
    </CodeLabProvider>
  );
}
