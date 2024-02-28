import styles from './featured.module.css';
import Image from 'next/image';
const Featured = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>
        <b>Hey, Beemhan dev here!</b> Discover my stories and creative
        ideas
      </h1>
      <div className={styles.post}>
        <div className={styles.imgContainer}>
          <Image src="/images/island.jpg" alt="" fill className={styles.image} />
        </div>
        <div className={styles.textContainer}>
          <h1 className={styles.postTitle}>
            "Neque porro quisquam est qui dolorem ipsum quia dolor
          </h1>
          <p className={styles.postDescription}>
            "Neque porro quisquam est qui dolorem ipsum quia dolor sit
            amet, consectetur, adipisci velit."Neque porro quisquam est qui
            dolorem ipsum quia dolor sit amet, consectetur, adipisci
            velit."Neque porro quisquam est qui dolorem ipsum quia dolor
            sit amet, consectetur, adipisci velit.
          </p>
          <button className={styles.button}>Read more</button>
        </div>
      </div>
    </div>
  );
};

export default Featured;
