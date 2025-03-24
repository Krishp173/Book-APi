const bookService = require('../services/bookService');

exports.createBook = async (req, res) => {
    try {
        const book = await bookService.createBook(req.body);
        res.status(201).json(book);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.getBooks = async (req, res) => {
    const books = await bookService.getAllBooks();
    res.json(books);
};

exports.getBookById = async (req, res) => {
    const book = await bookService.getBookById(req.params.id);
    if (book) {
        res.json(book);
    } else {
        res.status(404).json({ error: 'Book not found' });
    }
};

exports.updateBook = async (req, res) => {
    try {
        const updatedBook = await bookService.updateBook(req.params.id, req.body);
        res.json(updatedBook);
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
};

exports.deleteBook = async (req, res) => {
    try {
        await bookService.deleteBook(req.params.id);
        res.json({ message: 'Book deleted' });
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
};
