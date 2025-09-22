import { useEffect, useState } from "react";
import * as api from "../services/galleryApi";

export function useGallery() {
  const [galleries, setGalleries] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadGalleries() {
      try {
        const res = await api.fetchGalleries();
        setGalleries(res.data || []);
      } catch (err) {
        console.error("Load galleries failed", err);
      } finally {
        setLoading(false);
      }
    }
    loadGalleries();
  }, []);

  const addGallery = async (galleryData) => {
    const res = await api.addGallery(galleryData);
    setGalleries((prev) => [res.data, ...prev]);
    return res.data;
  };

  const updateGallery = async (id, galleryData) => {
    const res = await api.updateGallery(id, galleryData);
    setGalleries((prev) =>
      prev.map((g) => (g._id === id ? res.data : g))
    );
    return res.data;
  };

  const deleteGallery = async (id) => {
    await api.deleteGallery(id);
    setGalleries((prev) => prev.filter((g) => g._id !== id));
  };

  return { loading, galleries, addGallery, updateGallery, deleteGallery };
}
