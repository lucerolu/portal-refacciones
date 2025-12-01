// src/components/MultiLevelMenu.jsx
import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SearchBar from "./SearchBar";
import { ChevronRight, ExternalLink } from "lucide-react";

/*
  item shape example:
  {
    id: "jd",
    label: "John Deere",
    type: "url" | "pdf" | "panel" | "folder",
    url: "https://...",
    children: [ ... ]
  }
*/

function MenuList({ items, level = 0, onOpenPanel }) {
  return (
    <ul className={`flex flex-col gap-2 ${level > 0 ? "pl-4" : ""}`}>
      {items.map((it) => (
        <li key={it.id}>
          <MenuItem item={it} onOpenPanel={onOpenPanel} />
        </li>
      ))}
    </ul>
  );
}

function MenuItem({ item, onOpenPanel }) {
  const hasChildren = Array.isArray(item.children) && item.children.length > 0;

  const handleClick = (e) => {
    e.stopPropagation();
    if (item.type === "url" || item.type === "pdf") {
      window.open(item.url, "_blank", "noopener,noreferrer");
    } else if (item.type === "panel") {
      onOpenPanel && onOpenPanel(item);
    }
    // if folder, just toggle (handled by Expandable)
  };

  if (item.type === "folder" || hasChildren) {
    return <ExpandableFolder item={item} onOpenPanel={onOpenPanel} />;
  }

  return (
    <div
      onClick={handleClick}
      className="flex items-center justify-between gap-3 p-3 rounded-md hover:bg-gray-100 cursor-pointer"
    >
      <div className="flex items-center gap-3">
        <span className="font-medium">{item.label}</span>
      </div>
      <div className="flex items-center gap-2 text-gray-500">
        {(item.type === "url" || item.type === "pdf") && <ExternalLink className="w-4 h-4" />}
        {item.type === "panel" && <ChevronRight className="w-4 h-4" />}
      </div>
    </div>
  );
}

function ExpandableFolder({ item, onOpenPanel }) {
  const [open, setOpen] = useState(false);
  return (
    <div>
      <div
        onClick={() => setOpen((s) => !s)}
        className="flex items-center justify-between gap-3 p-3 rounded-md hover:bg-gray-100 cursor-pointer"
      >
        <div className="flex items-center gap-3">
          <span className="font-medium">{item.label}</span>
          <span className="text-sm text-gray-500">({item.children?.length || 0})</span>
        </div>
        <div className="text-gray-500">
          <ChevronRight className={`w-4 h-4 transform transition-transform ${open ? "rotate-90" : ""}`} />
        </div>
      </div>

      <AnimatePresence>
        {open && item.children && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.18 }}
            className="pl-3"
          >
            <MenuList items={item.children} level={1} onOpenPanel={onOpenPanel} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function MultiLevelMenu({ data, onOpenPanel }) {
  const [query, setQuery] = useState("");

  // filter shallow for current level (we'll show full tree but filtered labels)
  const filtered = useMemo(() => {
    if (!query) return data;
    const q = query.toLowerCase();

    // function that filters tree and includes parents if children match
    const filterTree = (nodes) =>
      nodes
        .map((n) => {
          const name = n.label?.toLowerCase() || "";
          const matchSelf = name.includes(q);
          const children = n.children ? filterTree(n.children) : [];
          if (matchSelf || children.length) {
            return { ...n, children };
          }
          return null;
        })
        .filter(Boolean);

    return filterTree(data);
  }, [data, query]);

  return (
    <div className="h-full flex flex-col">
      <div className="mb-3">
        <SearchBar value={query} onChange={setQuery} placeholder="Buscar en categoría..." />
      </div>

      <div className="flex-1 overflow-auto pr-2">
        <MenuList items={filtered} onOpenPanel={onOpenPanel} />
      </div>
    </div>
  );
}
