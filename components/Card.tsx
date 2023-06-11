import Image from 'next/image';
import LongParagraph from './LongParagraph';
import styles from '../app/page.module.css';

interface ImageType {
  urls: {
    regular: string;
  };
  user: {
    profile_image: {
      large: string;
    };
    instagram_username: string;
    bio: string;
  };
  likes: string
}

interface CardProps {
  image: ImageType;
}

const Card: React.FC<CardProps> = ({ image }) => {
  const { urls, user, likes } = image;

  return (
    <div  className={styles.card}>
      <Image src={user.profile_image.large} alt={user.instagram_username} loading="lazy" width={128} height={128} />
      <div className={styles['card-info']}>
        <h5 title={user.instagram_username} className={styles['card-username']}>
          {user.instagram_username}
        </h5>
        <LongParagraph text={user.bio} likes={likes} maxLength={15} />
      </div>
    </div>
  );
};

export default Card;
