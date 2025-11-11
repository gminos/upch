import React, { useEffect, useState, useMemo } from "react";
import Layout from "./components/Layout";
import PostForm from "./components/PostForm";
import PostList from "./components/PostList";
import Message from "./components/Message";
import CategoryButton from "./components/CategoryButton";
import { Tag } from "lucide-react";
import "./App.css";

const API_URL = import.meta.env.VITE_API_URL;

function App() {
  const [posts, setPosts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [message, setMessage] = useState("");
  const [filter, setFilter] = useState("recent");
  const [selectedCategory, setSelectedCategory] = useState(null);

  const fetchPosts = async () => {
    try {
      const res = await fetch(`${API_URL}/posts/`);
      const data = await res.json();
      setPosts(data);
    } catch (error) {
      console.error("Error al obtener posts:", error);
    }
  };

  const fetchCategories = async () => {
    try {
      const res = await fetch(`${API_URL}/categories/`);
      const data = await res.json();
      setCategories(data);
    } catch (error) {
      console.error("Error al obtener categorías:", error);
    }
  };

  useEffect(() => {
    fetchPosts();
    fetchCategories();

    let interval;
    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible") {
        fetchPosts();
        interval = setInterval(fetchPosts, 5000);
      } else {
        clearInterval(interval);
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    if (document.visibilityState === "visible") {
      interval = setInterval(fetchPosts, 5000);
    }

    return () => {
      clearInterval(interval);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  const handleCreatePost = async (title, content, categories = []) => {
    try {
      const res = await fetch(`${API_URL}/posts/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, content, categories }),
      });

      if (res.ok) {
        const created = await res.json();
        setPosts((prev) => [created, ...prev]);
        setMessage("Publicación creada");
      } else {
        setMessage("Error al crear publicación");
      }
    } catch (error) {
      console.error(error);
      setMessage("No se pudo conectar con el servidor");
    }
  };

  const handleLikeChange = (updatedPost) => {
    setPosts((prevPosts) =>
      prevPosts.map((post) =>
        post.id === updatedPost.id ? updatedPost : post
      )
    );
  };

  const filteredPosts = useMemo(() => {
    let result = [...posts];

    if (selectedCategory) {
      result = result.filter((post) =>
        post.categories?.some((cat) => cat.id === selectedCategory)
      );
    }

    if (filter === "likes") {
      result.sort((a, b) => b.likes - a.likes);
    } else {
      result.sort((a, b) => b.id - a.id);
    }

    return result;
  }, [posts, filter, selectedCategory]);

  return (
    <Layout title="Escribe tu historia">
      <PostForm onCreate={handleCreatePost} />
      {message && <Message text={message} />}

      {/* Filtros principales */}
      <div className="max-w-2xl mx-auto w-full flex flex-wrap gap-4 justify-center mb-2">
        <CategoryButton
          name="🕒 Recientes"
          active={filter === "recent"}
          onClick={() => setFilter("recent")}
          variant="primary"
        />
        <CategoryButton
          name="❤️ Más Likes"
          active={filter === "likes"}
          onClick={() => setFilter("likes")}
          variant="primary"
        />
      </div>

      {/* Línea divisoria centrada y con margen */}
      <div className="max-w-2xl mx-auto w-full my-6">
        <hr className="border-white/30" />
      </div>

      {/* Filtros por categoría secundaria */}
      <div className="max-w-2xl mx-auto w-full flex flex-wrap gap-2 justify-center mb-6">
        {categories.map((cat) => (
          <CategoryButton
            key={cat.id}
            name={cat.name}
            active={selectedCategory === cat.id}
            onClick={() =>
              setSelectedCategory(
                selectedCategory === cat.id ? null : cat.id
              )
            }
            icon={<Tag size={14} />}
            variant="secondary"
          />
        ))}
      </div>

      <PostList posts={filteredPosts} onLikeChange={handleLikeChange} />
    </Layout>
  );
}

export default App;
