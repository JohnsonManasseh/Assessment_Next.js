import styles from '../app/page.module.css';

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
        <p>{text}</p>
        <button className={styles['modal-close']} onClick={closeModal}>
          Close
        </button>
      </div>
    </div>
  );
};

export default Modal;
