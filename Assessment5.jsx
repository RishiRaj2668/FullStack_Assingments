import React, { useState, useEffect } from "react";

// Single-file React component for a small Library Management UI
// Uses Tailwind CSS for styling (you can drop these classes or replace with your own CSS)

export default function LibraryManagement() {
  const initialBooks = [
    { id: 1, title: "1984", author: "George Orwell" },
    { id: 2, title: "The Great Gatsby", author: "F. Scott Fitzgerald" },
    { id: 3, title: "To Kill a Mockingbird", author: "Harper Lee" },
  ];

  const [books, setBooks] = useState(() => {
    // try to load from localStorage so page refresh keeps list (optional)
    try {
      const raw = localStorage.getItem("lb_books");
      return raw ? JSON.parse(raw) : initialBooks;
    } catch {
      return initialBooks;
    }
  });

  const [query, setQuery] = useState("");
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");

  useEffect(() => {
    try {
      localStorage.setItem("lb_books", JSON.stringify(books));
    } catch {}
  }, [books]);

  function handleAdd(e) {
    e.preventDefault();
    const t = title.trim();
    const a = author.trim();
    if (!t || !a) return;

    const nextId = books.length ? Math.max(...books.map((b) => b.id)) + 1 : 1;
    setBooks([{ id: nextId, title: t, author: a }, ...books]);
    setTitle("");
    setAuthor("");
  }

  function handleRemove(id) {
    setBooks(books.filter((b) => b.id !== id));
  }

  const lowered = query.toLowerCase();
  const filtered = books.filter(
    (b) =>
      b.title.toLowerCase().includes(lowered) ||
      b.author.toLowerCase().includes(lowered)
  );

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="border-2 border-gray-300 rounded p-6">
        <h1 className="text-3xl font-extrabold mb-4">Library Management</h1>

        {/* Search */}
        <input
          type="text"
          placeholder="Search by title or author"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full border rounded px-4 py-3 mb-4 focus:outline-none focus:ring"
        />

        {/* Add form */}
        <form onSubmit={handleAdd} className="flex gap-3 items-center mb-6 flex-wrap">
          <input
            type="text"
            placeholder="New book title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="flex-1 min-w-[180px] border rounded px-3 py-2"
          />
          <input
            type="text"
            placeholder="New book author"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            className="flex-1 min-w-[180px] border rounded px-3 py-2"
          />
          <button
            type="submit"
            className="bg-gray-100 border rounded px-4 py-2 hover:shadow"
          >
            Add Book
          </button>
        </form>

        {/* Books list */}
        <div className="space-y-4">
          {filtered.length === 0 ? (
            <div className="text-gray-500">No books found.</div>
          ) : (
            filtered.map((b) => (
              <div
                key={b.id}
                className="flex items-center justify-between border rounded p-4 bg-white"
              >
                <div>
                  <div className="font-semibold text-lg">{b.title}</div>
                  <div className="text-sm text-gray-600">by {b.author}</div>
                </div>
                <div>
                  <button
                    onClick={() => handleRemove(b.id)}
                    className="border rounded px-3 py-2 bg-gray-100 hover:shadow"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Small example box showing filtered result (like the second screenshot) */}
      <div className="mt-8 border-2 border-gray-300 rounded p-6">
        <h2 className="text-2xl font-bold mb-4">Filtered Preview</h2>
        <input
          type="text"
          placeholder="type to filter (example: great)"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full border rounded px-4 py-3 mb-4"
        />

        <div className="space-y-4">
          {filtered.length === 0 ? (
            <div className="text-gray-500">No books found in preview.</div>
          ) : (
            filtered.map((b) => (
              <div
                key={`mini-${b.id}`}
                className="flex items-center justify-between border rounded p-4 bg-white"
              >
                <div>
                  <div className="font-semibold">{b.title}</div>
                  <div className="text-sm text-gray-600">by {b.author}</div>
                </div>
                <div>
                  <button
                    onClick={() => handleRemove(b.id)}
                    className="border rounded px-3 py-2 bg-gray-100"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
