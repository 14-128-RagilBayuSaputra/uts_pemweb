// Di dalam file: src/components/ArtworkCard.jsx (KODE LENGKAP FINAL)

import React from 'react';
import styles from './ArtworkCard.module.css';

// 1. Terima props baru: 'isFavorite' dan 'onToggleFavorite'
function ArtworkCard({ artwork, isFavorite, onToggleFavorite }) {
  
  // Ganti 'via.placeholder.com' ke 'placehold.co' untuk perbaiki error
  const imageUrl = artwork.primaryImageSmall || 'https://placehold.co/300x400?text=No+Image';
  
  // 2. Fungsi handler untuk tombol
  const handleFavoriteClick = () => {
    // Panggil fungsi dari App.jsx dengan ID artwork ini
    onToggleFavorite(artwork.objectID);
  };
  
  return (
    <div className={styles.card}>
      <img 
        src={imageUrl} 
        alt={artwork.title} 
        className={styles.cardImage} 
      />
      <div className={styles.cardBody}>
        <h3 className={styles.cardTitle}>{artwork.title || "Judul tidak diketahui"}</h3>
        <p className={styles.cardArtist}>{artwork.artistDisplayName || "Artis tidak diketahui"}</p>
        <p className={styles.cardDate}>{artwork.objectDate || "Tanggal tidak diketahui"}</p>
        
        {/* Ditambahkan sesuai permintaan soal (Fitur Wajib #4) */}
        <p className={styles.cardMedium}>{artwork.medium || "Medium tidak diketahui"}</p>
        <p className={styles.cardCulture}>{artwork.culture || "Culture tidak diketahui"}</p>
        
        {/* 3. Tambahkan tombol favorit */}
        <button 
          className={styles.favoriteButton}
          onClick={handleFavoriteClick}
        >
          {/* Teks tombol berubah berdasarkan state 'isFavorite' */}
          {isFavorite ? 'Hapus dari Favorit' : 'Tambah ke Favorit'}
        </button>
        
      </div>
    </div>
  );
}

export default ArtworkCard;