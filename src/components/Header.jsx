// src/components/Header.jsx
import React from 'react';
import styles from './Header.module.css';

function Header({ onNavigate }) {
  return (
    <header className={styles.headerContainer}>
      <h1 className={styles.title}>Museum Collection Explorer</h1>
      
      <div className={styles.buttonGroup}>
        <button 
          className={styles.navButton}
          onClick={() => onNavigate('favorites')}
        >
          📚 Daftar Favorit
        </button>
        <button 
          className={styles.navButton}
          onClick={() => onNavigate('feedback')}
        >
          ✉️ Berikan Feedback
        </button>
      </div>
    </header>
  );
}

export default Header;