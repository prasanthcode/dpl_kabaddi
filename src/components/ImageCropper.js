import React, { useState, useCallback } from "react";
import Cropper from "react-easy-crop";
import { Slider, Button, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";
import getCroppedImg from "../utils/cropImage";

const ImageCropper = ({ image, onCropDone, onClose }) => {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);

  const onCropComplete = useCallback((_, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const handleCrop = async () => {
    const croppedImage = await getCroppedImg(image, croppedAreaPixels);
    onCropDone(croppedImage);
  };

  return (
    <Dialog open={!!image} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Crop Image</DialogTitle>
      <DialogContent style={{ position: "relative", width: "100%", height: 300 }}>
        <Cropper
          image={image}
          crop={crop}
          zoom={zoom}
          aspect={1} // Square crop
          onCropChange={setCrop}
          onZoomChange={setZoom}
          onCropComplete={onCropComplete}
        />
      </DialogContent>
      <DialogActions>
        <Slider value={zoom} min={1} max={3} step={0.1} onChange={(_, newZoom) => setZoom(newZoom)} />
        <Button onClick={handleCrop} color="primary">Crop</Button>
        <Button onClick={onClose} color="secondary">Cancel</Button>
      </DialogActions>
    </Dialog>
  );
};

export default ImageCropper;
