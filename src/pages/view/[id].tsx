// pages/photos/[id].tsx

import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

const PhotoPage = () => {
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    if (id) {
      fetchPhotosById(id as string);
    }
  }, [id]);

  const fetchPhotosById = async (id: string) => {
    try {

    } catch (error) {
      console.error('Error fetching photos:', error);
    }
  };

  return (
    <div>
      <h1>Photos for ID: {id}</h1>
    </div>
  );
};

export default PhotoPage;
