import { ApiService } from '@/services/ApiService';
import { useRouter } from 'next/router';
import { useState } from 'react';

const PhotoPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const [image, setImage] = useState<string | undefined>(undefined);

  const fetchPhotosById = async () => {
    try {
      const pattern = new RegExp("[a-zA-Z0-9]{10}");
      if (!pattern.test(id as string)) {
        throw new Error('Invalid ID');
      }
      const gotImage = await ApiService.getImageRequest(id as string);
      const im = 'data:image/png;base64,' + gotImage;
      setImage(im);
    } 
    catch (error) {
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
