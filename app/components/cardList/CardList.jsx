'use client';

import { useState, useEffect } from 'react';
import styles from './cardList.module.css';
import Pagination from '@/app/components/pagination/Pagination';
import Card from '../card/Card.jsx';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const getData = async (page, cat) => {
  try {
    const res = await fetch(
      `${API_URL}/api/posts?page=${page}&cat=${cat || ''}`,
      {
        next: { revalidate: 10 },
      }
    );

    if (!res.ok) {
      throw new Error('Failed to fetch category data');
    }
    return res.json();
  } catch (error) {
    console.error('Error fetching posts 1:', error.message);
  }
};

const CardList = ({ page, cat }) => {
  const [posts, setPosts] = useState([]);
  const [count, setCount] = useState(0);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { posts: fetchedPosts, count: fetchedCount } = await getData(
          page,
          cat
        );
        setPosts(fetchedPosts);
        setCount(fetchedCount);
      } catch (error) {
        console.error('Error fetching posts:', error.message);
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [page, cat]);

  const POST_PER_PAGE = 6;
  const hasPrev = POST_PER_PAGE * (page - 1) > 0;
  const hasNext = POST_PER_PAGE * (page - 1) + POST_PER_PAGE < count;

  if (isLoading) {
    return (
      <div className={styles.container}>
        <p className={styles.posts}> Loading posts...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.container}>
        <p className={styles.errorText}>Unable to load posts</p>
      </div>
    );
  }

  // if (posts?.length > 0) {
  //   console.log(posts[0].user.name);
  // }

  if (posts?.length > 0) {
    return (
      <div className={styles.container}>
        <h1 className={styles.title}>Recent Posts</h1>
        <div className={styles.posts}>
          {posts.map(item => (
            <Card item={item} key={item.id} />
          ))}
        </div>
        <Pagination page={page} hasPrev={hasPrev} hasNext={hasNext} />
      </div>
    );
  } else {
    return (
      <div className={styles.container}>
        <p>There are no posts to display</p>
      </div>
    );
  }
};

export default CardList;

// import styles from './cardList.module.css';
// import Pagination from '@/app/components/pagination/Pagination';
// import Card from '../card/Card.jsx';

// const API_URL = process.env.NEXT_PUBLIC_API_URL;

// const getData = async (page, cat) => {

//   const res = await fetch(
//     `${API_URL}/api/posts?page=${page}&cat=${cat || ''}`,
//     {
//       next: { revalidate: 10 },
//     }
//   );

//   if (!res.ok) {
//     throw new Error('Failed to fetch category data');
//   }
//   return res.json();
// };

// const CardList = async ({ page, cat }) => {
//   const { posts, count } = await getData(page, cat);

//   const POST_PER_PAGE = 2;

//   const hasPrev = POST_PER_PAGE * (page - 1) > 0;
//   const hasNext = POST_PER_PAGE * (page - 1) + POST_PER_PAGE < count;

//   return (
//     <div className={styles.container}>
//       <h1 className={styles.title}>Recent Posts</h1>
//       <div className={styles.posts}>
//         {posts?.map(item => (
//           <Card item={item} key={item.id} />
//         ))}
//       </div>
//       <Pagination page={page} hasPrev={hasPrev} hasNext={hasNext} />
//     </div>
//   );
// };

// export default CardList;
