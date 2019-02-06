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
    
   
    BooksAPI.update(book, shelf).then(() => {
      this.setState((currentState) => ({
        Books: currentState.Books.concat({book})
      }))
      // fetch books again 
      this.fetchBooks();
    })
  }
  

  render() {
    console.log('all books', this.state.Books);
    return (
      <div className="app">
        <Route exact path='/' render={() => (<BookShelf allBooks={this.state.Books} updateBook={this.updateBook}/>) }/>
        <Route exact path='/search' render={() => (<BookSearch updateBook={this.updateBook} allBooks={this.state.Books}/>)}/> 
      </div>
    )
  }
}

export default BooksApp
