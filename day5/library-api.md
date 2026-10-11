# Library API - Books Resource

A simple REST API design for managing a library's books collection. All endpoints
are relative to the base URL `https://api.example.com`.

## Endpoints

### 1. List all books

- **Method:** `GET`
- **Path:** `/books`
- **Description:** Returns a list of all books in the library.
- **Success status code:** `200 OK`

### 2. Get one book

- **Method:** `GET`
- **Path:** `/books/:id`
- **Description:** Returns a single book by its ID.
- **Success status code:** `200 OK`

### 3. Create a book

- **Method:** `POST`
- **Path:** `/books`
- **Description:** Adds a new book to the library.
- **Example request body:**

```json
{
  "title": "Clean Code",
  "author": "Robert C. Martin",
  "year": 2008
}
```

- **Success status code:** `201 Created`

### 4. Update a book

- **Method:** `PUT`
- **Path:** `/books/:id`
- **Description:** Fully replaces the data of an existing book.
- **Example request body:**

```json
{
  "title": "Clean Code: A Handbook of Agile Software Craftsmanship",
  "author": "Robert C. Martin",
  "year": 2008
}
```

- **Success status code:** `200 OK`

### 5. Delete a book

- **Method:** `DELETE`
- **Path:** `/books/:id`
- **Description:** Removes a book from the library.
- **Success status code:** `204 No Content`

### 6. List books by author

- **Method:** `GET`
- **Path:** `/books?author=Robert+C.+Martin`
- **Description:** Returns only the books written by the author given in the `author` query parameter.
- **Success status code:** `200 OK`

## Error Codes

### 400 Bad Request

- **When it happens:** The request body is missing required fields or has invalid data.
- **Example:** Sending `POST /books` with a body of `{"title": "Clean Code"}`
  and no `author` field, because `author` is required.

### 404 Not Found

- **When it happens:** No book exists with the requested ID.
- **Example:** Sending `GET /books/999` when the library only has books with IDs 1-10.
