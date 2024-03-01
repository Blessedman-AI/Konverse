'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import styles from './editorsPick.module.css';
import Image from 'next/image';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const getEditorsPick = async () => {
  try {
    const response = await fetch(`${API_URL}/api/editorsPick`);
    if (!response.ok) {
      throw new Error("Failed to fetch editor's picks!");
    }
    const res = await response.json();
    return res.posts;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to fetch editor's picks!"); // Rethrow the error to propagate it to the component
  }
};

const EditorsPick = ({ withImage }) => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getEditorsPick();
        setData(result);
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className={styles.items}>
      {isLoading && <div>Loading editor's picks...</div>}
      {error ||
        (!data && <div> {error?.message || 'No data to display'}</div>)}
      {!isLoading && !error && data && (
        <>
          {data.map(post => (
            <Link href="/" className={styles.item} key={post._id}>
              {withImage && (
                <div className={styles.imageContainer}>
                  <Image
                    src={post.image || '/images/df3.png'}
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
        </>
      )}
    </div>
  );
};

export default EditorsPick;

// import React from 'react';
// import Link from 'next/link';
// import styles from './editorsPick.module.css';
// import Image from 'next/image';

// const API_URL = process.env.NEXT_PUBLIC_API_URL;

// const getEditorsPick = async () => {
//   try {
//     const response = await fetch(`${API_URL}/api/editorsPick`);
//     if (!response.ok) {
//       throw new Error("Failed to fetch editor's picks!");
//     }
//     const res = await response.json();
//     return res.posts;
//   } catch (error) {
//     console.log(error);
//   }
// };

// const EditorsPick = async ({ withImage }) => {
//   const data = await getEditorsPick();
//   // console.log(data);

//   return (
//     <div className={styles.items}>
//       {data?.map(post => (
//         <Link href="/" className={styles.item} key={post._id}>
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

// export default EditorsPick;
