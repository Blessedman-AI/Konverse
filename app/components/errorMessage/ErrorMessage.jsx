import React, { useState, useEffect } from 'react';
import styles from './errorMessage.module.css';

export const ServerError = ({ message }) => {
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

export const ClientError = ({ message }) => {
  const [showMsg, setShowMsg] = useState(true);

  useEffect(() => {
    const timeoutId = setTimeout(() => setShowMsg(false), 3000);
    return () => clearTimeout(timeoutId);
  }, []);

  return (
    showMsg && (
      <div className={styles.container}>
        <p className={styles.message}>{message}</p>
      </div>
    )
  );
};

export const CategoryErrorMessage = ({ message }) => {
  const [showCatErrMsg, setCatErrMsg] = useState(true);

  useEffect(() => {
    const timeoutId = setTimeout(() => setCatErrMsg(false), 3000);
    return () => clearTimeout(timeoutId);
  }, []);

  return (
    showCatErrMsg && (
      <div className={styles.container}>
        <p className={styles.message}>{message}</p>
      </div>
    )
  );
};
