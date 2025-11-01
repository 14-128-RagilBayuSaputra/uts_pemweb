// Di dalam file: src/components/ArtworkGrid.jsx (VERSI FINAL - MENGURANGI JUMLAH FETCH)

import React, { useState, useEffect } from 'react';
import ArtworkCard from './ArtworkCard';
import styles from './ArtworkGrid.module.css';

const OBJECT_API_URL = "https://collectionapi.metmuseum.org/public/collection/v1/objects/";

// Fungsi helper untuk memberi jeda
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

function ArtworkGrid({ objectIDs, favorites, onToggleFavorite }) {
  const [artworks, setArtworks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!objectIDs || objectIDs.length === 0) {
      setArtworks([]);
      setLoading(false);
      return;
    }

    setLoading(true);
    
    const fetchArtworkDetail = async (id) => {
      try {
        const response = await fetch(`${OBJECT_API_URL}${id}`);
        if (!response.ok) throw new Error('Gagal fetch detail objek');
        return await response.json();
      } catch (error) {
        console.error(`Gagal fetch ${id}:`, error);
        return null;
      }
    };

    const fetchAllDetails = async () => {
      // --- INI PERUBAHANNYA ---
      // Kita kurangi jumlah data yang diambil dari 20 menjadi 12
      const idsToFetch = objectIDs.slice(0, 12); 
      const results = [];
      
      for (const id of idsToFetch) {
        const artworkDetail = await fetchArtworkDetail(id);
        
        if (artworkDetail != null) {
          results.push(artworkDetail);
        }

        // Kita tetap pertahankan jeda 250ms untuk "sopan" ke server
        await delay(250); 
      }
      
      setArtworks(results);
      setLoading(false);
    };

    fetchAllDetails();
    
  }, [objectIDs]);

  
  if (loading) {
    return <div className={styles.message}>Memuat hasil karya seni...</div>;
  }
  
  if (!loading && artworks.length === 0) {
    return <div className={styles.message}>Tidak ada hasil yang ditemukan.</div>;
  }
  
  return (
    <div className={styles.gridContainer}>
      {artworks.map(artwork => {
        const isFavorite = favorites.includes(artwork.objectID);
        
        return (
          <ArtworkCard 
            key={artwork.objectID} 
            artwork={artwork}
            isFavorite={isFavorite}
            onToggleFavorite={onToggleFavorite} 
          />
        );
      })}
    </div>
  );
}

export default ArtworkGrid;