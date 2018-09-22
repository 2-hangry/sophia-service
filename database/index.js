const mysql = require('mysql');

const connection = mysql.createConnection({
  user: 'hellohello810',
  password: 'porkchop3438',
  database: 'zelp',
  host: 'zelp-reviews.cgfgu0rdwoln.us-east-1.rds.amazonaws.com'

  // user: 'root',
  // password: '',
  // database: 'zelp'
});

connection.connect();

const businessPageReviewsLoading = (businessId, callback) => {
  const queryString = `SELECT * FROM reviews INNER JOIN users 
                       ON reviews.UserKey = users.id
                       INNER JOIN businesses ON reviews.Businesskey = businesses.id
                       WHERE reviews.Businesskey = ${businessId}
                       `;
  connection.query(queryString, (err, result) => {
    if (err) {
      callback(err, null);
    } else {
      callback(null, result);
    }
  });
};

const reviewsSorting = (businessSortParam, callback) => {
  const queryString = `SELECT * FROM reviews INNER JOIN users 
                       ON reviews.UserKey = users.id
                       WHERE reviews.Businesskey = ${businessSortParam[0]}
                       ORDER BY ${businessSortParam[1]}`;
  connection.query(queryString, (err, result) => {
    if (err) {
      callback(err, null);
    } else {
      callback(null, result);
    }
  });
};

const reviewsFilter = (businessfilterParam, callback) => {
  const queryString = `SELECT * FROM reviews INNER JOIN users 
                       ON reviews.UserKey = users.id
                       WHERE reviews.Businesskey = ${businessfilterParam[0]}
                       AND reviews.Language = '${businessfilterParam[1]}'`;
  connection.query(queryString, (err, result) => {
    if (err) {
      callback(err, null);
    } else {
      callback(null, result);
    }
  });
};

// might have to double check the query string for Foreign Key look up.
const postNewReview = (reviewParams, callback) => {
  console.log(reviewParams);
  const queryString = `INSERT INTO reviews (StarRating, ReviewBody, DateTime, Language, Businesskey, UserKey)
                       VALUES (?, ?, ?, ?, ?, (SELECT id FROM users WHERE users.id === UserKey?)`;
  connection.query(queryString, reviewParams, (err, result) => {
    if (err) {
      callback(err, null);
    } else {
      callback(null, result);
    }
  });
};
// might have to double check the query string
const voteReview = (voteParams, callback) => {
  const queryString = `UPDATE reviews SET reviews.${voteParams[1]} = reviews.${voteParam[1]} + 1 
                       WHERE reviews.BusinessKey = ${voteParams[0]} AND reviews.UserKey = ${voteParam[2]}`;
  connection.query(queryString, (err, result) => {
    if (err) {
      callback(err, null);
    } else {
      callback(null, result);
    }
  });
};

module.exports.businessPageReviewsLoading = businessPageReviewsLoading;
module.exports.reviewsSorting = reviewsSorting;
module.exports.reviewsFilter = reviewsFilter;
module.exports.postNewReview = postNewReview;
module.exports.voteReview = voteReview;
