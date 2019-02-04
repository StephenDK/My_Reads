import React, { Component } from 'react';
import { Link } from 'react-router-dom';

// Components
import Book from './Book'

class BookShelf extends Component {

   
    

    render() {
        // console.log(this.props.onChange);
        let {allBooks} = this.props

        let currently_Reading = allBooks.filter((c) => c.shelf === 'currentlyReading');
        let already_Read = allBooks.filter((c) => c.shelf === 'read');
        let want_To_Read = allBooks.filter((c) => c.shelf === 'wantToRead')

        // console.log('Books', allBooks);
        // console.log('Currently reading', currently_Reading);
        return (
            <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              <div>
                <div className="bookshelf">
                  <h2 className="bookshelf-title">Currently Reading</h2>
                  <div className="bookshelf-books">
                    <ol className="books-grid">
                        {/* All the filter books with shelf data of currently reading will go here */}
                        {currently_Reading.map((book, index) => (
                            <Book 
                                key={index}
                                book={book}
                                updateBook={this.props.updateBook}
                            />
                        ))}
                    </ol>
                  </div>
                </div>
                <div className="bookshelf">
                  <h2 className="bookshelf-title">Want to Read</h2>
                  <div className="bookshelf-books">
                    <ol className="books-grid">
                        {/* All the filter books with shelf data of want to read reading will go here */}
                        {want_To_Read.map((book, index) => (
                            <Book 
                                key={index}
                                book={book}
                                updateBook={this.props.updateBook}
                            />
                        ))}
                      
                    </ol>
                  </div>
                </div>
                <div className="bookshelf">
                  <h2 className="bookshelf-title">Read</h2>
                  <div className="bookshelf-books">
                    <ol className="books-grid">
                        {/* All the filter books with shelf data of read will go here */}
                        {already_Read.map((book, index) => (
                            <Book 
                                key={index}
                                book={book}
                                updateBook={this.props.updateBook}
                            />
                        ))}
                
                    </ol>
                  </div>
                </div>
              </div>
            </div>
            <div className="open-search">
              <Link to='/search'><button>Add a book</button></Link>
            </div>
          </div>
                        
                        
        )
    }
}

export default BookShelf;