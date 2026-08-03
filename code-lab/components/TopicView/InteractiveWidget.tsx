"use client";

import React, { useState } from "react";
import { TabType } from "@/context/CodeLabContext";
import { Play, RotateCcw, Check, Search, ChevronLeft, ChevronRight } from "lucide-react";

interface InteractiveWidgetProps {
  topicId: TabType;
}

export default function InteractiveWidget({ topicId }: InteractiveWidgetProps) {
  // Demo 1: API / Route Handlers Simulation
  const [apiMethod, setApiMethod] = useState<"GET" | "POST">("GET");
  const [apiResponse, setApiResponse] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // Demo 2: Server Action Simulation
  const [formName, setFormName] = useState("");
  const [formPending, setFormPending] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);

  // Demo 3: Pagination Demo
  const [page, setPage] = useState(1);
  const itemsPerPage = 2;
  const sampleItems = [
    { id: 1, name: "Next.js 14 Fundamentals" },
    { id: 2, name: "React Server Components Guide" },
    { id: 3, name: "Edge Middleware Authentication" },
    { id: 4, name: "Parallel & Intercepting Routes" },
    { id: 5, name: "Streaming Data with Suspense" },
  ];
  const paginatedItems = sampleItems.slice((page - 1) * itemsPerPage, page * itemsPerPage);

  // Demo 4: Search & Filters Demo
  const [query, setQuery] = useState("");
  const filteredList = sampleItems.filter((i) =>
    i.name.toLowerCase().includes(query.toLowerCase())
  );

  const handleTestApi = () => {
    setLoading(true);
    setApiResponse(null);
    setTimeout(() => {
      setLoading(false);
      if (apiMethod === "GET") {
        setApiResponse(
          JSON.stringify(
            {
              status: 200,
              message: "Route Handler executed successfully",
              timestamp: new Date().toISOString(),
              data: [
                { id: 101, title: "Server Side Rendered Post" },
                { id: 102, title: "Edge Cached Result" },
              ],
            },
            null,
            2
          )
        );
      } else {
        setApiResponse(
          JSON.stringify(
            {
              status: 201,
              message: "Resource created via POST /api/route",
              created: { id: "res_992", createdBy: "Client Sandbox" },
            },
            null,
            2
          )
        );
      }
    }, 600);
  };

  const handleServerAction = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName) return;
    setFormPending(true);
    setTimeout(() => {
      setFormPending(false);
      setFormSubmitted(true);
      setTimeout(() => setFormSubmitted(false), 3000);
    }, 800);
  };

  return (
    <div className="bg-slate-50 border border-slate-200 rounded-xl p-6 space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="font-bold text-slate-900 text-lg">Interactive Live Sandbox</h3>
        <span className="text-xs font-semibold px-2.5 py-1 bg-emerald-100 text-emerald-700 rounded-full">
          Zero Backend • Client Simulation
        </span>
      </div>

      {/* Dynamic Widget based on Topic */}
      {topicId === "app-router" || topicId === "axios-api-calls" ? (
        <div className="space-y-4">
          <p className="text-sm text-slate-600">
            Simulate making HTTP calls to Next.js Route Handlers (`app/api/.../route.ts`).
          </p>
          <div className="flex items-center gap-3">
            <select
              value={apiMethod}
              onChange={(e) => setApiMethod(e.target.value as "GET" | "POST")}
              className="px-3 py-2 bg-white border rounded-lg text-sm font-semibold text-slate-700"
            >
              <option value="GET">GET /api/users</option>
              <option value="POST">POST /api/users</option>
            </select>
            <button
              onClick={handleTestApi}
              disabled={loading}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-semibold flex items-center gap-2"
            >
              <Play size={14} />
              {loading ? "Sending..." : "Execute Request"}
            </button>
          </div>

          {apiResponse && (
            <div className="bg-slate-900 text-emerald-400 p-4 rounded-lg font-mono text-xs overflow-x-auto">
              <pre>{apiResponse}</pre>
            </div>
          )}
        </div>
      ) : topicId === "server-actions" || topicId === "forms" ? (
        <div className="space-y-4">
          <p className="text-sm text-slate-600">
            Test Server Action mutation lifecycle with automatic pending UI states.
          </p>
          <form onSubmit={handleServerAction} className="flex gap-2 max-w-md">
            <input
              type="text"
              placeholder="Enter name (e.g. John Doe)"
              value={formName}
              onChange={(e) => setFormName(e.target.value)}
              className="flex-1 px-3 py-2 bg-white border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="submit"
              disabled={formPending || !formName}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-semibold disabled:opacity-50"
            >
              {formPending ? "Executing..." : "Run Server Action"}
            </button>
          </form>

          {formSubmitted && (
            <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-lg text-sm flex items-center gap-2">
              <Check size={16} />
              <span>
                Server Action executed! Revalidated path for user &quot;{formName}&quot;.
              </span>
            </div>
          )}
        </div>
      ) : topicId === "pagination" ? (
        <div className="space-y-4">
          <p className="text-sm text-slate-600">
            Test interactive page switching with pagination bounds.
          </p>
          <div className="bg-white border rounded-lg p-4 space-y-2">
            {paginatedItems.map((item) => (
              <div key={item.id} className="p-2 border-b last:border-b-0 text-sm font-medium text-slate-800">
                #{item.id} — {item.name}
              </div>
            ))}
          </div>
          <div className="flex items-center gap-3">
            <button
              disabled={page <= 1}
              onClick={() => setPage((p) => p - 1)}
              className="p-2 border rounded-lg bg-white disabled:opacity-40"
            >
              <ChevronLeft size={16} />
            </button>
            <span className="text-sm font-semibold text-slate-700">
              Page {page} of {Math.ceil(sampleItems.length / itemsPerPage)}
            </span>
            <button
              disabled={page >= Math.ceil(sampleItems.length / itemsPerPage)}
              onClick={() => setPage((p) => p + 1)}
              className="p-2 border rounded-lg bg-white disabled:opacity-40"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      ) : topicId === "search-filters" ? (
        <div className="space-y-4">
          <p className="text-sm text-slate-600">
            Test live query filtering on sample data set.
          </p>
          <div className="flex items-center gap-2 bg-white border rounded-lg px-3 py-2 max-w-md">
            <Search size={16} className="text-slate-400" />
            <input
              type="text"
              placeholder="Search topics..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full text-sm outline-none bg-transparent"
            />
          </div>
          <div className="bg-white border rounded-lg p-4 space-y-2">
            {filteredList.length === 0 ? (
              <p className="text-sm text-slate-400 italic">No topics match filter</p>
            ) : (
              filteredList.map((item) => (
                <div key={item.id} className="p-2 border-b last:border-b-0 text-sm text-slate-700">
                  {item.name}
                </div>
              ))
            )}
          </div>
        </div>
      ) : (
        <div className="p-6 bg-white border rounded-lg text-center space-y-2">
          <p className="text-sm font-semibold text-slate-800">
            {topicId.toUpperCase().replace(/-/g, " ")} Live Demonstration Ready
          </p>
          <p className="text-xs text-slate-500">
            All code snippets and documentation for this topic are available in the tabs above.
          </p>
        </div>
      )}
    </div>
  );
}
