import styles from './card.module.css';
import Image from 'next/image';
import Link from 'next/link';
import { formatDate } from '../../../utils/dateUtils';

const Card = ({ item }) => {
  // console.log(item);
  const formattedDate = formatDate(item.createdAt);

  return (
    // <div className={styles.container} key={key}>
    <div className={styles.container}>
      {item.img && (
        <div className={styles.imageContainer}>
          <Image src={item.img} alt="" fill className={styles.image} />
        </div>
      )}

      <div className={styles.textContainer}>
        <div className={styles.details}>
          <span>Posted by {item.user.name}</span>{' '}
          <div className={styles.innerDetails}>
            <span className={styles.date}>{formattedDate} </span>
            <span className={styles.category}>{item.catSlug}</span>
          </div>
        </div>
        <Link href={`/posts/${item.slug}`}>
          <h2>{item.title}</h2>
        </Link>
        <p className={styles.desc}>
          {item.desc.substring(0, 100) + '...'}
        </p>
        <Link href={`/posts/${item.slug}`} className={styles.link}>
          Read More
        </Link>
      </div>
    </div>
  );
};

export default Card;
