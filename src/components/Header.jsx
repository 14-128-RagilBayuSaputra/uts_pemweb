// src/components/Header.jsx (VERSI PERBAIKAN FINAL UI)
import React from 'react';
import styles from './Header.module.css';

function Header({ onNavigate, currentView }) {
  return (
    <header className={styles.headerContainer}>
      <div className={styles.headerWrapper}>
        {/* --- PERUBAHAN TEKS --- */}
        <h1 className={styles.title}>Karya Seni</h1>
        
        <div className={styles.buttonGroup}>
          <button 
            className={`${styles.navButton} ${currentView === 'search' ? styles.active : ''}`}
            onClick={() => onNavigate('search')}
          >
            Beranda
          </button>
          <button 
            className={`${styles.navButton} ${currentView === 'favorites' ? styles.active : ''}`}
            onClick={() => onNavigate('favorites')}
          >
            Favorit
          </button>
        </div>
      </div>
    </header>
  );
}

export default Header;