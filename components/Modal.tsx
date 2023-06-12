import styles from '../app/page.module.css';
import Image from 'next/image';

interface ModalProps {
  text: string;
  closeModal: () => void;
  likes: string;
  user: {
    profile_image: {
      large: string;
    };
}
}

const Modal: React.FC<ModalProps> = ({ text, closeModal, likes, user }) => {
  return (
    <div className={styles['modal-container']}>
      <div className={styles['modal-content']}>
      <Image className={styles['profile-image']} src={user.profile_image.large} alt={user.profile_image.large} loading="lazy" width={128} height={128} />
      <p><strong>Likes - {likes}</strong></p>
        <p>{text}</p>
        <button className={styles['modal-close']} onClick={closeModal}>
          Close
        </button>
      </div>
    </div>
  );
};

export default Modal;
