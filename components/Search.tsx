import { useState, ChangeEvent, KeyboardEvent, useEffect, useRef } from 'react';
import { BsSearch } from 'react-icons/bs';
import { RxCross1 } from 'react-icons/rx';
import styles from '../app/page.module.css';

interface SearchProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  handleSearch: () => void;
  setError: (error: string) => void;
}

const Search: React.FC<SearchProps> = ({
  searchTerm,
  setSearchTerm,
  handleSearch,
  setError
}) => {
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const predefinedSuggestions = [
    'dog',
    'animal',
    'canada',
    'canabis',
    'canada day',
    'cat',
  ];
  const [errorMessage, setErrorMessage] = useState<string>('');

  const suggestionsRef = useRef<HTMLUListElement>(null);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSearchTerm(value);

    const filteredSuggestions = predefinedSuggestions.filter((suggest) =>
      suggest.toLowerCase().includes(value.toLowerCase())
    );
    setSuggestions(filteredSuggestions);
  };

  // const handleKeyPress = (event: KeyboardEvent<HTMLInputElement>) => {
  //   if (event.key === 'Enter') {
  //     handleSearch();
  //     setError('')
  //   }
  // };

  const handleSuggestionClick = (suggestion: string) => {
    setSearchTerm(suggestion);
    setSuggestions([]);
    handleSearch();
    setErrorMessage('');
    setError('')
  };

  const inputReset = () => {
    setSearchTerm('');
    setSuggestions([]);
    setError('')
  };

  const handleSearchClick = (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (searchTerm.trim() === '') {
      setErrorMessage('Input should not be empty');
      setSuggestions([]);
    } else {
      setErrorMessage('');
      handleSearch();
      setSuggestions([]);
      setError('')
    }
  };

  const handleOutsideClick = (event: MouseEvent) => {
    if (suggestionsRef.current && !suggestionsRef.current.contains(event.target as Node)) {
      setSuggestions([]);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleOutsideClick);
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, []);

  return (
    <div>
      <form className={styles['form']} onSubmit={handleSearchClick}>
        <BsSearch className={styles['search-icon']} />
        <input
          className={styles['search-input']}
          type="text"
          value={searchTerm}
          onChange={handleInputChange}
          // onKeyDown={handleKeyPress}
          placeholder="Search Image"
        />
        {searchTerm && <RxCross1 onClick={inputReset} className={styles['close-icon']} />}
        <button type='submit' className={styles['search-button']}>
          Search
        </button>

        {suggestions.length > 0 && (
          <ul ref={suggestionsRef} className={styles['data-result']}>
            {suggestions.map((suggest, index) => (
              <li
                className={styles['data-item']}
                key={index}
                onClick={() => handleSuggestionClick(suggest)}
              >
                {suggest}
              </li>
            ))}
          </ul>
        )}
      </form>
      {errorMessage && <p className={styles['err-message']}>{errorMessage}</p>}
    </div>
  );
};

export default Search;
