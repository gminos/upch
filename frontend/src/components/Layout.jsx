import React from "react";

function Layout({ title, children }) {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-center mb-6">{title}</h1>
      {children}
    </div>
  );
}

export default Layout;
