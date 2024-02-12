// pages/photos/[id].tsx

import { ApiService } from '@/services/ApiService';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

const PhotoPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const [image, setImage] = useState<string | undefined>(undefined);

  const fetchPhotosById = async () => {
    try {
      const gotImage = await ApiService.getImageRequest(id as string);
      const im = 'data:image/png;base64,' + gotImage;
      setImage(im);
    } catch (error) {
      console.error('Error fetching photos:', error);
    }
  };

  return (
    <div>
      <h1>Photos for ID: {id}</h1>
      <img src={image} alt="Snapshot" />
      <button onClick={fetchPhotosById}>fetch photo</button>
    </div>
  );
};

export default PhotoPage;
