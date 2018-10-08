import React, { Component } from 'react';
import PropTypes from 'prop-types'
import sortBy from 'sort-by'
import Book from './Book'

class Shelf extends Component {
  static propTypes = {
    shelfTitle: PropTypes.string.isRequired,
    shelfName: PropTypes.string.isRequired,
    books: PropTypes.array.isRequired,
    onBookShelfChange: PropTypes.func.isRequired
  }

  render() {
    const { shelfTitle, shelfName, books, onBookShelfChange } = this.props
    books.sort(sortBy('title'))

    return (
      <div className="bookshelf">

        <h2 className="bookshelf-title">{shelfTitle}</h2>
        <div className="bookshelf-books">
          <ol className="books-grid">
            {
              books.filter(function (singleBook) {
                return singleBook.shelf === shelfName
              }).map((singleBook, index) => (
                  <li key={index} className='contact-list-item'>
                    <Book
                      book={singleBook}
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

export default Shelf;
