import React, { useState, useRef, useEffect } from "react";

const API_URL = import.meta.env.VITE_API_URL;

function PostForm({ onCreate }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [categories, setCategories] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const textareaRef = useRef(null);

  useEffect(() => {
    fetch(`${API_URL}/categories/`)
      .then((res) => res.json())
      .then(setCategories)
      .catch(() => console.error("Error al cargar categorías"));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) return;

    onCreate(title, content, selectedCategories);

    setTitle("");
    setContent("");
    setSelectedCategories([]);

    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
    }
  };

  const toggleCategory = (id) => {
    setSelectedCategories((prev) =>
      prev.includes(id) ? prev.filter((c) => c !== id) : [...prev, id]
    );
  };

  const handleContentChange = (e) => {
    setContent(e.target.value);
    e.target.style.height = "auto";
    e.target.style.height = `${Math.min(e.target.scrollHeight, 300)}px`;
  };

  return (
    <form
      className="max-w-2xl mx-auto w-full mb-8 p-6 rounded-2xl backdrop-blur-md bg-white/10 border border-white/20 shadow-lg transition"
      onSubmit={handleSubmit}
    >

      <input
        type="text"
        placeholder="Dale un titulo"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full mb-3 p-3 rounded-lg border border-white/20 bg-[#1e1e1e]/70 text-gray-100 placeholder-gray-400 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition"
        required
      />

      <textarea
        ref={textareaRef}
        value={content}
        onChange={handleContentChange}
        placeholder="Escribe con todo y datalles"
        className="w-full p-3 rounded-lg border border-white/20 bg-[#1e1e1e]/70 text-gray-100 placeholder-gray-400 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition resize-none overflow-auto leading-relaxed"
        rows={3}
      />

      <div className="max-w-2xl mx-auto w-full flex flex-wrap gap-2 justify-center mt-4">
        {categories.length === 0 ? (
          <p className="text-gray-400 text-sm italic">
            No hay categorías disponibles
          </p>
        ) : (
          categories.map((cat) => (
            <button
              key={cat.id}
              type="button"
              onClick={() => toggleCategory(cat.id)}
              className={`px-3 py-1 rounded-full border text-sm font-medium transition ${
                selectedCategories.includes(cat.id)
                  ? "bg-cyan-500 text-white border-cyan-400"
                  : "bg-transparent border-white/30 text-gray-300 hover:border-cyan-400"
              }`}
            >
              {cat.name}
            </button>
          ))
        )}
      </div>
      
      <button
        type="submit"
        className="mt-4 w-full bg-cyan-500 hover:bg-cyan-600 text-white font-semibold py-2 rounded-lg shadow-md hover:shadow-cyan-500/30 transition"
      >
        Publicar
      </button>
    </form>
  );
}

export default PostForm;
