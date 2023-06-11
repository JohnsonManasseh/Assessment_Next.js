import styles from '../app/page.module.css';

interface ModalProps {
  text: string;
  closeModal: () => void;
}

const Modal: React.FC<ModalProps> = ({ text, closeModal }) => {
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
