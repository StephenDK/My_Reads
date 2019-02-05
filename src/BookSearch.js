import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import * as BooksAPI from './BooksAPI';

// components
import Book from './Book';

class BookSearch extends Component {
    state = {
        Books: [],
        query: ''
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
            this.updateShelf(books);
             console.log(books)
            this.setState(() => ({
                Books: books
            }))
        })
        : this.setState(() => ({
            Books: [],
            query: ''
        }))
        
    }

    updateShelf = (books) => {

        if (books.length > 0) {
            for ( let book of books) {
                book.shelf = null;
            } 
        } else {
            return;
        }
        // use a for of loop to loop over all the books creating
        //a shelf object key and a value
        
    }
    

    render() {
        console.log('Props being passed into search component = ', this.props);
        // console.log('BOOKS STATE = ', this.state.Books)
        return (
            <div className="search-books">
                <div className="search-books-bar">
                    <Link to='/' className="close-search">Close</Link>
                        <div className="search-books-input-wrapper">
                            {/*
                            NOTES: The search from BooksAPI is limited to a particular set of search terms.
                            You can find these search terms here:
                            https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                            However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                            you don't find a specific author or title. Every search is limited by search terms.
                            */}
                            <input type="text" value={this.state.query} onChange={(event) => this.updateQuery(event.target.value)} placeholder="Search by title or author"/>
                        </div>
                </div>
                <div className="search-books-results">
                    <ol className="books-grid">
                    {/* map over the book in the search state using the book component from each book */}
                        {this.state.Books.map((book, index) => (
                            <Book 
                                key={index}
                                book={book}
                                updateBook={this.props.updateBook}
                            />
                        ))}
                    </ol>
                </div>
            </div>
        )
    }
}

export default BookSearch;