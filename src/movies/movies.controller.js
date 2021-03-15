const service = require('./movies.service');
const treeize = require('../utils/treeize')

const read = async (req,res,next)=> {
    let response; 
    if(req.originalUrl.includes('theaters')){
      response =  await service.getMovieByTheaters(Number(req.params.movieId));
      res.json({data: response})
    }else{
    res.json({data: res.locals.movie})
   }  
}

  async function movieExists(req, res, next) {
 const error = { status: 404, message: `Movie cannot be found.` };
 const {movieId} = req.params; 
  if (!movieId) return next(error);
     const movie = await service.getMoviesById(movieId)
     if (!movie) return next(error);
       res.locals.movie = movie;
       next();
  }
  

async function list(req, res, next) {
  if (req.query.is_showing === "true") {
    await activeMovies(req, res, next);
  } else {
  
    const data = await service.getAllMovies();
    res.json({ data });
  }
}
async function activeMovies(req, res, next) {
  const knexInstance = req.app.get("db");
  const data = await service.getMoviesShowing(knexInstance);
  res.json({ data });
}

async function movieReviews(req, res, next) {
  const knexInstance = req.app.get("db");
  let data = await service.getMovieReviews(req.params.movieId, knexInstance);
  data = treeize(data);
  res.json({ data });
}

module.exports ={
    list :[list],
    read : [movieExists,read ],
    movieReviews: [movieExists,movieReviews]
}