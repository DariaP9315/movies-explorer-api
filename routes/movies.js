const router = require('express').Router();

const { validateMovieSchema } = require('../middlewares/validation');
const { getMovies, createMovie, deleteMovie } = require('../controllers/movies');

router.get('/', getMovies);
router.post('/', validateMovieSchema, createMovie);
router.delete('/:movieId', deleteMovie);

module.exports = router;
