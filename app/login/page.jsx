'use client';

import { signIn, useSession } from 'next-auth/react';
import styles from './page.module.css';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

const LoginPage = () => {
  const { data, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === 'authenticated') {
      router.push('/');
    }
  }, [status]);


  if (status === 'unauthenticated') {
    return (
      <div className={styles.container}>
        <div className={styles.wrapper}>
          <div
            className={styles.socialButton}
            onClick={() => signIn('google')}
          >
            Sign in with Google
          </div>
          <div className={styles.socialButton}> Sign in with Github</div>
          <div className={styles.socialButton}>Sign in Facebook</div>
        </div>
      </div>
    );
  } else if (status === 'loading') {
    return <div className={styles.loading}>Loading...</div>;
  } else return;
};

export default LoginPage;
