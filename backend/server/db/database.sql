CREATE DATABASE sound_log;

CREATE TABLE users(
    user_id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    email VARCHAR(255) UNIQUE NOT NULL,
    username VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) UNIQUE NOT NULL,
    location VARCHAR(255),
    avatar VARCHAR(255),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE genres(
    genre_id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    type VARCHAR(255) NOT NULL
); 

CREATE TABLE tracks(
    track_id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    title VARCHAR(255) NOT NULL,
    artist_id uuid REFERENCES users(user_id) ON DELETE CASCADE,
    genre_id uuid REFERENCES genres(genre_id) ON DELETE CASCADE,
    description TEXT,
    track_image VARCHAR(255),
    track_file VARCHAR(255),
    created_at DATE NOT NULL DEFAULT NOW(),
    updated_at DATE NOT NULL DEFAULT NOW()
);

CREATE TABLE comments(
    comment_id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id uuid REFERENCES users(user_id) ON DELETE CASCADE,
    track_id uuid REFERENCES tracks(track_id) ON DELETE CASCADE,
    body TEXT NOT NULL,
    create_at DATE NOT NULL DEFAULT NOW(),
    updated_at DATE NOT NULL DEFAULT NOW()
);

CREATE TABLE likes(
    like_id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id uuid REFERENCES users(user_id) ON DELETE CASCADE,
    track_id uuid REFERENCES tracks(track_id) ON DELETE CASCADE
);

INSERT INTO genres (type) VALUES ('Hip hop')
INSERT INTO genres (type) VALUES ('Rock')
INSERT INTO genres (type) VALUES ('Jazz')
INSERT INTO genres (type) VALUES ('Pop');
INSERT INTO genres (type) VALUES ('Blues');
INSERT INTO genres (type) VALUES ('Punk');
INSERT INTO genres (type) VALUES ('Electronic dance');
INSERT INTO genres (type) VALUES ('Reggae');
INSERT INTO genres (type) VALUES ('Disco');
INSERT INTO genres (type) VALUES ('House');
INSERT INTO genres (type) VALUES ('Indie rock');
INSERT INTO genres (type) VALUES ('Instrumental');

INSERT INTO users (email, username, password) VALUES ('slowdive@gmail.com', 'slowdive', '123456789', 'Reading, UK');



SELECT * FROM tracks INNER JOIN users ON users.user_id = tracks.artist_id WHERE users.user_id = $1


DROP TABLE genres;
DROP TABLE comments;
DROP TABLE likes;
DROP TABLE tracks;
DROP TABLE users;