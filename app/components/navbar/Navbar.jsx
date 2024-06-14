import styles from './navbar.module.css';
import Image from 'next/image';
import Link from 'next/link';
import ThemeToggle from '../themeToggle/ThemeToggle';
import AuthLinks from '../authLinks/AuthLinks';

const Navbar = () => {
  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        {/* <div className={styles.social}>
        <Image
          src="/Images/facebook.png"
          alt="facebook icon"
          width={24}
          height={24}
        />

        <Image
          src="/Images/instagram.png"
          alt="instagram icon"
          width={24}
          height={24}
        />
        <Image
          src="/Images/twitter.png"
          alt="twitter icon"
          width={24}
          height={24}
        />
        <Image
          src="/Images/youtube.png"
          alt="youtube icon"
          width={24}
          height={24}
        />
      </div> */}
        <Link href="/" className={styles.logo}>
          KonVerse
        </Link>
        <div className={styles.links}>
          <ThemeToggle />
          <Link href="/" className={styles.link}>
            Homepage
          </Link>
          <Link href="/" className={styles.link}>
            Contact
          </Link>
          <Link href="/" className={styles.link}>
            About
          </Link>
          <AuthLinks />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
