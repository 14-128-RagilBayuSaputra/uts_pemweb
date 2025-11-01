import React from 'react';
import styles from './Navigasi.module.css';

function Navigasi({ activeTab, onTabChange }) {

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
