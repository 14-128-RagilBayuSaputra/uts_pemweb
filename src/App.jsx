// Di dalam file: src/App.jsx (VERSI FINAL SEMUA KOMPONEN)

import React, { useState, useEffect } from 'react';
import Header from './components/Header.jsx';
import SearchForm from './components/SearchForm.jsx';
import ArtworkGrid from './components/ArtworkGrid.jsx';
import RequirementForm from './components/RequirementForm.jsx';
import FavoriteTable from './components/FavoriteTable.jsx'; // 1. Impor komponen tabel baru

const SEARCH_API_URL = "https://collectionapi.metmuseum.org/public/collection/v1/search";

// Fungsi helper untuk membaca dari localStorage
const getInitialFavorites = () => {
  const savedFavorites = localStorage.getItem('my-favorites');
  return savedFavorites ? JSON.parse(savedFavorites) : [];
};

function App() {
  // State untuk hasil pencarian
  const [objectIDs, setObjectIDs] = useState(null);
  const [isSearching, setIsSearching] = useState(false);
  const [searchError, setSearchError] = useState(null);

  // State untuk daftar favorit
  const [favorites, setFavorites] = useState(getInitialFavorites);

  // useEffect untuk MENYIMPAN ke localStorage setiap kali 'favorites' berubah
  useEffect(() => {
    localStorage.setItem('my-favorites', JSON.stringify(favorites));
  }, [favorites]); // Dependensi: jalankan ulang jika 'favorites' berubah

  // Fungsi untuk menangani pencarian
  const handleSearch = async (keyword, departmentId) => {
    setIsSearching(true);
    setSearchError(null);
    setObjectIDs(null); 

    let url = `${SEARCH_API_URL}?q=${encodeURIComponent(keyword)}&hasImages=true`;
    if (departmentId) {
      url += `&departmentId=${departmentId}`;
    }

    console.log("Mencari dengan URL:", url); // Log untuk debug

    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error('Pencarian API gagal');
      
      const data = await response.json();

      console.log("API Merespon:", data); // Log untuk debug
      
      setObjectIDs(data.objectIDs || []); 
      
    } catch (err) {
      setSearchError(err.message);
      setObjectIDs([]); 
    } finally {
      setIsSearching(false); 
    }
  };

  // Fungsi untuk menambah/menghapus favorit
  const toggleFavorite = (artworkID) => {
    setFavorites(prevFavorites => {
      if (prevFavorites.includes(artworkID)) {
        return prevFavorites.filter(id => id !== artworkID);
      } else {
        return [...prevFavorites, artworkID];
      }
    });
  };

  // --- Render Tampilan ---
  return (
    <div>
      <Header />
      <SearchForm onSearch={handleSearch} />

      <h2 style={{color: 'white', textAlign: 'center'}}>
        Total Favorit: {favorites.length}
      </h2>

      {/* 2. Tampilkan FavoriteTable di sini */}
      {/* Kita kirim 'favorites' (daftar ID) sebagai prop 'favoriteIDs' */}
      <FavoriteTable favoriteIDs={favorites} />

      {/* Tampilan Loading atau Error Pencarian */}
      {isSearching && <div style={{ color: 'white', padding: '20px', textAlign: 'center' }}>Mencari...</div>}
      {searchError && <div style={{ color: 'red', padding: '20px', textAlign: 'center' }}>Error: {searchError}</div>}
      
      {/* Tampilan Grid Hasil Pencarian */}
      {objectIDs && (
        <ArtworkGrid 
          objectIDs={objectIDs} 
          favorites={favorites}
          onToggleFavorite={toggleFavorite} 
        />
      )}

      {/* Komponen Form 5-Input (Untuk Syarat CPMK) */}
      <RequirementForm />
    </div>
  );
}

export default App;