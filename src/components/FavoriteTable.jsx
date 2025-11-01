import React, { useState, useEffect } from 'react';
import styles from './FavoriteTable.module.css';

const OBJECT_API_URL = "https://collectionapi.metmuseum.org/public/collection/v1/objects/";

function FavoriteTable({ favoriteIDs, onToggleFavorite }) {
  const [favoriteArtworks, setFavoriteArtworks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!favoriteIDs || favoriteIDs.length === 0) {
      setFavoriteArtworks([]);
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

    const fetchAllFavorites = async () => {
      const promises = favoriteIDs.map(id => fetchArtworkDetail(id));
      const results = await Promise.all(promises);
      
      setFavoriteArtworks(results.filter(art => art != null));
      setLoading(false);
    };

    fetchAllFavorites();
    
  }, [favoriteIDs]);
  
  return (
    <div className={styles.tableContainer}>
      <h2 className={styles.title}>Tabel Favorit</h2>
      
      {loading && <p className={styles.message}>Memuat data favorit...</p>}
      
      {!loading && favoriteArtworks.length === 0 && (
        <p className={styles.message}>Anda belum memiliki favorit.</p>
      )}

      {!loading && favoriteArtworks.length > 0 && (
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Judul Karya</th>
              <th>Artis</th>
              <th>Tanggal</th>
              {/* Kolom 4: Aksi */}
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {favoriteArtworks.map(artwork => (
              <tr key={artwork.objectID}>
                <td>{artwork.title || "Judul tidak diketahui"}</td>
                <td>{artwork.artistDisplayName || "Artis tidak diketahui"}</td>
                <td>{artwork.objectDate || "Tanggal tidak diketahui"}</td>
                <td>
                  <button 
                    className={styles.deleteButton}
                    onClick={() => onToggleFavorite(artwork.objectID)}
                  >
                    Hapus
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default FavoriteTable;