'use client';

import { ApiService } from "@/services/ApiService";
import { useState } from "react";
import path from "path";

const imagePath = 'test_image.png';

export default function TestComponent() {
  const [imageUrl, setImageUrl] = useState<string>('');

  const handleOnClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
    // upload image from src/data/test_image.png
    console.log(imagePath);
    const response = await fetch(imagePath);
    if (!response.ok) {
      throw new Error('Failed to fetch image');
    }
    const blob = await response.blob();
    const file = new File([blob], 'example.png');
    const prompt = 'Test Prompt';
    const result = await ApiService.sendEditRequest(file, prompt);
    //setImageUrl(result);
    console.log(result);
  }

  return (
    <main>
      <h1>Test Component</h1>
      <button onClick={handleOnClick}>Test Me</button>
      <img src={imageUrl} alt="Test Image" />
    </main>
  );
}