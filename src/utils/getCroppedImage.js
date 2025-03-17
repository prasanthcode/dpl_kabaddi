import { createImage } from "./utils";
import { getCroppedCanvas } from "./utils";

export default async function getCroppedImg(imageSrc, croppedAreaPixels, quality = 0.7) {
  const image = await createImage(imageSrc);
  const croppedCanvas = getCroppedCanvas(image, croppedAreaPixels);

  // Convert to compressed Blob
  return new Promise((resolve) => {
    croppedCanvas.toBlob(
      (blob) => {
        if (blob.size > 100 * 1024) {
          console.warn(`Image still too large (${blob.size / 1024} KB). Consider reducing quality further.`);
        }
        resolve(URL.createObjectURL(blob)); // Return compressed image URL
      },
      "image/jpeg",
      quality
    );
  });
}
