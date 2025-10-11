import { createContext, useContext, useEffect, useState } from "react";
import {
  fetchTeamGalleries,
  fetchCarouselGalleries,
  fetchPostGalleries,
} from "../services/galleryApi";

const GalleryContext = createContext();

export const GalleryProvider = ({ children }) => {
  const [teamGalleries, setTeamGalleries] = useState([]);
  const [carouselGalleries, setCarouselGalleries] = useState([]);
  const [postGalleries, setPostGalleries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadGalleries = async () => {
      setLoading(true);
      try {
        const [teamRes, carouselRes, postRes] = await Promise.all([
          fetchTeamGalleries(),
          fetchCarouselGalleries(),
          fetchPostGalleries(),
        ]);
        setTeamGalleries(teamRes.data || []);
        setCarouselGalleries(carouselRes.data || []);
        setPostGalleries(postRes.data || []);
      } catch (err) {
        console.error("Error fetching galleries:", err);
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    loadGalleries();
  }, []);

  return (
    <GalleryContext.Provider
      value={{
        teamGalleries,
        carouselGalleries,
        postGalleries,
        loading,
        error,
        setTeamGalleries,
        setCarouselGalleries,
        setPostGalleries,
      }}
    >
      {children}
    </GalleryContext.Provider>
  );
};

export const useGallery = () => useContext(GalleryContext);
