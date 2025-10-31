// Di dalam file: src/components/FavoriteTable.jsx

import React, { useState, useEffect } from 'react';
import styles from './FavoriteTable.module.css';

const OBJECT_API_URL = "https://collectionapi.metmuseum.org/public/collection/v1/objects/";

function FavoriteTable({ favoriteIDs }) {
  // State untuk menyimpan data artwork yang sudah di-fetch detailnya
  const [favoriteArtworks, setFavoriteArtworks] = useState([]);
  const [loading, setLoading] = useState(true);

  // useEffect ini akan berjalan setiap kali 'favoriteIDs' (dari App.jsx) berubah
  useEffect(() => {
    // Jika tidak ada favorit, jangan lakukan apa-apa
    if (!favoriteIDs || favoriteIDs.length === 0) {
      setFavoriteArtworks([]); // Kosongkan daftar
      setLoading(false);
      return;
    }

    setLoading(true);
    
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

    // Kita gunakan Promise.all untuk fetch semua detail favorit
    const fetchAllFavorites = async () => {
      const promises = favoriteIDs.map(id => fetchArtworkDetail(id));
      const results = await Promise.all(promises);
      
      // Filter hasil yang null (gagal fetch)
      setFavoriteArtworks(results.filter(art => art != null));
      setLoading(false);
    };

    fetchAllFavorites();
    
  }, [favoriteIDs]); // Dependensi: jalankan ulang jika favoriteIDs berubah

  // --- Render ---
  
  return (
    <div className={styles.tableContainer}>
      <h2 className={styles.title}>Tabel Favorit Dinamis (CPMK0501)</h2>
      
      {/* Tampilkan loading jika sedang mengambil data */}
      {loading && <p className={styles.message}>Memuat data favorit...</p>}
      
      {/* Tampilkan pesan jika tidak ada favorit DAN tidak sedang loading */}
      {!loading && favoriteArtworks.length === 0 && (
        <p className={styles.message}>Anda belum memiliki favorit.</p>
      )}

      {/* Tampilkan tabel HANYA jika ada data DAN tidak sedang loading */}
      {!loading && favoriteArtworks.length > 0 && (
        <table className={styles.table}>
          <thead>
            <tr>
              {/* Kolom 1 */}
              <th>Judul Karya</th>
              {/* Kolom 2 */}
              <th>Artis</th>
              {/* Kolom 3 */}
              <th>Tanggal</th>
            </tr>
          </thead>
          <tbody>
            {favoriteArtworks.map(artwork => (
              <tr key={artwork.objectID}>
                <td>{artwork.title || "Judul tidak diketahui"}</td>
                <td>{artwork.artistDisplayName || "Artis tidak diketahui"}</td>
                <td>{artwork.objectDate || "Tanggal tidak diketahui"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default FavoriteTable;