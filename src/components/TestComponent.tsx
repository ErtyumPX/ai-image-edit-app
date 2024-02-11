'use client';

import { ApiService } from "@/services/ApiService";
import { useState } from "react";

const imagePath = 'utku_converted.png';
const maskPath = 'mask.png';

export default function TestComponent() {
  const [imageUrl, setImageUrl] = useState<string>(imagePath);

  const handleOnClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
    // upload image from src/data/test_image.png
    console.log(imagePath);
    const responseImage = await fetch(imagePath);
    if (!responseImage.ok) {
      throw new Error('Failed to fetch image');
    }
    const blobImage = await responseImage.blob();
    const fileImage = new File([blobImage], 'example.png');

    const response = await fetch(maskPath);
    if (!response.ok) {
      throw new Error('Failed to fetch image');
    }
    const blob = await response.blob();
    const file = new File([blob], 'mask_example.png');

    const prompt = 'A photo of Utku, long haired, wearing glasses, has goatee and earings, whole image converted scene from a Pixar movie.';
    const result = await ApiService.sendEditRequest(fileImage, file, prompt);
    setImageUrl(result.editedImageUrl);
    console.log(result.editedImageUrl);
  }

  return (
    <main>
      <h1>Test Component</h1>
      <button onClick={handleOnClick}>Test Me</button>
      <img src={imageUrl} alt="Test Image" />
    </main>
  );
}