CREATE DATABASE sound_log;

CREATE TABLE users(
    id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    email VARCHAR(255) UNIQUE NOT NULL,
    username VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) UNIQUE NOT NULL,
    location VARCHAR(255),
    avatar VARCHAR(255),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE genres(
    id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    type VARCHAR(255) NOT NULL
); 

CREATE TABLE tracks(
    id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    title VARCHAR(255) NOT NULL,
    artist uuid REFERENCES users(id) ON DELETE CASCADE,
    genre uuid REFERENCES genres(genre) ON DELETE CASCADE,
    description TEXT,
    image VARCHAR(255),
    audio VARCHAR(255),
    created_at DATE NOT NULL DEFAULT NOW(),
    updated_at DATE NOT NULL DEFAULT NOW()
);

CREATE TABLE comments(
    id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id uuid REFERENCES users(id) ON DELETE CASCADE,
    track_id uuid REFERENCES tracks(id) ON DELETE CASCADE,
    body TEXT NOT NULL,
    create_at DATE NOT NULL DEFAULT NOW()
);

CREATE TABLE likes(
    id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    user uuid REFERENCES users(id) ON DELETE CASCADE,
    track uuid REFERENCES tracks(track) ON DELETE CASCADE
);


CREATE TABLE playlists(
    id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    title VARCHAR(100) NOT NULL,
    user uuid REFERENCES users(id) ON DELETE CASCADE,
    imageURL VARCHAR(255),
    created_at DATE NOT NULL DEFAULT NOW()
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

DROP TABLE genres;
DROP TABLE comments;
DROP TABLE likes;
DROP TABLE tracks;
DROP TABLE users;


