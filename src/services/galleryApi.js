import { API } from "./apiClient";

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

export const fetchTeamGalleries = () =>
  API.get("/api/gallery", { params: { type: "teams" } });

export const fetchCarouselGalleries = () =>
  API.get("/api/gallery", { params: { type: "carousel" } });

export const fetchPostGalleries = () =>
  API.get("/api/gallery", { params: { type: "post" } });
