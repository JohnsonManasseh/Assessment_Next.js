import React, { useState, useEffect } from "react";
import Image from "next/image";
import LongParagraph from "./LongParagraph";
import styles from "../app/page.module.css";
import Loader from "./Loader";
import { motion } from "framer-motion";

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

  // const container = {
  //   hidden: { opacity: 1, scale: 0 },
  //   visible: {
  //     opacity: 1,
  //     scale: 1,
  //     transition: {
  //       delayChildren: 0.3,
  //       staggerChildren: 0.2
  //     }
  //   }
  // };
  
  const item = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
    }
  };

  return (
    <motion.div
    variants={item}
    initial="hidden"
    animate="visible"
  >
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
    </motion.div>
  );
};

export default Card;
