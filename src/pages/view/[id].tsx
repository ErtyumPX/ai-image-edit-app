import { ApiService } from '@/services/ApiService';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

const PhotoPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const [image64, setImage64] = useState<string | undefined>(undefined);
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
      const requestedImage64 = await ApiService.getImageRequest(id as string);
      const imageWithMetaData = 'data:image/png;base64,' + requestedImage64;
      setImage64(imageWithMetaData);
    } 
    catch (error) {
      console.error('Error fetching photos:', error);
    }
  };

  const downloadImage = () => {
    if (image64) {
      const link = document.createElement('a');
      link.href = image64;
      link.download = 'image.jpg';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  const shareImage = async () => {
    if (image64) {
      if (navigator.share) {
        try {
          await navigator.share({
            title: 'Image Share',
            text: 'Check out this image',
            url: image64,
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
      {image64 ?
        <>
          <img src={image64} alt="Snapshot" />
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
