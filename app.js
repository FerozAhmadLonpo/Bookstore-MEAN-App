const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');
const cors = require('cors');



Genre = require('./models/genre');
Book = require('./models/book');

const app = express();

// Connect to database
mongoose.set('useFindAndModify', false);
mongoose.connect('mongodb://localhost/bookstore', { useNewUrlParser: true, useUnifiedTopology: true });
let db = mongoose.connection;

db.once('open', () => console.log('connected to mongodb'));

app.use(express.static(path.join(__dirname, 'client')));
app.use(bodyParser.json());
app.use(cors());

app.get('/', function (req, res) {
  res.send('Please use /api/books or /api/genres');
});

app.get('/api/genres', function (req, res) {
  Genre.getGenres(function (err, genres) {
    if (err) {
      throw err;
    }
    res.json(genres);
  });
});



app.post('/api/genres', function (req, res) {
  let genre = req.body
  Genre.addGenre(genre, function (err, genre) {
    if (err) {
      throw err;
    }
    res.json(genre);
  });
});

app.put('/api/genres/:id', function (req, res) {
  let id = req.params.id;
  let genre = req.body;
  Genre.updateGenre(id, genre, {}, function (err, genre) {
    if (err) {
      throw err;
    }
    res.json(genre);
  });
});

app.delete('/api/genres/:id', function (req, res) {
  let id = req.params.id;
  Genre.removeGenre(id, function (err, genre) {
    if (err) {
      throw err;
    }
    res.json(genre);
  });
});


app.get('/api/books', function (req, res) {
  Book.getBooks(function (err, books) {
    if (err) {
      throw err;
    }
    res.json(books);
  });
});


app.get('/api/books/:id', function (req, res) {
  Book.getBookById(req.params.id, function (err, book) {
    if (err) {
      throw err;
    }
    res.json(book);
  });
});

app.post('/api/books', function (req, res) {
  let book = req.body
  Book.addBook(book, function (err, book) {
    if (err) {
      throw err;
    }
    res.json(book);
  });
});

app.put('/api/books/:id', function (req, res) {
  let id = req.params.id;
  let book = req.body;
  Book.updateBook(id, book, {}, function (err, book) {
    if (err) {
      throw err;
    }
    res.json(book);
  });
});

app.delete('/api/books/:id', function (req, res) {
  let id = req.params.id;
  Book.removeBook(id, function (err, book) {
    if (err) {
      throw err;
    }
    res.json(book);
  });
});

app.listen(3000, function (req, res) { console.log('Server started on port 3000') });
