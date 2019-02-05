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

        if (books.length > 0) {
            for ( let book of books) {
                book.shelf = 'none';
            } 
        } else {
            return;
        }
        // use a for of loop to loop over all the books creating
        //a shelf object key and a value
        
    }
    

    render() {
        // var x = this.state.Books
        // console.log('This is the state==', x)
        // console.log('Props being passed into search component = ', this.props);
        // console.log('BOOKS STATE = ', this.state.Books)
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