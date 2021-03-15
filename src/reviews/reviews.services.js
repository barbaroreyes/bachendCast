const knex = require("../db/connection");

const read = ( reviewId) =>
  knex("reviews")
  .select()
  .where({ review_id: reviewId })
  .first();

const updateReviewById =  (updateReview) =>
  knex("reviews")
  .select()
  .where({ review_id: updateReview.review_id  })
  .update(updateReview, "*");

const getCriticById = ( criticId) =>
  knex("critics")
  .select()
  .where({ critic_id: criticId })
  .first();

const deleteReviewById = ( reviewId) =>
  knex("reviews")
  .where({ review_id: reviewId })
  .delete();
  
module.exports = {
  read,
  updateReviewById,
  deleteReviewById,
  getCriticById,
};
