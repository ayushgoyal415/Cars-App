DROP DATABASE IF EXISTS sql_cars;
CREATE DATABASE sql_cars;

CREATE TABLE sql_cars.users (
    user_id INT NOT NULL AUTO_INCREMENT,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    username VARCHAR(50) NOT NULL,
    password CHAR(60) NOT NULL, -- Hashed password will always be 60 characters long
    signup_date DATETIME NOT NULL DEFAULT NOW(),
    last_login DATETIME DEFAULT NULL,
  PRIMARY KEY (user_id),
  UNIQUE INDEX username_UNIQUE (username ASC) VISIBLE
);

CREATE TABLE sql_cars.cars (
    car_id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(50) NOT NULL,
    speed VARCHAR(50) DEFAULT NULL,
    average VARCHAR(50) DEFAULT NULL,
    `major contributions` VARCHAR(50) DEFAULT NULL,
    posted_by INT NOT NULL,
    created_on DATETIME NOT NULL DEFAULT NOW(),
    last_updated DATETIME DEFAULT NULL ON UPDATE NOW(),
  PRIMARY KEY (car_id),

  INDEX fk_posted_by_idx(posted_by),
  CONSTRAINT fk_posted_by
    FOREIGN KEY (posted_by)
    REFERENCES users(user_id)
    ON UPDATE CASCADE
    ON DELETE CASCADE
);

INSERT INTO sql_cars.users
  (user_id, first_name, last_name, username, password, signup_date, last_login)
VALUES -- sending the hashed 60 digit password for the password Hello@123
  (DEFAULT, "Ayush", "Goyal", "ayushgoyal415@gmail.com",
  "$2b$10$e0uWs5XyU2Di1FHThFjEPeTHDye5ZHfECJN525jx0m/hEBOq/KjH2", DEFAULT, DEFAULT),
  (DEFAULT, "Puspinder", "Kumar", "pushpinderbobby98@gmail.com",
  "$2b$10$e0uWs5XyU2Di1FHThFjEPeTHDye5ZHfECJN525jx0m/hEBOq/KjH2", DEFAULT, DEFAULT),
  (DEFAULT, "Anju", "Goyal", "anjugoyal415@gmail.com",
  "$2b$10$e0uWs5XyU2Di1FHThFjEPeTHDye5ZHfECJN525jx0m/hEBOq/KjH2", DEFAULT, DEFAULT),
  (DEFAULT, "Prerna", "Goyal", "prernagoyal415@gmail.com",
  "$2b$10$e0uWs5XyU2Di1FHThFjEPeTHDye5ZHfECJN525jx0m/hEBOq/KjH2", DEFAULT, DEFAULT),
  (DEFAULT, "Chaman", "Lal", "chamanlal@gmail.com",
  "$2b$10$e0uWs5XyU2Di1FHThFjEPeTHDye5ZHfECJN525jx0m/hEBOq/KjH2", DEFAULT, DEFAULT);

INSERT INTO sql_cars.cars
  (car_id, name, speed, average, `major contributions`, posted_by, created_on, last_updated)
VALUES
  (DEFAULT, "zen", 100, 20, "Best car of the year 2000", 1, DEFAULT, DEFAULT),
  (DEFAULT, "alto", 80, 23, "Best car of the year 2007", 1, DEFAULT, DEFAULT),
  (DEFAULT, "maruti baleno", 120, 23, "Hybrid car", 1, DEFAULT, DEFAULT);

-- SELECT * FROM sql_cars.users;
-- SELECT * FROM sql_cars.cars;