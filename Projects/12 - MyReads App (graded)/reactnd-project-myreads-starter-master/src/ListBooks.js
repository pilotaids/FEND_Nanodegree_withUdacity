import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import Shelf from './Shelf'

class ListBooks extends Component {
  static propTypes = {
    books: PropTypes.array.isRequired,
    onBookShelfChange: PropTypes.func.isRequired
  }

  render() {
    const { books, onBookShelfChange } = this.props

    return (
      <div className="list-books">

        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>

        <div className="list-books-content">
          <div>

            <Shelf
              shelfTitle={"Currently Reading"}
              shelfName={"currentlyReading"}
              books={books}
              onBookShelfChange={onBookShelfChange}/>

            <Shelf
              shelfTitle={"Want to Read"}
              shelfName={"wantToRead"}
              books={books}
              onBookShelfChange={onBookShelfChange}/>

            <Shelf
              shelfTitle={"Read"}
              shelfName={"read"}
              books={books}
              onBookShelfChange={onBookShelfChange}/>

          </div>
        </div>

        <div className="open-search">
          <Link to='/search'>Add a book</Link>
        </div>

      </div>
    )
  }

}

export default ListBooks
