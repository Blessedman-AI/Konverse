'use client';
const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });
import SuccessMessage from '../components/successMessage/SuccessMessage.jsx';
import {
  ServerError,
  ClientError,
  CategoryErrorMessage,
} from '../components/errorMessage/ErrorMessage.jsx';
import Image from 'next/image';

import dynamic from 'next/dynamic';
import 'react-quill/dist/quill.bubble.css';
import styles from './writePage.module.css';
import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from 'firebase/storage';
import { app } from '@/utils/firebase';
// import { unique } from 'next/dist/build/utils.js';

const storage = getStorage(app);

const WritePage = () => {
  const { data, status } = useSession();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [file, setFile] = useState(null);
  const [media, setMedia] = useState('');
  const [value, setValue] = useState('');
  const [title, setTitle] = useState('');
  const [catSlug, setCatSlug] = useState('');
  const [isDisabled, setIsDisabled] = useState(true);
  const [selectedCat, setSelectedCat] = useState('');
  const [isPublished, setIsPublished] = useState(false);
  const [serverErrMsg, setServerErrMsg] = useState(false);
  const [clientErr, setClientErr] = useState(false);
  const [isPublishing, setIsPublishing] = useState(false);
  const [showCatErrMsg, setCatErrMsg] = useState(false);
  const resetCat = () => {
    setSelectedCat('');
  };

  useEffect(() => {
    const upload = () => {
      const name = new Date().getTime() + file.name;
      const storageRef = ref(storage, name);

      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        'state_changed',
        snapshot => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log('Upload is ' + progress + '% done');
          switch (snapshot.state) {
            case 'paused':
              console.log('Upload is paused');
              break;
            case 'running':
              console.log('Upload is running');
              break;
          }
        },
        error => {},
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then(downloadURL => {
            setMedia(downloadURL);
          });
        }
      );
    };

    file && upload();
  }, [file]);

  if (status === 'loading') {
    <div className={styles.loading}>Loading...</div>;
  }

  const slugify = str => {
    const randomNumber = Math.floor(Math.random() * 90000) + 100000;

    let uniqueSlug = str
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, '')
      .replace(/[\s_-]+/g, '_')
      .replace(/^-+|-+$/g, '')
      .replace(/<br\s*\/?>/gi, '')
      .replace(/<em\s*\/?>/gi, '');

    uniqueSlug = randomNumber + '_' + uniqueSlug;
    // console.log(uniqueSlug);

    return uniqueSlug;
  };

  const removePTag = text => text.replace(/<\/?p>/g, '');

  const handleSubmit = async () => {
    const slug = slugify(title);
    setIsPublishing(true);

    const res = await fetch('/api/posts', {
      method: 'POST',
      body: JSON.stringify({
        title,
        desc: removePTag(value),
        img: media,
        slug: slugify(title),
        catSlug: catSlug,
      }),
    });

    if (!title || !value) {
      setClientErr(true);
      setTimeout(() => setClientErr(false), 3000);
      setIsPublishing(false);
    }

    if (!catSlug) {
      setCatErrMsg(true);
      setTimeout(() => setCatErrMsg(false), 3000);
      setIsPublishing(false);
    }

    if (res.ok) {
      setValue('');
      setTitle('');
      setMedia(null);
      resetCat();
      setIsPublished(true);
      setIsPublishing(false);
      setTimeout(() => setIsPublished(false), 2000);
      setTimeout(() => {
        router.push(`/`);
      }, 2000);
    } else if (res.status === 404 || res.status === 500) {
      setIsPublishing(false);
      setServerErrMsg(true);
      setTimeout(() => setServerErrMsg(false), 3000);
    }
  };

  if (status === 'authenticated') {
    return (
      <div className={styles.container}>
        {isPublished && (
          <SuccessMessage message="Your post has been published!" />
        )}

        {serverErrMsg && (
          <ServerError message="Something went wrong. Please try again." />
        )}
        {clientErr && (
          <ClientError message="Please add a title and description!" />
        )}
        {showCatErrMsg && !clientErr && !serverErrMsg && (
          <CategoryErrorMessage message={'Please choose a category!'} />
        )}
        <input
          type="text"
          value={title}
          placeholder="Title"
          className={styles.input}
          onChange={e => setTitle(e.target.value)}
        />
        <select
          value={selectedCat}
          className={styles.select}
          onChange={e => {
            setSelectedCat(e.target.value);
            setCatSlug(e.target.value);
          }}
        >
          <option value="">Choose Category</option>
          <option value="style">style</option>
          <option value="fashion">fashion</option>
          <option value="food">food</option>
          <option value="culture">culture</option>
          <option value="travel">travel</option>
          <option value="coding">coding</option>
        </select>
        <div className={styles.editor}>
          <button className={styles.button} onClick={() => setOpen(!open)}>
            <Image src="/Images/plus.png" alt="" width={32} height={32} />
          </button>
          {open && (
            <div className={styles.add}>
              <input
                type="file"
                id="image"
                onChange={e => setFile(e.target.files[0])}
                style={{ display: 'none' }}
              />
              <button className={styles.addButton}>
                <label htmlFor="image">
                  <Image
                    src="/Images/image.png"
                    alt=""
                    width={16}
                    height={16}
                  />
                </label>
              </button>
              <button className={styles.addButton}>
                <Image
                  src="/Images/upload.png"
                  alt=""
                  width={16}
                  height={16}
                />
              </button>
              <button className={styles.addButton}>
                <Image
                  src="/Images/video.png"
                  alt=""
                  width={16}
                  height={16}
                />
              </button>
            </div>
          )}

          <ReactQuill
            className={styles.textArea}
            theme="bubble"
            value={value}
            onChange={setValue}
            placeholder="Tell your story..."
          />
        </div>
        <button
          className={styles.publish}
          disabled={isPublishing}
          onClick={handleSubmit}
        >
          {isPublishing ? 'Publishing...' : 'Publish'}
        </button>
      </div>
    );
  } else if (status === 'unauthenticated') {
    router.push('/');
  }
};

export default WritePage;
