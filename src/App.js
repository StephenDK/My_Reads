import React from 'react'
import { Route } from 'react-router-dom';
import * as BooksAPI from './BooksAPI'
import './App.css'

// components
import BookShelf from './BookShelf';
import BookSearch from './BookSearch';

class BooksApp extends React.Component {
  state = {
    Books: []
  }

  componentDidMount() {
    this.fetchBooks();
  }

  
  fetchBooks = () => {
    BooksAPI.getAll().then((books) => {
      this.setState(() => ({
        Books: books
      }))
    })
  }

  updateBook = (book, shelf) => {
    
    if (book.id === this.state.Books.id) {
      BooksAPI.update(book, shelf).then(() => {
        this.fetchBooks();
        console.log('Book is in application state');
      })
    } else {
      BooksAPI.update(book, shelf).then(() => {
        console.log('book is not in application state')
        this.setState((currentState) => ({
          Books: currentState.Books.concat({book})
        }))
        this.fetchBooks();
      })
    }
    console.log(book, shelf);
    // console.log('Updatebook function has fired')
    // // first lets check if the book is already in BOOKS state
    BooksAPI.update(book, shelf).then(() => {
      // fetch books again 
      this.fetchBooks();
      // this.state.Books.concat(book);
      // concat the book passed in into the Books state
    })
  }
  

  render() {
    console.log('all books', this.state.Books);
    return (
      <div className="app">
        <Route exact path='/' render={() => (<BookShelf allBooks={this.state.Books} updateBook={this.updateBook}/>) }/>
        <Route exact path='/search' render={() => (<BookSearch updateBook={this.updateBook} />)}/> 
      </div>
    )
  }
}

export default BooksApp
