'use client'
import { useState } from "react";
import { Filter } from "lucide-react";

export function FilterComponent() {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 px-4 py-2 border rounded-md bg-white hover:bg-gray-100"
      >
        <Filter /> Filters {open ? "▲" : "▼"}
      </button>
      {open && (
        <div className="absolute left-0 mt-2 w-48 bg-white border rounded-md shadow-lg p-2">
          <label className="flex items-center gap-2">
            <input type="checkbox" /> Codeforces
          </label>
          <label className="flex items-center gap-2 mt-2">
            <input type="checkbox" /> CodeChef
          </label>
          <label className="flex items-center gap-2 mt-2">
            <input type="checkbox" /> LeetCode
          </label>
        </div>
      )}
    </div>
  );
}
