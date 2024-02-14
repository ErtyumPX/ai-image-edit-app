import { ApiService } from '@/services/ApiService';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

const PhotoPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const [rawImage64, setRawImage64] = useState<string | undefined>(undefined);
  const [editedImage64, setEditedImage64] = useState<string | undefined>(undefined);
  const [isAbleToShare, setIsAbleToShare] = useState(false);

  useEffect(() => {
    setIsAbleToShare(!!navigator.share);
    // fetchPhotosById();
  }, []);

  const fetchPhotosById = async () => {
    try {
      const pattern = new RegExp("[a-zA-Z0-9]{10}");
      if (!pattern.test(id as string)) {
        console.error('Invalid ID: ', id);
        throw new Error('Invalid ID');
      }
      const requestedEditedImage64 = await ApiService.getImageRequest(id as string, "edited");
      const editedImageWithMetaData = 'data:image/png;base64,' + requestedEditedImage64;

      const requestedRawImage64 = await ApiService.getImageRequest(id as string, "raw");
      const rawImageWithMetaData = 'data:image/png;base64,' + requestedRawImage64;
      setEditedImage64(editedImageWithMetaData);
      setRawImage64(rawImageWithMetaData);
    } 
    catch (error) {
      console.error('Error fetching photos:', error);
    }
  };

  const downloadImage = () => {
    if (editedImage64) {
      const link = document.createElement('a');
      link.href = editedImage64;
      link.download = 'image.jpg';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  const shareImage = async () => {
    if (editedImage64) {
      if (navigator.share) {
        try {
          await navigator.share({
            title: 'Image Share',
            text: 'Check out this image',
            url: editedImage64,
          });
        } catch (error) {
          console.error('Error sharing:', error);
        }
      } 
      else {
        console.log('Sharing not supported');
        // We may try something else here...
      }
    }
  }

  return (
    <div>
      <h1>Photos for ID: {id}</h1>
      {editedImage64 && rawImage64 ?
        <>
          <img src={editedImage64} alt="Edited Snapshot" />
          <img src={rawImage64} alt="Snapshot" />
          <button onClick={downloadImage}> Download </button>
          {isAbleToShare && 
            <button onClick={shareImage}> Share </button>
          }
        </>
        : <button onClick={fetchPhotosById}> Fetch Photos </button>
      }
    </div>
  );
};

export default PhotoPage;
