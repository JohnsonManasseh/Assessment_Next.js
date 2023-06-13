import React, { useState, useEffect } from "react";
import Image from "next/image";
import LongParagraph from "./LongParagraph";
import styles from "../app/page.module.css";
import Loader from "./Loader";

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
  likes: string;
}

interface CardProps {
  image: ImageType;
}

const Card: React.FC<CardProps> = ({ image }) => {
  const { urls, user, likes } = image;
  const [isLoading, setIsLoading] = useState(true);

  const handleImageLoad = () => {
    setIsLoading(false);
  }

  return (
    <>
    <div className={styles["card"]}>
       {isLoading && <Loader />}
        <div>
          <div className={styles["card-details"]}>
            <LongParagraph
              text={user.bio}
              likes={likes}
              maxLength={40}
              user={user}
            />
          </div>
          <Image
            className={styles["responsive-image"]}
            src={urls.regular}
            alt={user.instagram_username}
            loading="lazy"
            width={270}
            height={300}
            onLoad={handleImageLoad}
          />
          <div className={styles["card-info"]}></div>
        </div>
    </div>
    </>
  );
};

export default Card;
