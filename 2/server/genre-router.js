const Router = require('./Router');
const controller = require('./genre-controller');
const router = new Router()

const PATH_GENRES = '/genres';

router.post(PATH_GENRES, controller.createGenre)
router.get(PATH_GENRES, controller.getGenresByFilm)
router.put(PATH_GENRES, controller.updateGenre)
router.delete(PATH_GENRES, controller.deleteGenreById)

module.exports = router
