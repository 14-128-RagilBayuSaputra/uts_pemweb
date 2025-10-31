import React from 'react';
import styles from './Header.module.css';

function Header() {
  return (
    /* Pastikan di sini 'styles.headerContainer' */
    <div className={styles.headerContainer}> 
      {/* Pastikan di sini 'styles.title' */ }
      <h1 className={styles.title}>
        Museum Collection Explorer
      </h1>
    </div>
  );
}

export default Header;