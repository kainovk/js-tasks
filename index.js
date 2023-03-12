const Application = require('./2/server/Application');
const filmRouter = require('./2/server/film-router');
const genreRouter = require('./2/server/genre-router');
const jsonParser = require('./2/server/parse-json');
const parseUrl = require('./2/server/parse-url');

const PORT = process.env.PORT || 9090;
const app = new Application()

app.use(jsonParser);
app.use(parseUrl('http://localhost:' + PORT));

app.addRouter(filmRouter);
app.addRouter(genreRouter);


const start = async () => {
    app.listen(PORT, () => console.log(`Server started on PORT ${PORT}`))
}

start()
