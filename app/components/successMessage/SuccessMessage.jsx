import React, { useState, useEffect } from 'react';
import styles from './successMessage.module.css';

const SuccessMessage = ({ message }) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timeoutId = setTimeout(() => setVisible(false), 3000);
    return () => clearTimeout(timeoutId);
  }, []);

  return (
    visible && (
      <div className={styles.container}>
        <p className={styles.message}>{message}</p>
      </div>
    )
  );
};

export default SuccessMessage;
