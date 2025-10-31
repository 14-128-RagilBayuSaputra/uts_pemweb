// Di dalam file: src/components/ArtworkCard.jsx

import React from 'react';
import styles from './ArtworkCard.module.css';

// 1. Terima props baru: 'isFavorite' dan 'onToggleFavorite'
function ArtworkCard({ artwork, isFavorite, onToggleFavorite }) {
  
  const imageUrl = artwork.primaryImageSmall || 'https://via.placeholder.com/300x400.png?text=No+Image';
  
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