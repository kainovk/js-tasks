CREATE TABLE film
(
    id           bigserial PRIMARY KEY,
    name         varchar(255) NOT NULL,
    release_year smallint     NOT NULL
);

CREATE TABLE genre
(
    id      bigserial PRIMARY KEY,
    name    varchar(255) NOT NULL,
    film_id bigint REFERENCES film (id)
);
