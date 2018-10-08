import React, { Component } from 'react'
import * as BooksAPI from './BooksAPI'
import { Route } from 'react-router-dom'
import ListBooks from './ListBooks'
import Search from './Search'
import './App.css'

class BooksApp extends Component {
  state = {
    books: [],
    query: '',
    results: []
  }

  displayAllBooks() {
      BooksAPI.getAll().then((books) => {
          this.setState({ books })
      })
  }

  componentDidMount() {
      this.displayAllBooks();
  }

  changeBookShelf = (book, shelf) => {
      BooksAPI.update(book, shelf).then( (books) => {
          if (books) {
              this.displayAllBooks();
          }
      })
  }

  render() {

    return (

      <div className="app">

        <Route exact path='/' render={ () => (
          <ListBooks
            books={this.state.books}
            onBookShelfChange={this.changeBookShelf}/>
        )}/>

        <Route path='/search' render={ () => (
          <Search
            books={this.state.books}
            onBookShelfChange={this.changeBookShelf}/>
        )}/>

      </div>
    )
  }

}

export default BooksApp
