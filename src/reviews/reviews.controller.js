const service = require("./reviews.services");

async function checkId(req, res, next) {
  const error = `cannot be found.`
  const { reviewId } = req.params;
  if (!reviewId) return next(error);
  const review = await service.read(reviewId);
  if (!review) return res.status(404).json({error});
  res.locals.review = review;
  next();
}
async function update(req, res) {
  const { review } = res.locals;
  const updatedReview = { ...review ,...req.body.data};
  
   await service.updateReviewById( updatedReview );
   updatedReview.critic = await service.getCriticById(
    updatedReview.critic_id
  );
 
  res.json({ data: updatedReview });
}
async function destroy(req, res) {
  const { reviewId } = req.params;
  await service.deleteReviewById( reviewId);
  res.sendStatus(204);
}
module.exports = {
  update: [checkId, update],
  delete: [checkId, destroy],
};

