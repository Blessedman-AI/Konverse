import Image from 'next/image';
import styles from './footer.module.css';
import Link from 'next/link';

const Footer = () => {
  return (
    <div className={styles.container}>
      <div className={styles.info}>
        <div className={styles.logoContainer}>
          <Image
            src="/images/cc.jpg"
            alt="Beemhan's blog"
            width={50}
            height={50}
            className={styles.logo}
          ></Image>
          <h1 className={styles.logoText}>Beemhan's blog</h1>
        </div>
        <p className={styles.description}>
          "Neque porro quisquam est qui dolorem ipsum quia dolor sit amet,
          consectetur, adipisci vel "Neque porro quisquam est qui dolorem
          ipsum quia dolor sit amet, consectetur, adipisci vel
        </p>
        <div className={styles.icons}>
          <Image
            src="/images/facebook.png"
            alt=""
            width={18}
            height={18}
          />
          <Image
            src="/images/instagram.png"
            alt=""
            width={18}
            height={18}
          />
          <Image src="/images/twitter.png" alt="" width={18} height={18} />
          <Image src="/images/youtube.png" alt="" width={18} height={18} />
        </div>
      </div>

      <div className={styles.links}>
        <div className={styles.list}>
          <h2 className={styles.listTitle}>Links</h2>
          <Link href="/">Homepage</Link>
          <Link href="/">Blog</Link>
          <Link href="/">About</Link>
          <Link href="/">Contacts</Link>
        </div>
        <div className={styles.list}>
          <h2 className={styles.listTitle}>Tags</h2>
          <Link href="/">Style</Link>
          <Link href="/">Fashion</Link>
          <Link href="/">Coding</Link>
          <Link href="/">Travel</Link>
        </div>
        <div className={styles.list}>
          <h2 className={styles.listTitle}>Social</h2>
          <Link href="/">Facebook</Link>
          <Link href="/">Instagram</Link>
          <Link href="/">TikTok</Link>
          <Link href="/">Youtube</Link>
        </div>
      </div>
    </div>
  );
};

export default Footer;
