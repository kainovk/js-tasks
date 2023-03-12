const db = require('./db')
db.query("SET search_path TO 'itway_kinopoisk_2';")

const createFilm = async (req, res) => {
    const {name, release_year} = req.body;
    const film = await db.query(`INSERT INTO film (name, release_year)
                                 VALUES ($1, $2)
                                 RETURNING *;`, [name, release_year]);
    res.send(film.rows[0]);
}

const getFilms = async (req, res) => {
    const params = req.params;

    if (params !== undefined && params.id !== undefined) {
        const id = params.id;
        const film = await db.query('SELECT * FROM film WHERE id = $1;', [id]);
        if (film.rowCount) {
            res.send(film.rows[0]);
        } else {
            res.send({message: `Film not found by id = ${id}`});
        }
    } else {
        const films = await db.query('SELECT * FROM film;');
        res.send(films.rows);
    }
}

const updateFilm = async (req, res) => {
    const {id, name, release_year} = req.body;
    const film = await db.query(`UPDATE film
                                 SET name         = $1,
                                     release_year = $2
                                 WHERE id = $3
                                 RETURNING *;`, [name, release_year, id]);
    if (film.rowCount) {
        res.send(film.rows[0]);
    }
}

const deleteFilmById = async (req, res) => {
    const params = req.params;

    if (params !== undefined && params.id !== undefined) {
        const id = params.id;
        const film = await db.query(`DELETE FROM film WHERE id = $1;`, [id]);
        if (film.rowCount) {
            res.send({message: `Film deleted by id = ${id}`});
        } else {
            res.send({message: `Film does not exist by id = ${id}`});
        }
    }
}

module.exports = {
    createFilm: createFilm,
    getFilms: getFilms,
    updateFilm: updateFilm,
    deleteFilmById: deleteFilmById,
}