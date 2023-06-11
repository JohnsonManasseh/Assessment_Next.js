import { useState } from 'react';
import Modal from './Modal';
import styles from '../app/page.module.css';

interface LongParagraphProps {
  text: string;
  maxLength: number;
  likes: string;
}

const LongParagraph: React.FC<LongParagraphProps> = ({ text, maxLength, likes }) => {
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

  return (
    <div>
      <p>{displayText}</p>
      {text.length > maxLength && (
        <>
          <p className={styles['read-more']}  onClick={openModal}>
            {expanded ? 'Read Less' : 'Read More...'}
          </p>
        </>
      )}
      {expanded && <p>{text}</p>}
      {modalOpen && <Modal text={text} likes={likes} closeModal={() => setModalOpen(false)} />}
    </div>
  );
};

export default LongParagraph;
