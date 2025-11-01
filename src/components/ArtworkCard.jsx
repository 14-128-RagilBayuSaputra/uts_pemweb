import React from 'react';
import styles from './ArtworkCard.module.css';

function ArtworkCard({ artwork, isFavorite, onToggleFavorite }) {
  
  const imageUrl = artwork.primaryImageSmall || 'https://placehold.co/300x400?text=No+Image';
  
  const handleFavoriteClick = () => {
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
        
        <p className={styles.cardMedium}>{artwork.medium || "Medium tidak diketahui"}</p>
        <p className={styles.cardCulture}>{artwork.culture || "Culture tidak diketahui"}</p>
        
        <button 
          className={styles.favoriteButton}
          onClick={handleFavoriteClick}
        >
          {isFavorite ? 'Hapus dari Favorit' : 'Tambah ke Favorit'}
        </button>
        
      </div>
    </div>
  );
}

export default ArtworkCard;