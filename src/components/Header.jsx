// src/components/Header.jsx
import React from 'react';
import styles from './Header.module.css';

function Header({ onNavigate, currentView }) {
  return (
    <header className={styles.headerContainer}>
      <h1 className={styles.title}>Museum Collection Explorer</h1>
      
      <div className={styles.buttonGroup}>
        <button 
          className={`${styles.navButton} ${currentView === 'search' ? styles.active : ''}`}
          onClick={() => onNavigate('search')}
        >
          🏠 Beranda
        </button>
        <button 
          className={`${styles.navButton} ${currentView === 'favorites' ? styles.active : ''}`}
          onClick={() => onNavigate('favorites')}
        >
          💙 Favorit
        </button>
      </div>
    </header>
  );
}

export default Header;