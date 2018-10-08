import React, { Component } from 'react'
import * as BooksAPI from './BooksAPI'
import { Link } from 'react-router-dom'
import { Route } from 'react-router-dom'
import Shelf from './Shelf'
import Book from './Book'
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
              //this.updateQuery(this.state.query);
          }
      })
  }

  updateQuery = (query) => {
    this.setState({ query: query.trimLeft() });

    if (query) {
      this.setState({ results: "" });
      
      BooksAPI.search(query)
        .then( (results) => {
          if (Array.isArray(results) && (results.length > 0)) {
            results.map( (bookInResults, index) => {
              let temp = this.state.books.filter( (book) => {
                return book.id === bookInResults.id;
              });

              if (Array.isArray(temp) && (temp.length > 0)) {
                results[index].shelf = temp[0].shelf;
              } else {
                results[index].shelf = "none";
              }
              
              return temp;
          });

          this.setState({ results });
          //this.displayAllBooks();
        }
      })
    } else {
      this.setState({ results: "" });      
    }
  }

  render() {
    const {query} = this.state;
    let results = this.state.results;
    results = (results && results.length > 0) ? results : [];

    return (

      <div className="app">

        <Route exact path='/' render={ () => (
          // <ListBooks
          //   books={this.state.books}
          //   onBookShelfChange={this.changeBookShelf}/>

          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>

            <div className="list-books-content">
              <div>

                <Shelf
                  shelfTitle={"Currently Reading"}
                  shelfName={"currentlyReading"}
                  books={this.state.books}
                  onBookShelfChange={this.changeBookShelf}/>

                <Shelf
                  shelfTitle={"Want to Read"}
                  shelfName={"wantToRead"}
                  books={this.state.books}
                  onBookShelfChange={this.changeBookShelf}/>

                <Shelf
                  shelfTitle={"Read"}
                  shelfName={"read"}
                  books={this.state.books}
                  onBookShelfChange={this.changeBookShelf}/>

              </div>
            </div>

            <div className="open-search">
              <Link to='/search'>Add a book</Link>
            </div>

          </div>
        )}/>

        <Route path='/search' render={ () => (
          <div className="search-books">
            <div className="search-books-bar">
              
              <Link
                to="/"
                className="close-search"
                onClick={ () => {
                    this.setState( { query: "" }, { results: "" } )
                  }
                }>Close</Link>

              <div className="search-books-input-wrapper">
                <input type="text"
                  placeholder="Search by title or author"
                  value={query}
                  onChange={ (event) => {
                      this.updateQuery(event.target.value)
                    }
                  }/>
              </div>

            </div>

            <div className="search-books-results">
              <ol className="books-grid">
                {
                  results.map( (eachBook, index) => (
                    <li key={index} className="contact-list-item">
                      <Book
                        onBookShelfChange={this.changeBookShelf}
                        book={eachBook}
                      />
                    </li>
                  ) )
                }
              </ol>
            </div>

          </div>

        )}/>

      </div>
    )
  }

}

export default BooksApp
