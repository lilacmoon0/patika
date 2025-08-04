import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [selectedBook, setSelectedBook] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const openBookDetails = (book) => {
    setSelectedBook(book);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedBook(null);
  };

  const searchBooks = async (e) => {
    e.preventDefault();
    if (!searchTerm.trim()) {
      setError('Please enter a search term');
      return;
    }

    setLoading(true);
    setError('');
    setBooks([]);

    try {
      const response = await axios.get(
        `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(searchTerm)}&maxResults=20`
      );
      
      if (response.data.items) {
        setBooks(response.data.items);
      } else {
        setError('No books found for your search');
      }
    } catch (err) {
      setError('Error searching for books. Please try again.');
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };

  const BookCard = ({ book }) => {
    const bookInfo = book.volumeInfo;
    const thumbnail = bookInfo.imageLinks?.thumbnail || bookInfo.imageLinks?.smallThumbnail;
    
    return (
      <div className="book-card">
        <div className="book-image">
          {thumbnail ? (
            <img src={thumbnail} alt={bookInfo.title} />
          ) : (
            <div className="no-image">No Image Available</div>
          )}
        </div>
        <div className="book-details">
          <h3 className="book-title">{bookInfo.title}</h3>
          <p className="book-authors">
            {bookInfo.authors ? bookInfo.authors.join(', ') : 'Unknown Author'}
          </p>
          <p className="book-published">
            {bookInfo.publishedDate ? `Published: ${bookInfo.publishedDate}` : ''}
          </p>
          <p className="book-description">
            {bookInfo.description 
              ? bookInfo.description.substring(0, 150) + '...'
              : 'No description available'
            }
          </p>
          <div className="book-actions">
            <button 
              className="details-button"
              onClick={() => openBookDetails(book)}
            >
              View Details
            </button>
            {bookInfo.previewLink && (
              <a 
                href={bookInfo.previewLink} 
                target="_blank" 
                rel="noopener noreferrer"
                className="preview-link"
              >
                Preview Book
              </a>
            )}
          </div>
        </div>
      </div>
    );
  };

  const BookDetailsModal = () => {
    if (!selectedBook) return null;
    
    const bookInfo = selectedBook.volumeInfo;
    const saleInfo = selectedBook.saleInfo;
    const thumbnail = bookInfo.imageLinks?.thumbnail || bookInfo.imageLinks?.smallThumbnail;
    
    return (
      <div className="modal-overlay" onClick={closeModal}>
        <div className="modal-content" onClick={(e) => e.stopPropagation()}>
          <button className="modal-close" onClick={closeModal}>×</button>
          
          <div className="modal-body">
            <div className="modal-image">
              {thumbnail ? (
                <img src={thumbnail.replace('http:', 'https:')} alt={bookInfo.title} />
              ) : (
                <div className="no-image-large">No Image Available</div>
              )}
            </div>
            
            <div className="modal-details">
              <h2 className="modal-title">{bookInfo.title}</h2>
              {bookInfo.subtitle && (
                <h3 className="modal-subtitle">{bookInfo.subtitle}</h3>
              )}
              
              <div className="modal-info">
                <p><strong>Author(s):</strong> {bookInfo.authors ? bookInfo.authors.join(', ') : 'Unknown Author'}</p>
                <p><strong>Publisher:</strong> {bookInfo.publisher || 'Unknown'}</p>
                <p><strong>Published Date:</strong> {bookInfo.publishedDate || 'Unknown'}</p>
                <p><strong>Pages:</strong> {bookInfo.pageCount || 'Unknown'}</p>
                <p><strong>Language:</strong> {bookInfo.language || 'Unknown'}</p>
                <p><strong>Categories:</strong> {bookInfo.categories ? bookInfo.categories.join(', ') : 'Not specified'}</p>
                {bookInfo.averageRating && (
                  <p><strong>Rating:</strong> {bookInfo.averageRating}/5 ({bookInfo.ratingsCount} reviews)</p>
                )}
                {saleInfo?.listPrice && (
                  <p><strong>Price:</strong> {saleInfo.listPrice.amount} {saleInfo.listPrice.currencyCode}</p>
                )}
              </div>
              
              <div className="modal-description">
                <h4>Description:</h4>
                <p>{bookInfo.description || 'No description available'}</p>
              </div>
              
              <div className="modal-actions">
                {bookInfo.previewLink && (
                  <a 
                    href={bookInfo.previewLink} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="modal-button preview"
                  >
                    Preview Book
                  </a>
                )}
                {bookInfo.infoLink && (
                  <a 
                    href={bookInfo.infoLink} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="modal-button info"
                  >
                    More Info
                  </a>
                )}
                {saleInfo?.buyLink && (
                  <a 
                    href={saleInfo.buyLink} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="modal-button buy"
                  >
                    Buy Book
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="App">
      <header className="app-header">
        <h1>Book Search App</h1>
        <p>Search for books using the Google Books API</p>
      </header>

      <main className="main-content">
        <form onSubmit={searchBooks} className="search-form">
          <div className="search-input-container">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Enter book title, author, or keyword..."
              className="search-input"
            />
            <button type="submit" className="search-button" disabled={loading}>
              {loading ? 'Searching...' : 'Search'}
            </button>
          </div>
        </form>

        {error && <div className="error-message">{error}</div>}

        {loading && (
          <div className="loading">
            <div className="loading-spinner"></div>
            <p>Searching for books...</p>
          </div>
        )}

        <div className="books-container">
          {books.map((book) => (
            <BookCard key={book.id} book={book} />
          ))}
        </div>

        {books.length > 0 && (
          <div className="results-count">
            Found {books.length} books
          </div>
        )}
      </main>
      
      {showModal && <BookDetailsModal />}
    </div>
  );
}

export default App;
