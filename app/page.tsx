"use client";
import { useState, useEffect } from "react";
import Search from "../components/Search";
import Card from "../components/Card";
import styles from "./page.module.css";
import axios from "axios";

interface ImageType {
  setError: string;
  id: string;
  user: {
    profile_image: {
      large: string,
    },
    instagram_username: string,
    bio: string,
  };
  alt_description: string;
  urls: {
    regular: string,
    small: string,
  };
  likes: string;
}

export default function Home(): JSX.Element {
  const [images, setImages] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [showInitialImages, setShowInitialImages] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [error, setError] = useState <string> ("");
  const [searchError, setSearchError] = useState <string> ("");
  const [initialLoading, setInitialLoading] = useState("")
  const itemsPerPage = 15;

  useEffect(() => {
    const fetchImages = async () => {
      try {
        setSearchResults([])
        setInitialLoading("Loading Images...")
        const response = await axios.get(
          `https://api.unsplash.com/photos/random?count=100&client_id=${process.env.NEXT_PUBLIC_API_KEY}`
        );
        setImages(response.data);
        console.log(response.data);
        setInitialLoading("")
        // console.log(setResults)
      } catch (error) {
        console.log(error);
        setInitialLoading("")
        setError(
          "An error occurred while fetching images. Please try again later."
        );
      }
    };
    fetchImages();

  }, []);

  useEffect(() => {
    setCurrentPage(1);
  }, [images, searchResults]);

  const handleSearch = async () => {
    try {
      // setSearchLoading("Loading Images...")
      const response = await axios.get(
        `https://api.unsplash.com/search/photos?client_id=${process.env.NEXT_PUBLIC_API_KEY}&query=${searchTerm}&page=1&per_page=50`
      );
      setImages([]);
      console.log(response.data.results.length);
      setSearchResults(response.data.results);
      setShowInitialImages(false);
      // setSearchLoading("")
    } catch (error) {
      console.error(error);
      setSearchError(
        "An error occurred while fetching images. Please try again later."
      );
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
    visibleItems = images.slice(
      (currentPage - 1) * itemsPerPage,
      currentPage * itemsPerPage
    );
    totalPages = Math.ceil(images.length / itemsPerPage);
    currentIndex = (currentPage - 1) * itemsPerPage;
    endIndex = currentIndex + visibleItems.length;
  } else {
    visibleItems = searchResults.slice(
      (currentPage - 1) * itemsPerPage,
      currentPage * itemsPerPage
    );
    totalPages = Math.ceil(searchResults.length / itemsPerPage);
    currentIndex = (currentPage - 1) * itemsPerPage;
    endIndex = currentIndex + visibleItems.length;
  }

  return (
    <main className={styles["remove-default"]}>
      <div className={styles["search-bar"]}>
        <Search
          setError={setError}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          handleSearch={handleSearch}
        />
      </div>
      <div className={styles["background"]}>
        <div className={styles["bg-image"]}></div>

       
        {initialLoading &&  <h1 className={styles["fetch-error"]}>{initialLoading}</h1>}
        {error && showInitialImages ? (
          <h1 className={styles["fetch-error"]}>{error}</h1>
        ) : (
          <div>
            {showInitialImages && (
              <div className={styles["container"]}>
                {visibleItems.map((image: ImageType) => (
                  <Card key={image.id} image={image} />
                ))}
              </div>
            )}
          </div>
        )}

{!showInitialImages && searchResults.length === 0 ? (<h1 className={styles["fetch-error"]}>No results found...</h1>) : (
  <div>
  {searchError && !showInitialImages? (
    <h1 className={styles["search-fetch-error"]}>{searchError}</h1>
  ) : (
    <div>
      {!showInitialImages && searchResults.length > 0 && (
        <div>
          <div className={styles["search-results"]}>
            <h2 className={styles["search-result-text"]}>
              SEARCH RESULTS
            </h2>
          </div>
          <div className={styles["container2"]}>
            {visibleItems.map((image: ImageType) => (
              <Card  key={image.id} image={image} />
            ))}
          </div>
        </div>
      )}
    </div>
  )}
  </div>
)}
        
      </div>

      {(showInitialImages || (searchResults.length > 0 && totalPages > 1)) && (
        <div className={styles["pagination"]}>
          <button
            className={styles["pagination-button"]}
            disabled={currentPage === 1}
            onClick={handlePreviousPage}
          >
            Previous
          </button>
          <span>{`Page ${currentPage} of ${totalPages}`}</span>
          <button
            className={styles["pagination-button"]}
            disabled={currentPage === totalPages}
            onClick={handleNextPage}
          >
            Next
          </button>
        </div>
      )}
    </main>
  );
}
