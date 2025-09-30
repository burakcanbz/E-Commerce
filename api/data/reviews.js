const reviews = [
  { rating: 5, comment: "Great product!", createdAt: new Date().toLocaleDateString('en-CA').split('T')[0] },
  { rating: 4, comment: "Very useful.", createdAt: new Date().toLocaleDateString('en-CA').split('T')[0] },
  { rating: 3, comment: "It's okay.", createdAt: new Date("2023-10-03").toLocaleDateString('en-CA').split('T')[0] },
  { rating: 5, comment: "Exceeded my expectations!", createdAt: new Date("2023-10-04").toLocaleDateString('en-CA').split('T')[0] },
  { rating: 2, comment: "Not what I expected.", createdAt: new Date("2023-10-05").toLocaleDateString('en-CA').split('T')[0] },
];

module.exports = reviews;