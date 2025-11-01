// src/App.jsx
import React, { useState, useEffect } from 'react';
import Header from './components/Header.jsx';
import SearchForm from './components/SearchForm.jsx';
import ArtworkGrid from './components/ArtworkGrid.jsx';
import FavoriteTable from './components/FavoriteTable.jsx';

const SEARCH_API_URL = "https://collectionapi.metmuseum.org/public/collection/v1/search";

const getInitialFavorites = () => {
  const savedFavorites = localStorage.getItem('my-favorites');
  return savedFavorites ? JSON.parse(savedFavorites) : [];
};

function App() {
  const [currentView, setCurrentView] = useState('search');
  const [objectIDs, setObjectIDs] = useState(null);
  const [isSearching, setIsSearching] = useState(false);
  const [searchError, setSearchError] = useState(null);
  const [hasSearched, setHasSearched] = useState(false);
  const [favorites, setFavorites] = useState(getInitialFavorites);

  useEffect(() => {
    localStorage.setItem('my-favorites', JSON.stringify(favorites));
  }, [favorites]);

  const handleSearch = async (keyword, departmentId) => {
    setCurrentView('search');
    setIsSearching(true);
    setSearchError(null);
    setObjectIDs(null);
    setHasSearched(true);

    let url = `${SEARCH_API_URL}?q=${encodeURIComponent(keyword)}&hasImages=true`;
    if (departmentId) {
      url += `&departmentId=${departmentId}`;
    }

    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error('Pencarian API gagal');
      
      const data = await response.json();
      setObjectIDs(data.objectIDs || []);
      
    } catch (err) {
      setSearchError(err.message);
      setObjectIDs([]);
    } finally {
      setIsSearching(false);
    }
  };

  const toggleFavorite = (artworkID) => {
    setFavorites(prevFavorites => {
      if (prevFavorites.includes(artworkID)) {
        return prevFavorites.filter(id => id !== artworkID);
      } else {
        return [...prevFavorites, artworkID];
      }
    });
  };

  const handleNavigation = (view) => {
    setCurrentView(view);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div style={{ minHeight: '100vh', paddingBottom: '40px' }}>
      <Header onNavigate={handleNavigation} currentView={currentView} />
      
      {currentView === 'search' && (
        <>
          <SearchForm onSearch={handleSearch} />

          {!hasSearched && !isSearching && (
            <div style={{
              textAlign: 'center',
              padding: '60px 20px',
              maxWidth: '600px',
              margin: '0 auto'
            }}>
              <h2 style={{
                fontSize: '2rem',
                fontWeight: '700',
                color: '#1f2937',
                marginBottom: '16px'
              }}>
                🎨 Selamat Datang
              </h2>
              <p style={{
                fontSize: '1.1rem',
                color: '#6b7280',
                lineHeight: '1.6'
              }}>
                Temukan ribuan karya seni dari Metropolitan Museum of Art.
                Gunakan form pencarian di atas untuk memulai.
              </p>
            </div>
          )}

          {isSearching && (
            <div style={{ 
              textAlign: 'center',
              padding: '50px 20px',
              color: '#3b82f6'
            }}>
              <div style={{
                width: '48px',
                height: '48px',
                margin: '0 auto 16px',
                border: '3px solid #bfdbfe',
                borderTop: '3px solid #3b82f6',
                borderRadius: '50%',
                animation: 'spin 1s linear infinite'
              }}></div>
              <p style={{ fontSize: '1.1rem', fontWeight: '600' }}>
                Mencari karya seni...
              </p>
            </div>
          )}
          
          {searchError && (
            <div style={{ 
              color: '#ef4444',
              background: '#fef2f2',
              border: '1px solid #fecaca',
              padding: '20px',
              textAlign: 'center',
              fontSize: '1rem',
              fontWeight: '600',
              borderRadius: '12px',
              margin: '30px auto',
              maxWidth: '600px'
            }}>
              ⚠️ Error: {searchError}
            </div>
          )}
          
          {hasSearched && objectIDs && objectIDs.length > 0 && (
            <>
              <div style={{
                textAlign: 'center',
                margin: '30px 0 20px'
              }}>
                <h2 style={{
                  fontSize: '1.5rem',
                  fontWeight: '700',
                  color: '#1f2937'
                }}>
                  ✨ Hasil Pencarian
                </h2>
                <p style={{
                  color: '#6b7280',
                  fontSize: '1rem'
                }}>
                  Ditemukan {objectIDs.length > 20 ? '20+' : objectIDs.length} karya seni
                </p>
              </div>
              <ArtworkGrid 
                objectIDs={objectIDs} 
                favorites={favorites}
                onToggleFavorite={toggleFavorite} 
              />
            </>
          )}

          {hasSearched && objectIDs && objectIDs.length === 0 && !isSearching && (
            <div style={{
              textAlign: 'center',
              padding: '50px 20px',
              maxWidth: '600px',
              margin: '30px auto',
              background: '#ffffff',
              borderRadius: '12px',
              border: '1px solid #e5e7eb'
            }}>
              <div style={{ fontSize: '3rem', marginBottom: '16px' }}>🔍</div>
              <h3 style={{
                fontSize: '1.3rem',
                fontWeight: '700',
                color: '#374151',
                marginBottom: '12px'
              }}>
                Tidak Ada Hasil
              </h3>
              <p style={{
                color: '#6b7280',
                fontSize: '1rem'
              }}>
                Coba gunakan keyword lain atau pilih departemen berbeda.
              </p>
            </div>
          )}
        </>
      )}

      {currentView === 'favorites' && (
        <div style={{ padding: '20px 0' }}>
          <div style={{
            textAlign: 'center',
            marginBottom: '30px'
          }}>
            <h2 style={{
              fontSize: '2rem',
              fontWeight: '700',
              color: '#1f2937',
              marginBottom: '12px'
            }}>
              💙 Koleksi Favorit Saya
            </h2>
            <p style={{
              color: '#6b7280',
              fontSize: '1.1rem',
              fontWeight: '600'
            }}>
              Total: {favorites.length} karya seni
            </p>
          </div>
          <FavoriteTable favoriteIDs={favorites} />
        </div>
      )}

      <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}

export default App;