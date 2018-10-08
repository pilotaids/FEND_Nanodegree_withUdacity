import React, { Component } from 'react';
import PropTypes from 'prop-types'

class Book extends Component {
  static propTypes = {
    book: PropTypes.object.isRequired,
    onBookShelfChange: PropTypes.func.isRequired
  }

  render() {
    const { book, onBookShelfChange } = this.props
    let url = (book.imageLinks) ? 'url(' + book.imageLinks.thumbnail + ')' : '';
    let author = (book.authors && book.authors.length > 0) ? book.authors : [];

    return (
      <div className="book">

        <div className="book-top">

          <div
            className="book-cover"
            style={
              { width: 128,
                height: 193,
                backgroundImage: url.toString()}
              }>
          </div>

          <div className="book-shelf-changer">
            <select onChange={(e) => onBookShelfChange(book, e.target.value)} value={book.shelf}>
              <option value="move" disabled>Move to...</option>
              <option value="currentlyReading">Currently Reading</option>
              <option value="wantToRead">Want to Read</option>
              <option value="read">Read</option>
              <option value="none">None</option>
            </select>
          </div>

        </div>

        <div className="book-title">{book.title}</div>
        <div className="book-authors">
              {Array.isArray(author) ? author.join(', ') : ''}
        </div>

      </div>
    )
  }
}

export default Book;
