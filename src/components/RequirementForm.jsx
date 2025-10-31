// Di dalam file: src/components/RequirementForm.jsx

import React, { useState } from 'react';
// Kita akan gunakan style yang sama dengan SearchForm agar konsisten
import styles from './SearchForm.module.css'; 
// Kita buat style tambahan khusus untuk form ini
import reqStyles from './RequirementForm.module.css';

function RequirementForm() {
  // State untuk menyimpan semua nilai form
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    feedback: '',
    subscribe: false,
    contactMethod: 'email'
  });

  // State untuk menampilkan pesan sukses
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Fungsi generik untuk menangani perubahan pada SEMUA input
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    setFormData(prevData => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Di aplikasi nyata, kita akan kirim 'formData' ke server
    // Di sini kita hanya menampilkan pesan sukses
    console.log("Form 5 Input Disubmit:", formData);
    setIsSubmitted(true);
  };

  // Tampilkan pesan sukses jika sudah disubmit
  if (isSubmitted) {
    return (
      <div className={styles.formContainer}>
        <h2 className={reqStyles.formTitle}>Terima kasih!</h2>
        <p style={{textAlign: 'center'}}>Feedback Anda telah kami terima.</p>
      </div>
    );
  }

  return (
    // Kita gunakan 'styles.formContainer' dari SearchForm untuk tampilan yang sama
    <form className={styles.formContainer} onSubmit={handleSubmit}>
      
      <h2 className={reqStyles.formTitle}>Formulir Wajib (CPMK0501)</h2>
      <p className={reqStyles.formSubtitle}>Form ini dibuat untuk memenuhi syarat 5 input dengan HTML5 Validation.</p>

      {/* Input 1: Text (dengan validation 'required' dan 'minLength') */}
      <div className={styles.formGroup}>
        <label htmlFor="fullName">Nama Lengkap:</label>
        <input
          type="text"
          id="fullName"
          name="fullName"
          className={styles.input}
          value={formData.fullName}
          onChange={handleChange}
          required
          minLength="3"
        />
      </div>

      {/* Input 2: Email (dengan validation 'required' dan 'type="email"') */}
      <div className={styles.formGroup}>
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          name="email"
          className={styles.input}
          value={formData.email}
          onChange={handleChange}
          required
        />
      </div>

      {/* Input 3: Textarea (dengan validation 'required') */}
      <div className={styles.formGroup}>
        <label htmlFor="feedback">Feedback:</label>
        <textarea
          id="feedback"
          name="feedback"
          className={styles.input}
          value={formData.feedback}
          onChange={handleChange}
          required
        />
      </div>

      {/* Input 4: Radio Button (input berkelompok) */}
      <div className={styles.formGroup}>
        <label>Metode Kontak Pilihan:</label>
        <div className={reqStyles.radioGroup}>
          <input
            type="radio"
            id="contactEmail"
            name="contactMethod"
            value="email"
            checked={formData.contactMethod === 'email'}
            onChange={handleChange}
          />
          <label htmlFor="contactEmail">Email</label>
        </div>
        <div className={reqStyles.radioGroup}>
          <input
            type="radio"
            id="contactPhone"
            name="contactMethod"
            value="phone"
            checked={formData.contactMethod === 'phone'}
            onChange={handleChange}
          />
          <label htmlFor="contactPhone">Telepon</label>
        </div>
      </div>
      
      {/* Input 5: Checkbox */}
      <div className={styles.formGroup}>
        <div className={reqStyles.checkboxGroup}>
          <input
            type="checkbox"
            id="subscribe"
            name="subscribe"
            className={reqStyles.checkbox}
            checked={formData.subscribe}
            onChange={handleChange}
          />
          <label htmlFor="subscribe">Saya ingin berlangganan newsletter.</label>
        </div>
      </div>

      <button type="submit" className={styles.button}>
        Kirim Feedback
      </button>
    </form>
  );
}

export default RequirementForm;