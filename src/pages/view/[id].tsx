import { ApiService } from '@/services/ApiService';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import LoadingLayer from '@/components/LoadingLayer/LoadingLayer';

const PhotoPage = () => {
  const router = useRouter();
  const [rawImage64, setRawImage64] = useState<string | undefined>(undefined);
  const [editedImage64, setEditedImage64] = useState<string | undefined>(undefined);
  const [isAbleToShare, setIsAbleToShare] = useState(false);

  useEffect(() => {
    setIsAbleToShare(!!navigator.share);
    setTimeout(
      () => {
        document.getElementById('fetchButton')?.click();
      },
      1000
    );
  }, []);

  const fetchPhotosById = async (id: string) => {
    try {
      console.log("Id in Fetch: ", id);
      const pattern = new RegExp("[a-zA-Z0-9]{10}");
      if (!pattern.test(id as string)) {
        console.error('Invalid ID: ', id);
        throw new Error('Invalid ID');
      }
      const requestedEditedImage64 = await ApiService.getImageRequest(id as string, "edited");
      const requestedRawImage64 = await ApiService.getImageRequest(id as string, "raw");
      const editedImageWithMetaData = 'data:image/png;base64,' + requestedEditedImage64;
      const rawImageWithMetaData = 'data:image/png;base64,' + requestedRawImage64;
      setEditedImage64(editedImageWithMetaData);
      setRawImage64(rawImageWithMetaData);

    } 
    catch (error) {
      console.error('Error fetching photos:', error);
    }
  };

  const downloadImage = (imageIn64: string) => {
    const link = document.createElement('a');
    link.href = imageIn64;
    link.download = 'image.jpg';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const shareImage = async (imageIn64: string) => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Image Share',
          text: 'Check out this image',
          url: imageIn64,
        });
      } 
      catch (error) {
        console.error('Error sharing:', error);
      }
    } 
    else {
      console.log('Sharing not supported');
      // We may try something else here...
    }
  }

  return (
    <div>
      <h1>Photos for ID: {router.query.id}</h1>
      {(rawImage64 && editedImage64) 
      ?
        <>
          <img src={rawImage64} alt="Snapshot" />
          <button onClick={() => downloadImage(rawImage64)}> Download </button>
          {isAbleToShare && 
            <button onClick={() => shareImage(rawImage64)}> Share </button>
          }
          <img src={editedImage64} alt="Edited Snapshot" />
          <button onClick={() => downloadImage(editedImage64)}> Download </button>
          {isAbleToShare && 
            <button onClick={() => shareImage(editedImage64)}> Share </button>
          }
        </>
      :
        <>
          <LoadingLayer />
        </>
      }
      <button 
      id='fetchButton' 
      style={{display: 'none'}}
      onClick={() => fetchPhotosById(router.query.id as string)}>
        Fetch Photos
      </button>
      </div>
  );
};

export default PhotoPage;
