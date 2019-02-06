import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import * as BooksAPI from './BooksAPI';
// components
import Book from './Book';

class BookSearch extends Component {
    state = {
        Books: [],
        query: '',
        handleError: false
    }

    updateQuery = (query) => {
        this.setState(() => ({
            query
        }))
        // Search books using the value from user
        this.searchBooks(query);
    }

    searchBooks = (value) => {
        value.length !== 0 ?
         BooksAPI.search(value).then((books) => {
            books = books.filter((book) => (book.imageLinks));
            
            if (books.length > 0) {
                this.updateShelf(books);
                console.log(books)
                this.setState(() => ({
                    Books: books,
                    handleError: false
                }))
             } else if (typeof(books) === 'object') {
                 this.setState(() => ({
                     Books: [],
                     query: '',
                     handleError: true
                 }))
             }
             console.log('This is inside the API search function', books)
        }).catch((error) => {
            if (error) {
                console.log(error);
            }
        })
        : this.setState(() => ({
            Books: [],
            query: ''
        }))
        
    }

    updateShelf = (books) => {
        // Save a copy of the application state
        let allBooks = this.props.allBooks;
            // loop through all books and create and set shelf
            for ( let book of books) {
                book.shelf = 'none';
            } 

            // Loop through books again 
            for (let book of books) {
                for (let b of allBooks) {
                    if (b.id === book.id) {
                        book.shelf = b.shelf
                    }
                }
            }
            return books;
    }
    

    render() {
        // TESTING
        // console.log('This is the state==', x)
        // console.log('Props being passed into search component = ', this.props.allBooks);
        // console.log('BOOKS STATE = ', this.state.Books)
        // console.log('All Books from App.js', this.state.allBooks)
        
        return (
            <div className="search-books">
                <div className="search-books-bar">
                    <Link to='/' className="close-search">Close</Link>
                        <div className="search-books-input-wrapper">
                            <input type="text" value={this.state.query} onChange={(event) => this.updateQuery(event.target.value)} placeholder="Search by title or author"/>
                        </div>
                </div>
                <div className="search-books-results">
                    <ol className="books-grid">
                    {/* map over the book in the search state using the book component from each book */}                        
                        {this.state.handleError === true ?
                            <div>No Results</div>
                        :
                        this.state.Books.map((book, index) => (
                            <Book 
                                key={index}
                                book={book}
                                updateBook={this.props.updateBook}
                            />
                        ))    
                    }
                        
                        
                        {/* {this.state.Books.map((book, index) => (
                            <Book 
                                key={index}
                                book={book}
                                updateBook={this.props.updateBook}
                            />
                        ))} */}
                    </ol>
                </div>
            </div>
        )
    }
}

export default BookSearch;