'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import styles from './menuPosts.module.css';
import Image from 'next/image';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const fetchPopularPosts = async () => {
  try {
    const response = await fetch(`${API_URL}/api/popularPosts`);
    if (!response.ok) {
      throw new Error('Failed to fetch popular posts');
    }
    const res = await response.json();
    return res.posts;
  } catch (error) {
    console.error(error);
    throw new Error('Failed to fetch popular posts'); // Rethrow the error to propagate it to the component
  }
};

const MenuPosts = ({ withImage }) => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const result = await fetchPopularPosts();
  //       setData(result);
  //     } catch (error) {
  //       setError(error);
  //     } finally {
  //       setIsLoading(false);
  //     }
  //   };

  //   fetchData();
  // }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await fetchPopularPosts();

        let data = await result.json();

        // Add unique IDs to each item
        data = data.map(item => ({
          ...item,
          uniqueId: crypto.randomUUID(),
        }));

        setData(data);
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  if (error) {
    return;
  }

  if (isLoading) {
    return (
      <div className={styles.items}>
        <p>Loading menu posts... </p>
      </div>
    );
  }

  // Handle both error and loading states with a unified approach
  if (error) {
    return (
      <div className={styles.items}>
        <p className={styles.errorText}>Unable to load menu posts'</p>
      </div>
    );
  }
  // // Handle both error and loading states with a unified approach
  // if (error || data?.length === 0) {
  //   return (
  //     <div className={styles.items}>
  //       <p className={styles.errorText}>
  //         {error
  //           ? 'Unable to load menu posts'
  //           : 'Menu posts are still loading. Please wait.'}
  //       </p>
  //     </div>
  //   );
  // }
  if (data?.length > 0) {
    return (
      <div className={styles.items}>
        {data.map(post => (
          <Link key={post.uniqueId} href="/" className={styles.item}>
            {withImage && (
              <div className={styles.imageContainer}>
                <Image
                  src={post.image || '/Images/df3.png'}
                  alt=""
                  fill
                  className={styles.image}
                />
              </div>
            )}
            <div className={styles.textContainer}>
              <span
                className={`${styles.category} ${styles[post.category]}`}
              >
                {post.category}
              </span>
              <h3 className={styles.postTitle}>{post.title}</h3>
              <p>
                {post.desc.slice(0, 60) +
                  (post.desc.length > 40 ? '...' : '')}
              </p>
              <div className={styles.detail}>
                <span className={styles.username}> {post.user}</span>
                <span className={styles.date}>
                  {' '}
                  - {post.date.split('T')[0]}
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    );
  } else {
    return (
      <div className={styles.container}>
        <p>There are no menu posts to display</p>
      </div>
    );
  }
};

export default MenuPosts;

// import React from 'react';
// import menu from '../menu/Menu.jsx';
// import Link from 'next/link';
// import styles from './menuPosts.module.css';
// import Image from 'next/image';

// const API_URL = process.env.NEXT_PUBLIC_API_URL;

// const fetchPopularPosts = async () => {
//   try {
//     const response = await fetch(`${API_URL}/api/popularPosts`);
//     if (!response.ok) {
//       throw new Error('Failed to fetch popular posts');
//     }
//     const res = await response.json();
//     return res.posts;
//   } catch (error) {
//     console.error(error);
//   }
// };

// const MenuPosts = async ({ withImage }) => {
//   const data = await fetchPopularPosts();
//   // console.log(data);

//   return (
//     <div className={styles.items}>
//       {data?.map(post => (
//         <Link key={post._id} href="/" className={styles.item}>
//           {withImage && (
//             <div className={styles.imageContainer}>
//               <Image
//                 src={post.image || '/images/df3.png'}
//                 alt=""
//                 fill
//                 className={styles.image}
//               />
//             </div>
//           )}
//           <div className={styles.textContainer}>
//             <span
//               className={`${styles.category} ${styles[post.category]}`}
//             >
//               {post.category}
//             </span>
//             <h3 className={styles.postTitle}>{post.title}</h3>
//             <p>
//               {post.desc.slice(0, 60) +
//                 (post.desc.length > 40 ? '...' : '')}
//             </p>
//             <div className={styles.detail}>
//               <span className={styles.username}> {post.user}</span>
//               <span className={styles.date}>
//                 {' '}
//                 - {post.date.split('T')[0]}
//               </span>
//             </div>
//           </div>
//         </Link>
//       ))}
//     </div>
//   );
// };

// export default MenuPosts;
