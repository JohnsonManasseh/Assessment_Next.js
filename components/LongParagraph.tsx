import { useState } from 'react';
import Modal from './Modal';
import styles from '../app/page.module.css';
import Image from 'next/image';

interface LongParagraphProps {
  text: string;
  maxLength: number;
  likes: string;
  user: {
    profile_image: {
      large: string;
    };
    instagram_username: string;
    bio: string;
  };
}

const LongParagraph: React.FC<LongParagraphProps> = ({ text, maxLength, likes, user }) => {
  const [expanded, setExpanded] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  if (!text) {
    return null;
  }

  const displayText = expanded ? text : text.substring(0, maxLength);

  const toggleExpanded = () => {
    setExpanded(!expanded);
  };

  const openModal = () => {
    setModalOpen(true);
  };

  const capitalizedUsername = user.instagram_username
    ? user.instagram_username.charAt(0).toUpperCase() + user.instagram_username.slice(1)
    : '';

  return (
    <div>
       <Image className={styles['hover-profile-image']} src={user.profile_image.large} alt={user.profile_image.large} loading="lazy" width={128} height={128} />
      <br />
      <h5 title={user.instagram_username} className={styles['card-username']}>
          {capitalizedUsername}
        </h5>
        <br />
       <p>Likes - {likes}</p>
      <p className={styles['user-description']}>{displayText}</p>
      {text.length > maxLength && (
        <>
          <p className={styles['read-more']}  onClick={openModal}>
            {expanded ? 'Read Less' : 'Read More...'}
          </p>
        </>
      )}
      {expanded && <p>{text}</p>}
      {modalOpen && <Modal user={user} text={text} likes={likes} closeModal={() => setModalOpen(false)} />}
    </div>
  );
};

export default LongParagraph;
