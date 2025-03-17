import React, { useState } from "react";
import ImageCropper from "../components/ImageCropper";
import axios from "axios";
import PlayerSelect from "../components/PlayerSelect";

export default function UploadPage() {
  const [image, setImage] = useState(null);
  const [croppedImage, setCroppedImage] = useState(null);
  const [base64Image, setBase64Image] = useState(null);
  const [imageSize, setImageSize] = useState(0);
  const [uploading, setUploading] = useState(false);
  const [cloudinaryUrl, setCloudinaryUrl] = useState("");
  const [selectedPlayer, setSelectedPlayer] = useState(null);
  const [updatingProfile, setUpdatingProfile] = useState(false);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file));
    }
  };

  const handleCropDone = async (croppedImageUrl) => {
    setCroppedImage(croppedImageUrl);
    convertToBase64(croppedImageUrl);
    setImage(null);
  };

  const convertToBase64 = async (imageUrl) => {
    const response = await fetch(imageUrl);
    const blob = await response.blob();

    const reader = new FileReader();
    reader.readAsDataURL(blob);
    reader.onloadend = () => {
      const base64String = reader.result;
      setBase64Image(base64String);
      setImageSize(getBase64FileSize(base64String)); // Calculate size
    };
  };

  // Function to calculate Base64 image size
  const getBase64FileSize = (base64) => {
    let sizeInBytes = (base64.length * 3) / 4 - (base64.endsWith("==") ? 2 : base64.endsWith("=") ? 1 : 0);
    return (sizeInBytes / 1024).toFixed(2); // Convert to KB
  };

  const handleUpload = async () => {
    if (!base64Image) return alert("No image to upload!");

    setUploading(true);
    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/upload`, { image: base64Image });
      setCloudinaryUrl(response.data.secure_url);

      // After uploading, update the player's profile picture
      if (selectedPlayer) {
        await updatePlayerProfilePic(selectedPlayer, response.data.secure_url);
      }
    } catch (error) {
      console.error("Upload failed:", error);
    }
    setUploading(false);
  };

  // Function to update player's profile picture
  const updatePlayerProfilePic = async (playerId, imageUrl) => {
    setUpdatingProfile(true);
    try {
      await axios.put(`${process.env.REACT_APP_API_URL}/api/players/setprofilepic`, {
        playerId,
        profilePic: imageUrl,
      });

      alert("Player profile picture updated successfully!");
      resetForm(); // Reset after successful update
    } catch (error) {
      console.error("Failed to update profile picture:", error);
      alert("Error updating player profile picture.");
    }
    setUpdatingProfile(false);
  };

  // Reset all states after submission
  const resetForm = () => {
    setImage(null);
    setCroppedImage(null);
    setBase64Image(null);
    setImageSize(0);
    setUploading(false);
    setCloudinaryUrl("");
    setSelectedPlayer(null);
    setUpdatingProfile(false);
  };

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <input type="file" accept="image/*" onChange={handleFileChange} />

      {image && <ImageCropper image={image} onCropDone={handleCropDone} onClose={() => setImage(null)} />}

      {croppedImage && (
        <div style={{ marginTop: "20px" }}>
          <h3>Compressed & Cropped Image:</h3>
          <img src={croppedImage} alt="Cropped" style={{ width: 200, height: 200, borderRadius: "10px" }} />
          <p><strong>Size:</strong> {imageSize} KB</p> {/* Display Image Size */}
          <button onClick={handleUpload} disabled={uploading} style={{ marginTop: "10px", padding: "10px" }}>
            {uploading ? "Uploading..." : "Upload to Cloudinary"}
          </button>
        </div>
      )}

      {cloudinaryUrl && (
        <div style={{ marginTop: "20px" }}>
          <h3>Uploaded Image:</h3>
          <img src={cloudinaryUrl} alt="Uploaded" style={{ width: 200, height: 200, borderRadius: "10px" }} />
          <p>URL: <a href={cloudinaryUrl} target="_blank" rel="noopener noreferrer">{cloudinaryUrl}</a></p>
        </div>
      )}

      <h2>Select a Player</h2>
      <PlayerSelect value={selectedPlayer} onChange={setSelectedPlayer} />
      {selectedPlayer && <p>Selected Player ID: {selectedPlayer}</p>}

      {cloudinaryUrl && selectedPlayer && (
        <button
          onClick={() => updatePlayerProfilePic(selectedPlayer, cloudinaryUrl)}
          disabled={updatingProfile}
          style={{ marginTop: "10px", padding: "10px" }}
        >
          {updatingProfile ? "Updating Profile..." : "Set as Profile Picture"}
        </button>
      )}
    </div>
  );
}
