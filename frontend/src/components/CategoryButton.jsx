import React from "react";

function CategoryButton({ name, active, onClick, icon, variant = "secondary" }) {
  const baseClasses =
    "flex items-center gap-1 px-3 py-1 rounded-full border text-sm font-medium transition whitespace-nowrap";

  const primaryClasses =
    "filter-bubble " + (active ? "active" : "");

  // 🔹 Degradado hover para secundarias
  const secondaryClasses =
    "bg-transparent border-white/30 text-gray-300 " +
    "hover:bg-gradient-to-r hover:from-cyan-500/30 hover:via-cyan-400/20 hover:to-cyan-500/30 hover:text-white hover:shadow-md";

  return (
    <button
      onClick={onClick}
      className={`${baseClasses} ${
        variant === "primary" ? primaryClasses : secondaryClasses
      } ${active ? "bg-cyan-500 text-white border-cyan-400 shadow-md" : ""}`}
    >
      {icon && <span className="text-gray-300">{icon}</span>}
      {name}
    </button>
  );
}

export default CategoryButton;
