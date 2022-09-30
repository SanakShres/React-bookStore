import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Books = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const res = await axios.get("http://localhost:8800/books");
        setBooks(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchBooks();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8800/books/${id}`);
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="books_container">
      <h1>Our Book Shop</h1>
      <div className="books">
        {books.map((book) => (
          <div className="book" key={book.id}>
            {book.cover ? (
              <img src={book.cover} alt="" />
            ) : (
              <img
                src="https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
                alt=""
              />
            )}
            <div className="book_body">
              <span>Rs. {book.price}</span>
              <h2>{book.title}</h2>
              <div>
                <p>{book.desc}</p>
              </div>
            </div>
            <Link
              to={`/update/${book.id}`}
              className="book_action btn btn-outline-primary"
            >
              Edit
            </Link>
            <button
              type="button"
              className="book_action btn btn-outline-danger"
              onClick={() => handleDelete(book.id)}
            >
              Delete
            </button>
          </div>
        ))}
      </div>
      <div>
        <Link to="/add" className="btn btn-success">
          Add new book
        </Link>
      </div>
    </div>
  );
};

export default Books;
