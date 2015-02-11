DROP TABLE IF EXISTS users;

CREATE TABLE users (
  username varchar(100) NOT NULL,
  password varchar(999) NOT NULL,
  info json
);
