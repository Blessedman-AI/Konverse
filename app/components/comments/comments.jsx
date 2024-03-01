'use client';

import Link from 'next/link';
import styles from './comments.module.css';
import Image from 'next/image';
import useSwr from 'swr';
import { useSession } from 'next-auth/react';
import { useState } from 'react';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const Comments = ({ postSlug }) => {
  const { status } = useSession();
  const [desc, setDesc] = useState('');
  const [feedback, setFeedback] = useState({ message: '', type: '' });

  
  const { data, mutate, error, isValidating } = useSwr(
    `${API_URL}/api/comments?postSlug=${postSlug}`,
    async url => {
      const res = await fetch(url);
      if (!res.ok) {
        throw new Error('Failed to fetch comments');
      }
      return res.json();
    }
  );

  const handleSubmit = async () => {
    try {
      const response = await fetch('/api/comments', {
        method: 'POST',
        body: JSON.stringify({ desc, postSlug }),
      });

      if (!response.ok) {
        throw new Error('Failed to submit comment');
      }

      mutate();
      setDesc('');
      setFeedback({
        message: 'Comment submitted successfully',
        type: 'success',
      });
    } catch (error) {
      console.error('Error submitting comment:', error.message);
      setFeedback({ message: 'Failed to submit comment', type: 'error' });
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Comments</h1>
      {status === 'authenticated' ? (
        <div className={styles.write}>
          <textarea
            placeholder="write a comment..."
            className={styles.input}
            value={desc}
            onChange={e => setDesc(e.target.value)}
          />
          <button className={styles.button} onClick={handleSubmit}>
            Send
          </button>
        </div>
      ) : (
        <Link href="/login">Login to write a comment</Link>
      )}

      {feedback.message && (
        <div
          className={
            feedback.type === 'success' ? styles.success : styles.error
          }
        >
          {feedback.message}
        </div>
      )}

      <div className={styles.comments}>
        {isValidating ? (
          <div>Loading comments...</div>
        ) : error ? (
          <div>Error: {error.message}</div>
        ) : (
          data?.map(item => (
            <div className={styles.comment} key={item._id}>
              <div className={styles.user}>
                {item?.user?.image && (
                  <Image
                    src={item.user.image}
                    alt=""
                    width={50}
                    height={50}
                    className={styles.image}
                  />
                )}
                <div className={styles.userInfo}>
                  <span className={styles.username}>{item.user.name}</span>
                  <span className={styles.date}>{item.createdAt}</span>
                </div>
              </div>
              <p className={styles.desc}>{item.desc}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Comments;

// 'use client';

// import Link from 'next/link';
// import styles from './comments.module.css';
// import Image from 'next/image';
// import useSwr from 'swr';
// import { useSession } from 'next-auth/react';
// import { useState } from 'react';

// const API_URL = process.env.NEXT_PUBLIC_API_URL;

// const fetcher = async url => {
//   try {
//     const res = await fetch(url);
//     const data = await res.json();

//     if (isLoading) {
//       return <div>Loading posts...</div>;
//     }

//     if (!res.ok) {
//       const error = new Error(data.message);
//       throw error;
//     }

//     return data;
//   } catch (error) {
//     console.error("Error fetching comments:", error.message)
//   }
// };

// const Comments = ({ postSlug }) => {
//   const { status } = useSession();

//   const { data, mutate, isLoading } = useSwr(
//     `${API_URL}/api/comments?postSlug=${postSlug}`,
//     fetcher
//   );

//   const [desc, setDesc] = useState('');

//   const handleSubmit = async () => {
//     const response = await fetch('/api/comments', {
//       method: 'POST',
//       body: JSON.stringify({ desc, postSlug }),
//     });

//     if (response.ok) {
//       mutate();
//       setDesc('');
//     } else {
//       console.log('Error:', response.statusText);
//     }
//   };

//   return (
//     <div className={styles.container}>
//       <h1 className={styles.title}>Comments</h1>
//       {status === 'authenticated' ? (
//         <div className={styles.write}>
//           <textarea
//             placeholder="write a comment..."
//             className={styles.input}
//             value={desc}
//             onChange={e => setDesc(e.target.value)}
//           />
//           <button className={styles.button} onClick={handleSubmit}>
//             Send
//           </button>
//         </div>
//       ) : (
//         <Link href="/login"> Login to write a comment</Link>
//       )}

//       <div className={styles.comments}>
//         {isLoading
//           ? 'Loading'
//           : data?.map(item => (
//               <div className={styles.comment} key={item._id}>
//                 <div className={styles.user}>
//                   {item?.user?.image && (
//                     <Image
//                       src={item.user.image}
//                       alt=""
//                       width={50}
//                       height={50}
//                       className={styles.image}
//                     />
//                   )}
//                   <div className={styles.userInfo}>
//                     <span className={styles.username}>
//                       {item.user.name}
//                     </span>
//                     <span className={styles.date}>{item.createdAt}</span>
//                   </div>
//                 </div>
//                 <p className={styles.desc}>{item.desc}</p>
//               </div>
//             ))}
//       </div>
//     </div>
//   );
// };

// export default Comments;
