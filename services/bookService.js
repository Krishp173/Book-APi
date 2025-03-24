const bookDb = require('../db/bookDb');
let idCounter = 1;

exports.createBook = async (bookData) => {
    const { title, author, publishedYear } = bookData;
    if (!title || !author) throw new Error('Title and author are required');
    const book = { id: idCounter++, title, author, publishedYear };
    bookDb.books.push(book);
    return book;
};

exports.getAllBooks = async () => {
    return bookDb.books;
};

exports.getBookById = async (id) => {
    return bookDb.books.find(book => book.id === parseInt(id));
};

exports.updateBook = async (id, bookData) => {
    const book = await this.getBookById(id);
    if (!book) throw new Error('Book not found');
    const { title, author, publishedYear } = bookData;
    if (!title || !author) throw new Error('Title and author are required');
    book.title = title;
    book.author = author;
    book.publishedYear = publishedYear;
    return book;
};

exports.deleteBook = async (id) => {
    const index = bookDb.books.findIndex(book => book.id === parseInt(id));
    if (index === -1) throw new Error('Book not found');
    bookDb.books.splice(index, 1);
};
