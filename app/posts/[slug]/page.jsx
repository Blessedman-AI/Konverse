import Image from 'next/image';
import Menu from '../../components/menu/Menu';
import styles from './singePage.module.css';
import Comments from '../../components/comments/comments';
import { formatDate } from '../../../utils/dateUtils';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const getData = async slug => {
  const res = await fetch(`${API_URL}/api/posts/${slug}`, {
    next: { revalidate: 10 },
  });

  if (!res.ok) {
    throw new Error('Failed to fetch category data');
  }
  return res.json();
};

const SinglePage = async ({ params }) => {
  const { slug } = params;

  const data = await getData(slug);
  // console.log(`🚀🚀${data.post.desc}`);
  const formattedDate = formatDate(data?.post.createdAt);

  return (
    <div className={styles.container}>
      <div className={styles.infoContainer}>
        <div className={styles.textContainer}>
          <h1 className={styles.title}> {data?.post?.title}</h1>
          <div className={styles.user}>
            {data?.post.user.image && (
              <div className={styles.userImageContainer}>
                <Image
                  src={data?.post.user.image}
                  alt=""
                  fill
                  className={styles.avatar}
                />
              </div>
            )}
            <div className={styles.userTextContainer}>
              <span className={styles.username}>
                {data?.post.user.name}
              </span>

              <span className={styles.date}>{formattedDate}</span>
            </div>
          </div>
        </div>
        {data.post.img && (
          <div className={styles.imageContainer}>
            <Image
              src={data.post.img}
              alt=""
              fill
              className={styles.image}
            />
          </div>
        )}
      </div>
      <div className={styles.content}>
        <div className={styles.post}>
          <div
            className={styles.description}
            dangerouslySetInnerHTML={{ __html: data?.post.desc }}
          />

          <div className={styles.comments}>
            <Comments postSlug={slug} />
          </div>
        </div>
        <Menu />
      </div>
    </div>
  );
};

export default SinglePage;

// 'use client';

// import React, { useState, useEffect } from 'react';
// import Image from 'next/image';
// import Menu from '../../components/menu/Menu';
// import styles from './singePage.module.css';
// import Comments from '../../components/comments/comments';

// const API_URL = process.env.NEXT_PUBLIC_API_URL;

// const getData = async slug => {
//   try {
//     const res = await fetch(`${API_URL}/api/posts/${slug}`, {
//       next: { revalidate: 10 },
//     });
//     if (!res.ok) {
//       throw new Error('Failed to fetch post data');
//     }
//     return res.json();
//   } catch (error) {
//     console.error(error);
//     throw new Error('Failed to fetch post data'); // Rethrow the error to propagate it to the component
//   }
// };

// const SinglePage = ({ params }) => {
//   const { slug } = params;
//   const [data, setData] = useState(null);
//   const [error, setError] = useState(null);
//   const [isLoading, setIsLoading] = useState(true);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const postData = await getData(slug);
//         setData(postData);
//       } catch (error) {
//         setError(error);
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     fetchData();
//   }, [slug]);

//   if (isLoading) {
//     return <div>Loading...</div>;
//   }

//   if (error) {
//     return <div>Error: {error.message}</div>;
//   }

//   if (!isLoading && !error && data) {
//     return (
//       <div className={styles.container}>
//         <div className={styles.infoContainer}>
//           <div className={styles.textContainer}>
//             <h1 className={styles.title}> {data?.post?.title}</h1>
//             <div className={styles.user}>
//               {data?.post.user.image && (
//                 <div className={styles.userImageContainer}>
//                   <Image
//                     src={data?.post.user.image}
//                     alt=""
//                     fill
//                     className={styles.avatar}
//                   />
//                 </div>
//               )}
//               <div className={styles.userTextContainer}>
//                 <span className={styles.username}>
//                   {data?.post.user.name}
//                 </span>
//                 <span className={styles.date}>12.12.2024</span>
//               </div>
//             </div>
//           </div>
//           {data.post.img && (
//             <div className={styles.imageContainer}>
//               <Image
//                 src={data.post.img}
//                 alt=""
//                 fill
//                 className={styles.image}
//               />
//             </div>
//           )}
//         </div>
//         <div className={styles.content}>
//           <div className={styles.post}>
//             <div
//               className={styles.description}
//               dangerouslySetInnerHTML={{ __html: data?.post.desc }}
//             />

//             <div className={styles.comments}>
//               <Comments postSlug={slug} />
//             </div>
//           </div>
//           <Menu />
//         </div>
//       </div>
//     );
//   } else {
//     return (
//       <div className={styles.container}>
//         <p>Failed to load posts data</p>
//       </div>
//     );
//   }
// };

// export default SinglePage;
