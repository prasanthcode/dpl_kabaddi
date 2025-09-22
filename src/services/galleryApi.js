import axios from "axios";

const API = axios.create({
  baseURL: process.env.REACT_APP_API_URL || "http://localhost:5000",
});

export const fetchGalleries = (params = {}) =>
  API.get("/api/gallery", { params });

export const addGallery = (galleryData) => {
  if (galleryData instanceof FormData) {
    return API.post("/api/gallery", galleryData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
  }
  return API.post("/api/gallery", galleryData);
};

export const updateGallery = (id, galleryData) => {
  if (galleryData instanceof FormData) {
    return API.put(`/api/gallery/${id}`, galleryData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
  }
  return API.put(`/api/gallery/${id}`, galleryData);
};

export const deleteGallery = (id) => API.delete(`/api/gallery/${id}`);
