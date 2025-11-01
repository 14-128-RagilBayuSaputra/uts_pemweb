import React, { useState, useEffect } from 'react';
import styles from './SearchForm.module.css';

const API_URL = "https://collectionapi.metmuseum.org/public/collection/v1/departments";

function SearchForm({ onSearch }) {
  const [departments, setDepartments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [keyword, setKeyword] = useState("");
  const [selectedDept, setSelectedDept] = useState("");

  useEffect(() => {
    async function fetchDepartments() {
      try {
        const response = await fetch(API_URL);
        if (!response.ok) {
          throw new Error('Gagal mengambil data departemen');
        }
        const data = await response.json();
        setDepartments(data.departments);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    }

    fetchDepartments();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(keyword, selectedDept);
  };

  if (isLoading) {
    return <div className={styles.loading}>Memuat departemen...</div>;
  }

  if (error) {
    return <div className={styles.error}>Error: {error}</div>;
  }

  return (
    <form className={styles.formContainer} onSubmit={handleSubmit}>
      <div className={styles.formGroup}>
        <label htmlFor="keyword">Cari berdasarkan Keyword:</label>
        <input 
          type="text" 
          id="keyword" 
          className={styles.input}
          placeholder="Contoh: The Mona Lisa"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)} 
        />
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="department">Pilih Departemen:</label>
        <select 
          id="department" 
          className={styles.select}
          value={selectedDept}
          onChange={(e) => setSelectedDept(e.target.value)}
        >
          <option value="">Semua Departemen</option>
          {departments.map(dept => (
            <option key={dept.departmentId} value={dept.departmentId}>
              {dept.displayName}
            </option>
          ))}
        </select>
      </div>

      <button type="submit" className={styles.button}>
        Cari
      </button>
    </form>
  );
}

export default SearchForm;