DROP TABLE IF EXISTS vehicles;

CREATE TABLE IF NOT EXISTS vehicles (
  id serial primary key,
  make varchar(40),
  model varchar(40),
  year integer,
  owner_id integer,
  foreign key (owner_id) references users (id)
);

INSERT INTO vehicles(make, model, year, owner_id)
VALUES
('Toyota', 'Camry', 1991, 1),
('Honda', 'Civic', 1995, 1),
('Ford', 'Focus', 2005, 1),
('Ford', 'Taurus', 2003, 2),
('VW', 'Bug', 2010, 2),
('Mini', 'Cooper', 2013, 3);
