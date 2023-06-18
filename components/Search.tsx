import { useState, ChangeEvent, KeyboardEvent } from 'react';
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

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSearchTerm(value);

    const filteredSuggestions = predefinedSuggestions.filter((suggest) =>
      suggest.toLowerCase().includes(value.toLowerCase())
    );
    setSuggestions(filteredSuggestions);
  };

  const handleKeyPress = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleSearch();
      setError('')
      setErrorMessage('');
    }
  };

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

  const handleSearchClick = () => {
    if (searchTerm.trim() === '') {
      setErrorMessage('Input should not be empty');
    } else {
      setErrorMessage('');
      handleSearch();
      setSuggestions([]);
      setError('')
    }
  };

  return (
    <div>
      <div className={styles['form']} >
        <BsSearch className={styles['search-icon'] } />
        <input
        className={styles['search-input'] }
          type="text"
          value={searchTerm}
          onChange={handleInputChange}
          onKeyDown={handleKeyPress}
          placeholder="Search Image"
        />
        {searchTerm && <RxCross1 onClick={inputReset} className={styles['close-icon'] } />}
        <button className={styles['search-button']}  onClick={handleSearchClick}>
          Search
        </button>

       

        {suggestions.length > 0 && (
          <ul className={styles['data-result']} >
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


      </div>
      {errorMessage && <p className={styles['err-message']} >{errorMessage}</p>}
    </div>
  );
};

export default Search;
