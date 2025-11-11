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
        placeholder="Dale un título"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full mb-3 p-3 rounded-lg border border-white/20 bg-[#1e1e1e]/70 text-gray-100 placeholder-gray-400 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition"
        required
      />

      <textarea
        ref={textareaRef}
        value={content}
        onChange={handleContentChange}
        placeholder="Escribe con todo y detalles"
        className="w-full p-3 rounded-lg border border-white/20 bg-[#1e1e1e]/70 text-gray-100 placeholder-gray-400 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition resize-none overflow-auto leading-relaxed"
        rows={3}
      />

      <div className="mt-5">
        <p className="text-gray-300 text-sm mb-3 text-center">
          Selecciona categorías
        </p>

        {categories.length === 0 ? (
          <p className="text-gray-400 text-sm italic text-center">
            No hay categorías disponibles
          </p>
        ) : (
          <div className="flex flex-wrap gap-3 justify-center">
            {categories.map((cat) => {
              const isSelected = selectedCategories.includes(cat.id);
              return (
                <label
                  key={cat.id}
                  className={`flex items-center gap-2 cursor-pointer select-none px-4 py-2 rounded-full border text-sm font-medium transition-all ${isSelected
                      ? "bg-cyan-500/20 border-cyan-400 text-cyan-300"
                      : "bg-transparent border-white/20 text-gray-300 hover:border-cyan-400/60 hover:text-cyan-200"
                    }`}
                >
                  <input
                    type="checkbox"
                    checked={isSelected}
                    onChange={() => toggleCategory(cat.id)}
                    className="hidden"
                  />
                  <span
                    className={`w-4 h-4 flex items-center justify-center rounded-md border ${isSelected
                        ? "border-cyan-400 bg-cyan-400/30"
                        : "border-white/20"
                      }`}
                  >
                    {isSelected && (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-3 h-3 text-cyan-300"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-7.07 7.07a1 1 0 01-1.415 0l-3.536-3.536a1 1 0 111.414-1.414L9 11.586l6.293-6.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    )}
                  </span>
                  <span>{cat.name}</span>
                </label>
              );
            })}
          </div>
        )}
      </div>

      <button
        type="submit"
        className="mt-6 w-full bg-cyan-500 hover:bg-cyan-600 text-white font-semibold py-2 rounded-lg shadow-md hover:shadow-cyan-500/30 transition"
      >
        Publicar
      </button>

    </form>
  );
}

export default PostForm;
