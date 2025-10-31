// Di dalam file: src/components/ArtworkGrid.jsx (VERSI LENGKAP)

import React, { useState, useEffect } from 'react';
import ArtworkCard from './ArtworkCard';
import styles from './ArtworkGrid.module.css';

const OBJECT_API_URL = "https://collectionapi.metmuseum.org/public/collection/v1/objects/";

// 1. Terima props baru: objectIDs, favorites, onToggleFavorite
function ArtworkGrid({ objectIDs, favorites, onToggleFavorite }) {
  // State untuk menyimpan data artwork yang sudah di-fetch detailnya
  const [artworks, setArtworks] = useState([]);
  const [loading, setLoading] = useState(true);

  // useEffect ini akan berjalan setiap kali 'objectIDs' (hasil pencarian) berubah
  useEffect(() => {
    // Jika tidak ada hasil (null) atau hasilnya array kosong, jangan lakukan apa-apa
    if (!objectIDs || objectIDs.length === 0) {
      setArtworks([]); // Set artwork jadi array kosong
      setLoading(false); // Selesai loading
      return; // Hentikan eksekusi
    }

    setLoading(true); // Mulai loading jika ada objectIDs
    
    // Fungsi untuk fetch detail dari satu ID
    const fetchArtworkDetail = async (id) => {
      try {
        const response = await fetch(`${OBJECT_API_URL}${id}`);
        if (!response.ok) throw new Error('Gagal fetch detail objek');
        return await response.json();
      } catch (error) {
        console.error(`Gagal fetch ${id}:`, error);
        return null; // Kembalikan null jika gagal
      }
    };

    // Kita gunakan Promise.all untuk fetch semua detail secara paralel
    const fetchAllDetails = async () => {
      // Kita batasi hanya 20 hasil pertama agar tidak terlalu berat
      const idsToFetch = objectIDs.slice(0, 20); 
      
      const promises = idsToFetch.map(id => fetchArtworkDetail(id));
      const results = await Promise.all(promises);
      
      // Filter hasil yang null (gagal fetch)
      setArtworks(results.filter(art => art != null));
      setLoading(false); // Selesai loading setelah semua data di-fetch
    };

    fetchAllDetails();
    
  }, [objectIDs]); // Dependensi: jalankan ulang jika objectIDs berubah

  // --- Render ---
  
  // Tampilkan loading HANYA jika sedang loading
  if (loading) {
    return <div className={styles.message}>Memuat hasil karya seni...</div>;
  }
  
  // Tampilkan pesan "Tidak ada hasil" HANYA jika loading selesai DAN artwork kosong
  if (!loading && artworks.length === 0) {
    return <div className={styles.message}>Tidak ada hasil yang ditemukan.</div>;
  }
  
  // Ini adalah CSS Grid
  return (
    <div className={styles.gridContainer}>
      {artworks.map(artwork => {
        // 2. Cek apakah artwork ini ada di daftar favorit
        const isFavorite = favorites.includes(artwork.objectID);
        
        return (
          // 3. Kirim semua props-nya ke ArtworkCard
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