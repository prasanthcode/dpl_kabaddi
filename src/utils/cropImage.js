import { createImage, getCroppedCanvas } from "./canvasUtils";

const getCroppedImg = async (imageSrc, pixelCrop) => {
  const image = await createImage(imageSrc);
  const croppedCanvas = getCroppedCanvas(image, pixelCrop);
  return new Promise((resolve) => {
    croppedCanvas.toBlob((blob) => {
      const croppedImageUrl = URL.createObjectURL(blob);
      resolve(croppedImageUrl);
    }, "image/jpeg");
  });
};

export default getCroppedImg;
