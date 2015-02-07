-- some sql to show use cases of pg json type

DROP TABLE IF EXISTS users;

CREATE TABLE users (
  username varchar(100) NOT NULL,
  password varchar(999) NOT NULL,
  info json
);

--
-- INSERT
--

INSERT INTO users (
  username, password, info
) VALUES (
  'haoxin1', '123456', '{ "address": "China", "age": 123, "record": { "point": 111 } }'
);

INSERT INTO users (
  username, password, info
) VALUES (
  'haoxin2', '123456', '{ "address": "China", "age": 456, "record": { "point": 222 } }'
);

INSERT INTO users (
  username, password, info
) VALUES (
  'haoxin3', '123456', '{ "address": "China", "age": 789, "record": { "point": 333 } }'
);

--
-- SELECT
--

-- note:
--   -> return original JSON type
--   -> return text

SELECT info->'age' AS age FROM users;
SELECT username, info->'age' AS age FROM users WHERE info->>'address' = 'China';
SELECT username, info->'age' AS age FROM users WHERE (info->>'age')::bigint > 500;
SELECT username, info->'record'->'point' AS age FROM users WHERE (info->'record'->>'point')::bigint > 200;
