-- https://www.kinopoisk.ru/film/435/

set search_path to itway_kinopoisk_1;

DROP TABLE IF EXISTS duplicated_roles;
DROP TABLE IF EXISTS main_roles;
DROP TABLE IF EXISTS film_viewer;
DROP TABLE IF EXISTS film_genre;
DROP TABLE IF EXISTS film;
DROP TABLE IF EXISTS viewer;
DROP TABLE IF EXISTS genre;
DROP TABLE IF EXISTS person;

CREATE TABLE person
(
	id bigserial PRIMARY KEY,
	name varchar(255) NOT NULL,
	roles text,
	height real,
	birthday_dt date
);

CREATE TABLE genre
(
	id bigserial PRIMARY KEY,
	name varchar(255) NOT NULL
);

CREATE TABLE viewer
(
	id bigserial PRIMARY KEY,
	country varchar(128) NOT NULL,
	viewer_number int NOT NULL
);

CREATE TABLE film
(
	id bigserial PRIMARY KEY,
	year smallint NOT NULL,
	country_name varchar(128) NOT NULL,
	tagline text NOT NULL,
	stage_directors bigint REFERENCES person(id) NOT NULL,
	scenario bigint REFERENCES person(id) NOT NULL,
	producers bigint REFERENCES person(id) NOT NULL,
	operators bigint REFERENCES person(id) NOT NULL,
	composers bigint REFERENCES person(id) NOT NULL,
	artists bigint REFERENCES person(id) NOT NULL,
	editors bigint REFERENCES person(id) NOT NULL,
	budget bigint NOT NULL,
	marketing bigint NOT NULL,
	fees_usa bigint NOT NULL,
	fees_total bigint NOT NULL,
	premiere_ru_dt date,
	premiere_world_dt date,
	release_dvd_dt date,
	age_limit smallint NOT NULL,
	rating_mpaa char(5),
	duration_min smallint NOT NULL
);

CREATE TABLE film_genre
(
	film_id bigint REFERENCES film(id) ON UPDATE CASCADE ON DELETE CASCADE,
	genre_id bigint REFERENCES genre(id) ON UPDATE CASCADE,
	CONSTRAINT pk_film_genre PRIMARY KEY (film_id, genre_id)
);

CREATE TABLE film_viewer
(
	film_id bigint REFERENCES film(id) ON UPDATE CASCADE ON DELETE CASCADE,
	viewer_id bigint REFERENCES viewer(id) ON UPDATE CASCADE,
	CONSTRAINT pk_film_viewer PRIMARY KEY (film_id, viewer_id)
);

CREATE TABLE main_roles
(
	film_id bigint REFERENCES film(id) ON UPDATE CASCADE ON DELETE CASCADE,
	person_id bigint REFERENCES person(id) ON UPDATE CASCADE,
	CONSTRAINT pk_film_person_main_roles PRIMARY KEY (film_id, person_id)
);

CREATE TABLE duplicated_roles
(
	film_id bigint REFERENCES film(id) ON UPDATE CASCADE ON DELETE CASCADE,
	person_id bigint REFERENCES person(id) ON UPDATE CASCADE,
	CONSTRAINT pk_film_person_duplicated_roles PRIMARY KEY (film_id, person_id)
);
