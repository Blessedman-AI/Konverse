'use client';

import styles from './themeToggle.module.css';
import Image from 'next/image';
import { useContext } from 'react';
import { ThemeContext } from '../../context/ThemeContext.jsx';
import Link from 'next/link';

const ThemeToggle = () => {
  const { toggle, theme } = useContext(ThemeContext);

  // console.log(theme);

  return (
    <div
      className={styles.container}
      onClick={toggle}
      style={
        theme === 'dark'
          ? { background: 'white' }
          : { background: '#0f172a' }
      }
    >
      <Image src="/Images/sun.png" alt="" width={14} height={14} />
      <div
        className={styles.ball}
        style={
          theme === 'dark'
            ? { left: 1, backgroundColor: '#0f172a' }
            : { right: 1, backgroundColor: 'white' }
        }
      ></div>
      <Image src="/Images/crescent.png" alt="" width={14} height={14} />
    </div>
  );
};

export default ThemeToggle;
