"use client";
import { useState, useEffect } from 'react';
import Image from 'next/image';
import Search from '../components/Search';
import Card from '../components/Card';
import LongParagraph from '../components/LongParagraph';
import styles from './page.module.css';
import axios from "axios";


interface ImageType {
  id: string;
  user: {
    profile_image: {
      large: string;
    };
    instagram_username: string;
    bio: string;
  };
  alt_description: string;
  urls: {
    regular: string;
    small: string;
  };
  likes: string;
}

export default function Home(): JSX.Element {
  const [images, setImages] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [showInitialImages, setShowInitialImages] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 18;

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await axios.get(
          "https://api.unsplash.com/photos/random?count=100&client_id=JBvuulT94iaOJOmYz_CC3U5vOhCdyiUF6wFvytfxEps"
        );
        setImages(response.data);
        console.log(response.data)
      } catch (error) {
        console.log(error);
      }
    };
    fetchImages();
  }, []);

  useEffect(() => {
    setCurrentPage(1); 
  }, [images, searchResults]);

  const handleSearch = async () => {
    try {
      const response = await fetch(
        `https://api.unsplash.com/search/photos?client_id=JBvuulT94iaOJOmYz_CC3U5vOhCdyiUF6wFvytfxEps&query=${searchTerm}&page=1&per_page=50`
      );
      const data = await response.json();
      setImages([]);
      setSearchResults(data.results);
      setShowInitialImages(false);
    } catch (error) {
      console.error("Error occurred during search:", error);
    }
  };
  

  const handlePreviousPage = () => {
    setCurrentPage((prevPage) => prevPage - 1);
  };

  const handleNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  let visibleItems = [];
  let totalPages = 1;
  let currentIndex = 0;
  let endIndex = 0;

  if (showInitialImages) {
    visibleItems = images.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
    totalPages = Math.ceil(images.length / itemsPerPage);
    currentIndex = (currentPage - 1) * itemsPerPage;
    endIndex = currentIndex + visibleItems.length;
  } else {
    visibleItems = searchResults.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
    totalPages = Math.ceil(searchResults.length / itemsPerPage);
    currentIndex = (currentPage - 1) * itemsPerPage;
    endIndex = currentIndex + visibleItems.length;
  }

  return (
    <main className={styles['remove-default']}>
      <div className={styles['search-bar']}>
        <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} handleSearch={handleSearch} />
      </div>
      <div className={styles['background']}>
        <div className={styles['bg-image']}></div>

        {showInitialImages && (
          <div className={styles['container']}>
            {visibleItems.map((image: ImageType) => (
              <Card key={image.id} image={image} />
            ))}
          </div>
        )}

        {!showInitialImages && searchResults.length > 0 && (
          <div>
            <div className={styles['search-results']}>
              <h2 className={styles['search-result-text']}>SEARCH RESULTS</h2>
            </div>
            <div className={styles['container2']}>
              {visibleItems.map((result: ImageType) => (
                <div className={styles['card']} key={result.id}>
                <Image src={result.user.profile_image.large} alt={result.alt_description} loading="lazy" width={128} height={128} />
                  <div className={styles['card-info']}>
                    <h5 title={result.user.instagram_username} className={styles['card-username']}>
                      {result.user.instagram_username}
                    </h5>
                    <LongParagraph text={result.user.bio} likes={result.likes} maxLength={10} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {(showInitialImages || (searchResults.length > 0 && totalPages > 1)) && (
        <div className={styles['pagination']}>
          <button className={styles['pagination-button']} disabled={currentPage === 1} onClick={handlePreviousPage}>
            Previous
          </button>
          <span>{`Page ${currentPage} of ${totalPages}`}</span>
          <button className={styles['pagination-button']} disabled={currentPage === totalPages} onClick={handleNextPage}>
          Next
         </button>

        </div>
      )}
    </main>
  );
}
