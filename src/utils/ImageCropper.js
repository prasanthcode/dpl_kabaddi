import React, { useState } from "react";
import Cropper from "react-easy-crop";
import { Dialog, DialogActions, DialogContent, DialogTitle, Button, Slider } from "@mui/material";
import getCroppedImg from "./cropImage";

export default function ImageCropper({ image, onCropDone, onClose }) {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);

  const onCropComplete = (_, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  };

  const handleCrop = async () => {
    const croppedImageUrl = await getCroppedImg(image, croppedAreaPixels);
    onCropDone(croppedImageUrl);
  };

  return (
    <Dialog open={!!image} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Crop Image</DialogTitle>
      <DialogContent>
        <div style={{ position: "relative", width: "100%", height: 300 }}>
          <Cropper
            image={image}
            crop={crop}
            zoom={zoom}
            aspect={1}
            onCropChange={setCrop}
            onZoomChange={setZoom}
            onCropComplete={onCropComplete}
          />
        </div>
        <Slider value={zoom} min={1} max={3} step={0.1} onChange={(e, value) => setZoom(value)} />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary">
          Cancel
        </Button>
        <Button onClick={handleCrop} color="primary">
          Crop
        </Button>
      </DialogActions>
    </Dialog>
  );
}
