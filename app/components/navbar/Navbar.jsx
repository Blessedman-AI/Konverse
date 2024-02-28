import styles from './navbar.module.css';
import Image from 'next/image';
import Link from 'next/link';
import ThemeToggle from '../themeToggle/ThemeToggle';
import AuthLinks from '../authLinks/AuthLinks';



const Navbar = () => {
  return (
    <div className={styles.container}>
      <div className={styles.social}>
        <Image
          src="/images/facebook.png"
          alt="facebook icon"
          width={24}
          height={24}
        />
        <Image
          src="/images/instagram.png"
          alt="instagram icon"
          width={24}
          height={24}
        />
        <Image
          src="/images/twitter.png"
          alt="twitter icon"
          width={24}
          height={24}
        />
        <Image
          src="/images/youtube.png"
          alt="youtube icon"
          width={24}
          height={24}
        />
      </div>
      <div className={styles.logo}>MyBlog</div>
      <div className={styles.links}>
        <ThemeToggle />
        <Link href="/" className={styles.link}>Homepage</Link>
        <Link href="/" className={styles.link}>Contact</Link>
        <Link href="/" className={styles.link}>About</Link>
        <AuthLinks />
      </div>
    </div>
  );
};

export default Navbar;
