import React, { Component } from 'react';
import * as BooksAPI from './BooksAPI'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import sortBy from 'sort-by'
import Book from './Book'

class Search extends Component {
  static propTypes = {
    books: PropTypes.array.isRequired,
    onBookShelfChange: PropTypes.func.isRequired
  }

  state = {
    query: '',
    results: []
  }

  updateQuery = (query) => {
    this.setState({ query: query.trimLeft() });

    if (query) {
      this.setState({ results: "" });
      
      BooksAPI.search(query)
        .then( (results) => {
          if (Array.isArray(results) && (results.length > 0)) {
            results.map( (bookInResults, index) => {
              let temp = this.props.books.filter( (book) => {
                return book.id === bookInResults.id;
              });

              if (Array.isArray(temp) && (temp.length > 0)) {
                results[index].shelf = temp[0].shelf;
              } else {
                results[index].shelf = "none";
              }
              
              return temp;
          });

          results.sort(sortBy('title'))
          
          this.setState({ results });
        }
      })
    } else {
      this.setState({ results: "" });      
    }
  }

  render() {
    const onBookShelfChange = this.props.onBookShelfChange
    const { query } = this.state;
    let results = this.state.results;
    results = (results && results.length > 0) ? results : [];

    return (
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
              results.map( (bookFound, index) => (
                  <li key={index} className="contact-list-item">
                    <Book
                      book={bookFound}
                      onBookShelfChange={onBookShelfChange}/>
                  </li>
                )
              )
            }
          </ol>
        </div>

      </div>
    )
  }

}

export default Search
