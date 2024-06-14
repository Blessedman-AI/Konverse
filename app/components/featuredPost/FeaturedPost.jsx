'use client';

import { useState, useEffect } from 'react';
import styles from './featuredPost.module.css';
import Image from 'next/image';
import Link from 'next/link';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const fetchFeaturedPost = async () => {
  try {
    const response = await fetch(`${API_URL}/api/featuredPost`);
    if (!response.ok) {
      throw new Error('Failed to fetch featured posts');
    }

    const res = await response.json();
    return res.featuredPost;
  } catch (error) {
    console.error(error);
    throw new error('Failed to fetch featured post');
  }
};

const FeaturedPost = () => {
  const [data, setData] = useState();
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await fetchFeaturedPost();
        setData(result);
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  // function truncateString(str, num) {
  //   return str.length > num ? str.substring(0, num) + '...' : str;
  // }

  if (isLoading) {
    return (
      <div className={styles.container}>
        <p>Loading featured post... </p>
      </div>
    );
  }

  // Handle both error and loading states with a unified approach
  if (error || data?.length === 0) {
    return (
      <div className={styles.container}>
        <p className={styles.post}>
          {error
            ? 'Unable to load featured post'
            : 'Featured post is loading. Please wait.'}
        </p>
      </div>
    );
  }

  // console.log(data.user.name);

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>
        <b>Connect Through Content</b> <br />{' '}
        <span className={styles.subtitle}>Explore. Create. Engage.</span>
      </h1>
      <div className={styles.post}>
        <div className={styles.imgContainer}>
          <Image src={data.image} alt="" fill className={styles.image} />
        </div>
        <div className={styles.textContainer}>
          <span className={styles.author}>Posted by {data.user.name}</span>
          <h2 className={styles.postTitle}>{data.title}</h2>
          <p className={styles.postDescription}>
            {data.desc.substring(0, 240) + '...'}
          </p>
          <Link href={`/posts/${data.slug}`} className={styles.button}>
            Read More
          </Link>
        </div>
      </div>
    </div>
  );
};

export default FeaturedPost;
