import React from "react";

function CategoryButton({ name, active, onClick, icon, variant = "secondary" }) {
  const baseClasses =
    "flex items-center gap-1 px-3 py-1 rounded-full border text-sm font-medium transition-all duration-200 whitespace-nowrap";

  const primaryClasses =
    "filter-bubble " + (active ? "active" : "");

  const secondaryClasses = `
    border text-gray-300
    ${
      active
        ? "bg-gradient-to-r from-cyan-500/40 via-cyan-400/30 to-cyan-500/40 border-cyan-400 text-white shadow-md"
        : "bg-transparent border-white/30 hover:bg-gradient-to-r hover:from-cyan-500/30 hover:via-cyan-400/20 hover:to-cyan-500/30 hover:text-white hover:shadow-md"
    }
  `;

  return (
    <button
      onClick={onClick}
      className={`${baseClasses} ${
        variant === "primary" ? primaryClasses : secondaryClasses
      }`}
    >
      {icon && (
        <span
          className={`${
            active ? "text-white" : "text-gray-300"
          } transition-colors duration-200`}
        >
          {icon}
        </span>
      )}
      {name}
    </button>
  );
}

export default CategoryButton;
