// src/App.jsx
import React, { useState, useEffect } from 'react';
import Header from './components/Header.jsx';
import SearchForm from './components/SearchForm.jsx';
import ArtworkGrid from './components/ArtworkGrid.jsx';
import RequirementForm from './components/RequirementForm.jsx';
import FavoriteTable from './components/FavoriteTable.jsx';

const SEARCH_API_URL = "https://collectionapi.metmuseum.org/public/collection/v1/search";

const getInitialFavorites = () => {
  const savedFavorites = localStorage.getItem('my-favorites');
  return savedFavorites ? JSON.parse(savedFavorites) : [];
};

function App() {
  // State untuk navigasi/view
  const [currentView, setCurrentView] = useState('search'); // 'search', 'favorites', 'feedback'
  
  // State untuk hasil pencarian
  const [objectIDs, setObjectIDs] = useState(null);
  const [isSearching, setIsSearching] = useState(false);
  const [searchError, setSearchError] = useState(null);
  
  // State untuk track apakah sudah pernah search
  const [hasSearched, setHasSearched] = useState(false);

  // State untuk daftar favorit
  const [favorites, setFavorites] = useState(getInitialFavorites);

  useEffect(() => {
    localStorage.setItem('my-favorites', JSON.stringify(favorites));
  }, [favorites]);

  const handleSearch = async (keyword, departmentId) => {
    setCurrentView('search');
    setIsSearching(true);
    setSearchError(null);
    setObjectIDs(null);
    setHasSearched(true); // Tandai sudah pernah search

    let url = `${SEARCH_API_URL}?q=${encodeURIComponent(keyword)}&hasImages=true`;
    if (departmentId) {
      url += `&departmentId=${departmentId}`;
    }

    console.log("Mencari dengan URL:", url);

    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error('Pencarian API gagal');
      
      const data = await response.json();
      console.log("API Merespon:", data);
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
    <div style={{ 
      minHeight: '100vh',
      paddingBottom: '60px'
    }}>
      <Header onNavigate={handleNavigation} />
      
      {/* Search Form - Selalu Tampil di View Search */}
      {currentView === 'search' && (
        <>
          <SearchForm onSearch={handleSearch} />

          {/* Welcome Message - Hanya tampil jika belum pernah search */}
          {!hasSearched && !isSearching && (
            <div style={{
              textAlign: 'center',
              padding: '60px 20px',
              maxWidth: '700px',
              margin: '0 auto',
              animation: 'fadeIn 0.8s ease-out'
            }}>
              <h2 style={{
                fontSize: '2.5rem',
                fontWeight: '800',
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                marginBottom: '20px'
              }}>
                🎨 Selamat Datang!
              </h2>
              <p style={{
                fontSize: '1.2rem',
                color: '#6b7280',
                lineHeight: '1.8',
                fontWeight: '500'
              }}>
                Temukan ribuan karya seni dari Metropolitan Museum of Art.
                Mulai pencarian Anda dengan memasukkan keyword atau memilih departemen di atas.
              </p>
            </div>
          )}

          {/* Loading State */}
          {isSearching && (
            <div style={{ 
              textAlign: 'center',
              padding: '60px 20px',
              fontSize: '1.3rem',
              fontWeight: '600',
              color: '#667eea',
              animation: 'pulse 1.5s ease-in-out infinite'
            }}>
              <div style={{
                width: '60px',
                height: '60px',
                margin: '0 auto 20px',
                border: '4px solid rgba(102, 126, 234, 0.2)',
                borderTop: '4px solid #667eea',
                borderRadius: '50%',
                animation: 'spin 1s linear infinite'
              }}></div>
              Mencari karya seni yang menakjubkan...
            </div>
          )}
          
          {/* Error State */}
          {searchError && (
            <div style={{ 
              color: '#ef4444',
              background: 'rgba(239, 68, 68, 0.1)',
              border: '2px solid rgba(239, 68, 68, 0.3)',
              padding: '30px',
              textAlign: 'center',
              fontSize: '1.1rem',
              fontWeight: '600',
              borderRadius: '16px',
              margin: '40px auto',
              maxWidth: '600px',
              animation: 'shake 0.5s ease-out'
            }}>
              ⚠️ Error: {searchError}
            </div>
          )}
          
          {/* Results Grid - Hanya tampil jika sudah search dan ada hasil */}
          {hasSearched && objectIDs && objectIDs.length > 0 && (
            <>
              <div style={{
                textAlign: 'center',
                margin: '40px 0 20px',
                animation: 'fadeIn 0.6s ease-out'
              }}>
                <h2 style={{
                  fontSize: '2rem',
                  fontWeight: '800',
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}>
                  ✨ Hasil Pencarian
                </h2>
                <p style={{
                  color: '#6b7280',
                  fontSize: '1.1rem',
                  fontWeight: '500'
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

          {/* No Results */}
          {hasSearched && objectIDs && objectIDs.length === 0 && !isSearching && (
            <div style={{
              textAlign: 'center',
              padding: '60px 20px',
              maxWidth: '600px',
              margin: '40px auto',
              background: 'rgba(255, 255, 255, 0.8)',
              borderRadius: '20px',
              border: '2px solid rgba(102, 126, 234, 0.2)',
              animation: 'fadeIn 0.6s ease-out'
            }}>
              <div style={{ fontSize: '4rem', marginBottom: '20px' }}>🔍</div>
              <h3 style={{
                fontSize: '1.5rem',
                fontWeight: '700',
                color: '#374151',
                marginBottom: '15px'
              }}>
                Tidak Ada Hasil
              </h3>
              <p style={{
                color: '#6b7280',
                fontSize: '1.1rem'
              }}>
                Coba gunakan keyword lain atau pilih departemen berbeda.
              </p>
            </div>
          )}
        </>
      )}

      {/* Favorites View */}
      {currentView === 'favorites' && (
        <div style={{ 
          padding: '40px 20px',
          animation: 'fadeIn 0.6s ease-out'
        }}>
          <div style={{
            textAlign: 'center',
            marginBottom: '40px'
          }}>
            <h2 style={{
              fontSize: '2.5rem',
              fontWeight: '800',
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              marginBottom: '15px'
            }}>
              💙 Koleksi Favorit Saya
            </h2>
            <p style={{
              color: '#6b7280',
              fontSize: '1.2rem',
              fontWeight: '600'
            }}>
              Total: {favorites.length} karya seni
            </p>
          </div>
          <FavoriteTable favoriteIDs={favorites} />
        </div>
      )}

      {/* Feedback View */}
      {currentView === 'feedback' && (
        <div style={{ animation: 'fadeIn 0.6s ease-out' }}>
          <RequirementForm />
        </div>
      )}

      <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-10px); }
          75% { transform: translateX(10px); }
        }
      `}</style>
    </div>
  );
}

export default App;