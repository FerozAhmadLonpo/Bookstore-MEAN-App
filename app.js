var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var path = require('path');



Genre = require('./models/genre');
Book = require('./models/book');

var app = express();

// Connect to database
mongoose.connect('mongodb://localhost/bookstore', { useNewUrlParser: true, useUnifiedTopology: true });
var db = mongoose.connection;

app.use(express.static(path.join(__dirname, 'client')));
app.use(bodyParser.json());

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
  var genre = req.body
  Genre.addGenre(genre, function (err, genre) {
    if (err) {
      throw err;
    }
    res.json(genre);
  });
});

app.put('/api/genres/:id', function (req, res) {
  var id = req.params.id;
  var genre = req.body;
  Genre.updateGenre(id, genre, {}, function (err, genre) {
    if (err) {
      throw err;
    }
    res.json(genre);
  });
});

app.delete('/api/genres/:id', function (req, res) {
  var id = req.params.id;
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
  var book = req.body
  Book.addBook(book, function (err, genre) {
    if (err) {
      throw err;
    }
    res.json(book);
  });
});

app.put('/api/books/:id', function (req, res) {
  var id = req.params.id;
  var book = req.body;
  Book.updateBook(id, book, {}, function (err, book) {
    if (err) {
      throw err;
    }
    res.json(book);
  });
});

app.delete('/api/books/:id', function (req, res) {
  var id = req.params.id;
  Book.removeBook(id, function (err, book) {
    if (err) {
      throw err;
    }
    res.json(book);
  });
});

app.listen(3000, function (req, res) { console.log('Server started on port 3000') });
