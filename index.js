const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");

// Middleware
app.use(cors());
app.use(express.json());

// Routes

// Create
// app.post("/books", async (req, res) => {
//   try {
//     const { Book_id, Publisher_id, Author_id, Book_name, Publication_year, Book_pages } = req.body;
//     const besBook = await pool.query(
//       'INSERT INTO "Book" ("Book_id", "Publisher_id", "Author_id", "Book_name", "Publication_year", "Book_pages") VALUES ($1, $2, $3, $4, $5, $6)',
//       [Book_id, Publisher_id, Author_id, Book_name, Publication_year, Book_pages]
//     );
//     res.json(besBook);
//   } catch (err) {
//     console.error(err.message);
//   }
// });

//create books 
app.post("/books", async (req, res) => {
  try {
    // Start a transaction
    await pool.query("BEGIN");
    const { Book_id, Publisher_id, Author_id, Book_name, Publication_year, Book_pages } = req.body;
    const besBook = await pool.query(
      'INSERT INTO "Book" ("Book_id", "Publisher_id", "Author_id", "Book_name", "Publication_year", "Book_pages") VALUES ($1, $2, $3, $4, $5, $6)',
      [author_name, author_number, year_born, year_died]
    );
  
    // Commit the transaction
    await pool.query("COMMIT");
  
    res.json(besBook.rows[0]);
  } catch (err) {
    // Rollback the transaction on error
    await pool.query("ROLLBACK");
  
    console.error(err.message);
    res.status(500).send("Server Error");
  }
  });;
  //insert-end

// Read
app.get("/books", async (req, res) => {
  try {
    const besBook = await pool.query('SELECT * FROM "Book";');
    res.json(besBook.rows); // Return the queried rows as JSON response
  } catch (err) {
    console.error(err.message);
  }
});

//update
// Update
app.put("/books/:id", async (req, res) => {
  try {
    const { id } = req.params; // Get the book ID from the URL parameter
    const { Publisher_id, Author_id, Book_name, Publication_year, Book_pages } = req.body;
    const updatedBook = await pool.query(
      'UPDATE "Book" SET "Publisher_id" = $1, "Author_id" = $2, "Book_name" = $3, "Publication_year" = $4, "Book_pages" = $5 WHERE "Book_id" = $6',
      [Publisher_id, Author_id, Book_name, Publication_year, Book_pages, id]
    );
    res.json(updatedBook);
  } catch (err) {
    console.error(err.message);
  }
});

// Delete
app.delete("/books/:id", async (req, res) => {
  try {
    const { id } = req.params; // Get the book ID from the URL parameter
    const deletedBook = await pool.query('DELETE FROM "Book" WHERE "Book_id" = $1', [id]
    );
    res.json("Book was deleted!");
  } catch (err) {
    console.error(err.message);
  }
});

app.post("/query", async (req, res) => {
  try {
      const {query} = req.body;
      const result = await pool.query(query);
      res.json(result.rows);
  } catch (err) {
      console.error(err.message);
  }
});


app.listen(3000, () => {
  console.log("server has started on port 3000");
});
