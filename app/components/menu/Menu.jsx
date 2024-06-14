import Image from 'next/image';
import styles from './menu.module.css';
import Link from 'next/link';
import MenuPosts from '../menuPosts/MenuPosts.jsx';
import EditorsPick from '../editorsPick/EditorsPick.jsx';
import MenuCategories from '../menuCategories/MenuCategories';

const Menu = async params => {
  return (
    <div className={styles.container}>
      <h2 className={styles.subtitle}>What's hot? 🔥</h2>
      <h1 className={styles.title}>Most Popular</h1>
      <MenuPosts withImage={true} />

      <h2 className={styles.subtitle}>Discover by topic</h2>
      <h1 className={styles.title}>Categories</h1>
      <MenuCategories />

      <h2 className={styles.subtitle}>Chosen by the editor </h2>
      <h1 className={styles.title}>Editor's Pick</h1>
      <EditorsPick withImage={true} />
    </div>
  );
};

export default Menu;
