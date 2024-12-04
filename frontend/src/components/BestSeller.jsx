import React from 'react';

export default function BestSellers() {
  const bestSellers = [
    { id: 1, title: "The Great Gatsby", author: "F. Scott Fitzgerald", imageUrl: "/placeholder.svg?height=200&width=150" },
    { id: 2, title: "To Kill a Mockingbird", author: "Harper Lee", imageUrl: "/placeholder.svg?height=200&width=150" },
    { id: 3, title: "1984", author: "George Orwell", imageUrl: "/placeholder.svg?height=200&width=150" },
  ];

  return (
    <section>
      <h2 className="text-2xl font-semibold mb-6">Best Sellers</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {bestSellers.map((book) => (
          <div key={book.id} className="bg-gray-800 rounded-lg overflow-hidden shadow-lg">
            <img src={book.imageUrl} alt={book.title} className="w-full h-48 object-cover" />
            <div className="p-4">
              <h3 className="font-semibold text-lg mb-1">{book.title}</h3>
              <p className="text-gray-400">{book.author}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}