// Di dalam file: src/components/Navigation.jsx

import React from 'react';
import styles from './Navigasi.module.css';

// Komponen ini menerima tab yang sedang aktif dan fungsi untuk mengubah tab
function Navigasi({ activeTab, onTabChange }) {

  // Fungsi helper untuk mendapatkan style class
  // Jika tab sedang aktif, beri style .active
  const getButtonClass = (tabName) => {
    return `${styles.navButton} ${activeTab === tabName ? styles.active : ''}`;
  };

  return (
    <nav className={styles.navContainer}>
      <button 
        className={getButtonClass('search')}
        onClick={() => onTabChange('search')}
      >
        Pencarian
      </button>
      <button 
        className={getButtonClass('favorites')}
        onClick={() => onTabChange('favorites')}
      >
        Favorit Saya
      </button>
      <button 
        className={getButtonClass('form')}
        onClick={() => onTabChange('form')}
      >
        Formulir Syarat
      </button>
    </nav>
  );
}

export default Navigation;
