const Router = require('./Router');
const controller = require('./film-controller');
const router = new Router()

const PATH_FILMS = '/films';

router.post(PATH_FILMS, controller.createFilm)
router.get(PATH_FILMS, controller.getFilms)
router.put(PATH_FILMS, controller.updateFilm)
router.delete(PATH_FILMS, controller.deleteFilmById)

module.exports = router
