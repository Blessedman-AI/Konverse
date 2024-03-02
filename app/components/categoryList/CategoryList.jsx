'use client';

import styles from './categoryList.module.css';
import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect } from 'react';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const getData = async () => {
  const res = await fetch(`${API_URL}/api/categories`, {
    next: { revalidate: 10 },
  });

  if (!res.ok) {
    throw new Error('Failed to fetch category data');
  }
  return res.json();
};

const CategoryList = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getData();
        setData(result);
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  if (isLoading) {
    return (
      <div className={styles.container}>
        <p className={styles.categories}>Loading categories...</p>
      </div>
    );
  }

  // Handle both error and loading states with a unified approach
  if (error || data?.length === 0) {
    return (
      <div className={styles.container}>
        <p className={styles.categories}>
          {error
            ? 'Unable to load categories'
            : 'Categories are still loading. Please wait.'}
        </p>
      </div>
    );
  }
  // console.log(data);

  if (data?.length > 0) {
    return (
      <div className={styles.container}>
        <h1 className={styles.title}>Popular Categories</h1>

        {data && (
          <div className={styles.categories}>
            {data.map(item => (
              <Link
                key={item.id}
                href={`/blog?cat=${item.slug}`}
                className={`${styles.category} ${styles[item.slug]}`}
              >
                {item.img && (
                  <Image
                    src={item.img}
                    alt=""
                    width={32}
                    height={32}
                    className={styles.image}
                  />
                )}
                {item.title}
              </Link>
            ))}
          </div>
        )}
      </div>
    );
  } else {
    return (
      <div className={styles.container}>
        <p>There are no categories to display</p>
      </div>
    );
  }
};

export default CategoryList;

// import styles from './categoryList.module.css';
// import Image from 'next/image';
// import Link from 'next/link';

// const API_URL = process.env.NEXT_PUBLIC_API_URL;

// const getData = async () => {
//   const res = await fetch(`${API_URL}/api/categories`, {
//     next: { revalidate: 10 },
//   });

//   if (!res.ok) {
//     throw new Error('Failed to fetch category data');
//   }
//   return res.json();
// };

// const CategoryList = async () => {
//   const data = await getData();
//   // console.log(data);

//   return (
//     <div className={styles.container}>
//       <h1 className={styles.title}>Popular Categories</h1>
//       <div className={styles.categories}>
//         {data?.map(item => (
//           <Link
//             key={item._id}
//             // href="/blog?cat=style"
//             href={`/blog?cat=${item.slug}`}
//             className={`${styles.category} ${styles[item.slug]}`}
//           >
//             {item.img && (
//               <Image
//                 src={item.img}
//                 alt=""
//                 width={32}
//                 height={32}
//                 className={styles.image}
//               />
//             )}
//             {item.title}
//           </Link>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default CategoryList;
