const db = require('./db')
db.query("SET search_path TO 'itway_kinopoisk_2';")

const createGenre = async (req, res) => {
    const {name, film_id} = req.body;
    const genre = await db.query(`INSERT INTO genre (name, film_id)
                                  VALUES ($1, $2)
                                  RETURNING *;`, [name, film_id]);
    res.send(genre.rows[0]);
}

const getGenresByFilm = async (req, res) => {
    const params = req.params;

    if (params !== undefined && params.film_id !== undefined) {
        const film_id = params.film_id;
        const genre = await db.query('SELECT * FROM genre WHERE film_id = $1;', [film_id]);
        if (genre.rowCount) {
            res.send(genre.rows);
        } else {
            res.send({message: `Genres not found by film id = ${film_id}`});
        }
    } else {
        const genres = await db.query('SELECT * FROM genre;');
        res.send(genres.rows);
    }
}

const updateGenre = async (req, res) => {
    const {id, name} = req.body;
    const genre = await db.query(`UPDATE genre
                                  SET name = $1
                                  WHERE id = $2
                                  RETURNING *;`, [name, id]);
    if (genre.rowCount) {
        res.send(genre.rows[0]);
    }
}

const deleteGenreById = async (req, res) => {
    const params = req.params;

    if (params !== undefined && params.id !== undefined) {
        const id = params.id;
        const genre = await db.query(`DELETE FROM genre WHERE id = $1;`, [id]);
        if (genre.rowCount) {
            res.send({message: `Genre deleted by id = ${id}`});
        } else {
            res.send({message: `Genre does not exist by id = ${id}`});
        }
    }
}

module.exports = {
    createGenre: createGenre,
    getGenresByFilm: getGenresByFilm,
    updateGenre: updateGenre,
    deleteGenreById: deleteGenreById,
}